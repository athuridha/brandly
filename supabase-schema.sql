-- Supabase Database Schema for Brandly

-- =============================================
-- Table: orders
-- Description: Stores all customer orders
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  company TEXT NOT NULL,
  website TEXT,
  service TEXT NOT NULL,
  budget TEXT NOT NULL,
  timeline TEXT NOT NULL,
  payment_method TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed'))
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);

-- =============================================
-- Table: admins
-- Description: Stores admin credentials
-- =============================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin (username: brandly, password: brandly123)
INSERT INTO admins (username, password) 
VALUES ('brandly', 'brandly123')
ON CONFLICT (username) DO NOTHING;

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert orders (from order form)
CREATE POLICY "Allow public insert orders" ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow public to select orders (for admin dashboard)
CREATE POLICY "Allow public select orders" ON orders
  FOR SELECT
  TO anon
  USING (true);

-- Policy: Allow public to update orders (for status changes)
CREATE POLICY "Allow public update orders" ON orders
  FOR UPDATE
  TO anon
  USING (true);

-- Policy: Allow public to delete orders
CREATE POLICY "Allow public delete orders" ON orders
  FOR DELETE
  TO anon
  USING (true);

-- Policy: Allow public to view admins (for login verification)
CREATE POLICY "Allow public view admins" ON admins
  FOR SELECT
  TO anon
  USING (true);

-- =============================================
-- Sample Data (Optional - for testing)
-- =============================================

-- Insert sample orders
INSERT INTO orders (name, email, whatsapp, company, service, budget, timeline, status, message)
VALUES 
  ('Budi Santoso', 'budi@example.com', '08123456789', 'PT Maju Jaya', 'website', 'medium', 'normal', 'pending', 'Saya ingin membuat website company profile untuk perusahaan kami.'),
  ('Siti Aminah', 'siti@startup.com', '08987654321', 'Tech Start', 'branding', 'small', 'urgent', 'contacted', 'Butuh logo dan brand identity untuk startup saya.')
ON CONFLICT DO NOTHING;
