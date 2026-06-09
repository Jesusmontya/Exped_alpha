require('dotenv').config();

const express = require('express');
const supabase = require('./supabaseClient');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', async (req, res) => {
  res.json({ status: 'ok', supabaseConnected: Boolean(supabase) });
});

app.listen(port, () => {
  console.log(`[nombre] backend running on port ${port}`);
});
