/*
  # Fix user_profiles policies

  1. Changes
    - Drop existing policies
    - Create new non-recursive policies
    - Add function to check superadmin role
    - Update superadmin user profile
*/

-- Create function to check if user is superadmin
CREATE OR REPLACE FUNCTION is_superadmin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_profiles
    WHERE id = user_id
    AND role = 'superadmin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Superadmins can manage all profiles" ON user_profiles;

-- Create new policies
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid() AND role = 'tenant');

CREATE POLICY "Superadmins can read all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (is_superadmin(auth.uid()));

CREATE POLICY "Superadmins can insert profiles"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (is_superadmin(auth.uid()));

CREATE POLICY "Superadmins can update all profiles"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (is_superadmin(auth.uid()));

CREATE POLICY "Superadmins can delete profiles"
  ON user_profiles
  FOR DELETE
  TO authenticated
  USING (is_superadmin(auth.uid()));

-- Ensure superadmin exists and has correct role
INSERT INTO user_profiles (id, email, name, role)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'name', 'Super Admin'),
  'superadmin'
FROM auth.users
WHERE email = 'minegociosinteligentes@gmail.com'
ON CONFLICT (id) DO UPDATE
SET role = 'superadmin';