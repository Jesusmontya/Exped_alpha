require('dotenv').config();

const express = require('express');
const { supabase, checkSupabaseHealth } = require('./supabaseClient');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const supabaseConnected = await checkSupabaseHealth();

    if (!supabaseConnected) {
      return res.status(503).json({
        status: 'error',
        supabaseConnected: false,
        supabaseClientInitialized: Boolean(supabase)
      });
    }

    return res.json({
      status: 'ok',
      supabaseConnected: true,
      supabaseClientInitialized: Boolean(supabase)
    });
  } catch (error) {
    console.error('Supabase health check failed:', error.message);

    return res.status(503).json({
      status: 'error',
      supabaseConnected: false,
      supabaseClientInitialized: Boolean(supabase)
    });
  }
});

app.listen(port, () => {
  console.log(`[nombre] backend running on port ${port}`);
});
