/*
  # Create tags and contact_tags tables

  1. New Tables
    - `tags`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `color` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `contact_tags`
      - `contact_id` (uuid, references contacts)
      - `tag_id` (uuid, references tags)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  color text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_tags table
CREATE TABLE IF NOT EXISTS contact_tags (
  contact_id uuid REFERENCES contacts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (contact_id, tag_id)
);

-- Enable RLS
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for tags
CREATE POLICY "Users can read tags"
  ON tags
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage tags"
  ON tags
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for contact_tags
CREATE POLICY "Users can read contact_tags"
  ON contact_tags
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage contact_tags"
  ON contact_tags
  FOR ALL
  TO authenticated
  USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_tags_updated_at
  BEFORE UPDATE ON tags
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();