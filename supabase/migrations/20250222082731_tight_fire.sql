-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON user_profiles;
DROP POLICY IF EXISTS "Superadmins can manage all profiles" ON user_profiles;

-- Create new policies without recursion
CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Superadmins can manage all profiles"
  ON user_profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 
      FROM user_profiles up 
      WHERE up.id = auth.uid() 
      AND up.role = 'superadmin'
    )
  );

-- Ensure the superadmin user exists in user_profiles
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