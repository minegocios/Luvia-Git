/*
  # Fix auth users table

  1. Changes
    - Drop and recreate auth_users table with proper structure
    - Add role hierarchy with tenant_id
    - Set up RLS policies
    - Create indexes for performance
    - Insert superadmin user

  2. Security
    - Enable RLS
    - Add policies for different roles
    - Ensure proper data access control
*/

-- Drop existing auth_users table if exists
DROP TABLE IF EXISTS auth_users;

-- Create auth_users table with role hierarchy
CREATE TABLE auth_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('superadmin', 'admin', 'user')),
  tenant_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_tenant_hierarchy CHECK (
    (role = 'superadmin' AND tenant_id IS NULL) OR
    (role IN ('admin', 'user') AND tenant_id IS NOT NULL)
  )
);

-- Enable RLS
ALTER TABLE auth_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Superadmin can do everything" ON auth_users;
DROP POLICY IF EXISTS "Admins can manage users within their tenant" ON auth_users;
DROP POLICY IF EXISTS "Users can read own data" ON auth_users;

-- Create new policies
CREATE POLICY "Superadmin can do everything"
  ON auth_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth_users au
      WHERE au.id = auth.uid()
      AND au.role = 'superadmin'
    )
  );

CREATE POLICY "Admins can manage users within their tenant"
  ON auth_users
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth_users au
      WHERE au.id = auth.uid() 
      AND au.role = 'admin' 
      AND au.tenant_id = auth_users.tenant_id
    )
  );

CREATE POLICY "Users can read own data"
  ON auth_users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Create indexes
CREATE INDEX idx_auth_users_email ON auth_users(email);
CREATE INDEX idx_auth_users_role ON auth_users(role);
CREATE INDEX idx_auth_users_tenant ON auth_users(tenant_id);

-- Insert superadmin user
INSERT INTO auth_users (
  name,
  email,
  role
) VALUES (
  'Super Admin',
  'minegociosinteligentes@gmail.com',
  'superadmin'
) ON CONFLICT (email) DO NOTHING;