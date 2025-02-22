/*
  # Recreate Auth Users Table

  1. Changes
    - Drops existing auth_users table
    - Recreates auth_users table with proper structure
    - Adds necessary constraints and policies

  2. Security
    - Enables RLS
    - Adds policy for user access
*/

-- Drop existing auth_users table if it exists
DROP TABLE IF EXISTS auth_users;

-- Create auth_users table
CREATE TABLE auth_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL CHECK (role IN ('superadmin', 'tenant')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE auth_users ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can read own data"
  ON auth_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create trigger for updated_at
CREATE TRIGGER update_auth_users_updated_at
  BEFORE UPDATE ON auth_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create superadmin user
INSERT INTO auth_users (email, password, role)
VALUES (
  'minegociosinteligentes@gmail.com',
  crypt('Efesios1.7', gen_salt('bf')),
  'superadmin'
);