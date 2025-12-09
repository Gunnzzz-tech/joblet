import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tfbjiyknoagcxjzeoqzw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmYmppeWtub2FnY3hqemVvcXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTM5MzQsImV4cCI6MjA4MDgyOTkzNH0.Mm200p-HjpEgZWLMxI684xmhbCIWcxtcNlVCdkQ3KGk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Contact form submission to Supabase
export async function saveContactToSupabase(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { error } = await supabase
    .from('contacts')
    .insert([
      {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        created_at: new Date().toISOString(),
      },
    ]);

  if (error) {
    throw error;
  }

  return { success: true };
}

// User profile operations
export async function saveUserToSupabase(data: {
  uid: string;
  email: string;
  name?: string;
  role?: string;
}) {
  const { data: result, error } = await supabase
    .from('users')
    .insert([
      {
        uid: data.uid,
        email: data.email,
        name: data.name,
        role: data.role,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    throw error;
  }

  return result;
}

export async function getUserFromSupabase(uid: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('uid', uid)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 is "not found" error
    throw error;
  }

  return data;
}
