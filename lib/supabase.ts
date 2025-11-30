import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://leiqtoewuntbzjjxbemq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlaXF0b2V3dW50YnpqanhiZW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NzE5NTMsImV4cCI6MjA4MDA0Nzk1M30.-8CjbQUMipY35kUnfGIj2DS3GK4x1BJTCtdEllT-YTk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Order {
    id: string
    created_at: string
    name: string
    email: string
    whatsapp: string
    company: string
    website?: string
    service: string
    budget: string
    timeline: string
    payment_method?: string
    message?: string
    status: 'pending' | 'contacted' | 'completed'
}

export interface Admin {
    id: string
    username: string
    password: string
    created_at: string
}
