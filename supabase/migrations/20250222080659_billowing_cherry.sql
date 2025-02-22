/*
  # Auth Users Setup

  1. Changes
    - Create auth_users table with proper role hierarchy
    - Add initial superadmin user
    - Set up proper constraints and security

  2. Security
    - Enable RLS
    - Add policies for proper access control
*/

-- Drop existing auth_users table if exists
DROP TABLE IF EXISTS auth_users;

-- Create auth_users table with role hierarchy
CREATE TABLE auth_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL CHECK (role IN ('superadmin', 'admin', 'user')),
  tenant_id uuid REFERENCES auth_users(id), -- Reference to tenant for admin/user roles
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_tenant_hierarchy CHECK (
    (role = 'superadmin' AND tenant_id IS NULL) OR
    (role = 'admin' AND tenant_id IS NOT NULL) OR
    (role = 'user' AND tenant_id IS NOT NULL)
  )
);

-- Enable RLS
ALTER TABLE auth_users ENABLE ROW LEVEL SECURITY;

-- Create policies
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

CREATE POLICY "Admins can read their tenant users"
  ON auth_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth_users au
      WHERE au.id = auth.uid()
      AND au.role = 'admin'
      AND au.tenant_id = tenant_id
    )
  );

CREATE POLICY "Users can read own data"
  ON auth_users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Create trigger for updated_at
CREATE TRIGGER update_auth_users_updated_at
  BEFORE UPDATE ON auth_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert superadmin user
INSERT INTO auth_users (name, email, password, role)
VALUES (
  'Super Administrador',
  'minegociosinteligentes@gmail.com',
  crypt('Efésios1.7', gen_salt('bf')),
  'superadmin'
);

-- Create indexes for better performance
CREATE INDEX idx_auth_users_email ON auth_users(email);
CREATE INDEX idx_auth_users_tenant_id ON auth_users(tenant_id);
CREATE INDEX idx_auth_users_role ON auth_users(role);