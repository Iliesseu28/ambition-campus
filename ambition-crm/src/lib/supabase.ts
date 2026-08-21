import { createClient } from '@supabase/supabase-js';

// Default credentials found in project memory (Dreamal instance, isolated table prefix 'ac_')
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://xmhcdrrmzwmsnzblthzs.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtaGNkcnJtendtc256Ymx0aHpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTk3OTc4MCwiZXhwIjoyMDkxNTU1NzgwfQ.pAqHFW-HH_1u_RLMlk1QOZuSg4GcwADB2GzV4u9qcvk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
