/*
  # Update superadmin password

  Updates the password for the superadmin user to a simpler one for testing purposes.
  IMPORTANT: This should never be used in production!
*/

-- Update password for superadmin user
UPDATE auth.users 
SET encrypted_password = crypt('123456', gen_salt('bf'))
WHERE email = 'minegociosinteligentes@gmail.com';