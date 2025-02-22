/*
  # Atualizar políticas RLS para permitir acesso anônimo

  1. Alterações
    - Adicionar políticas que permitem acesso anônimo temporariamente
    - Manter estrutura existente para futura implementação de autenticação
*/

-- Atualizar política para contatos
DROP POLICY IF EXISTS "Users can manage contacts" ON contacts;
CREATE POLICY "Allow anonymous access to contacts"
  ON contacts
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Atualizar política para tags
DROP POLICY IF EXISTS "Users can read tags" ON tags;
DROP POLICY IF EXISTS "Users can manage tags" ON tags;
CREATE POLICY "Allow anonymous access to tags"
  ON tags
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Atualizar política para contact_tags
DROP POLICY IF EXISTS "Users can read contact_tags" ON contact_tags;
DROP POLICY IF EXISTS "Users can manage contact_tags" ON contact_tags;
CREATE POLICY "Allow anonymous access to contact_tags"
  ON contact_tags
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Atualizar política para deals
DROP POLICY IF EXISTS "Users can manage deals" ON deals;
CREATE POLICY "Allow anonymous access to deals"
  ON deals
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);