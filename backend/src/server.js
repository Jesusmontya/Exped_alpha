require('dotenv').config();

const express = require('express');
const supabase = require('./supabaseClient');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const healthResponse = await fetch(`${process.env.SUPABASE_URL}/auth/v1/health`, {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY
      }
    });

    if (!healthResponse.ok) {
      return res.status(503).json({ status: 'error', supabaseConnected: false });
    }

    return res.json({ status: 'ok', supabaseConnected: true });
  } catch (error) {
    return res.status(503).json({ status: 'error', supabaseConnected: false });
  }
});

app.listen(port, () => {
  console.log(`[nombre] backend running on port ${port}`);
});
