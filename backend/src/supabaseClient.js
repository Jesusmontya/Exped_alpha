const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const checkSupabaseHealth = async () => {
  const healthResponse = await fetch(`${supabaseUrl}/auth/v1/health`, {
    headers: {
      apikey: supabaseAnonKey
    }
  });

  return healthResponse.ok;
};

module.exports = {
  supabase,
  checkSupabaseHealth
};
