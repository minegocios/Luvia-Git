/*
  # Add deals table

  1. New Tables
    - `deals`
      - `id` (uuid, primary key)
      - `title` (text)
      - `company` (text)
      - `value` (numeric)
      - `due_date` (date)
      - `stage` (text)
      - `contact_id` (uuid, references contacts)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `deals` table
    - Add policy for authenticated users to manage their own deals
*/

-- Create deals table
CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  value numeric NOT NULL DEFAULT 0,
  due_date date NOT NULL,
  stage text NOT NULL DEFAULT 'prospect',
  contact_id uuid REFERENCES contacts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage deals"
  ON deals
  FOR ALL
  TO authenticated
  USING (
    contact_id IN (
      SELECT id FROM contacts WHERE user_id = auth.uid()
    )
  );

-- Create trigger for updated_at
CREATE TRIGGER update_deals_updated_at
  BEFORE UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();