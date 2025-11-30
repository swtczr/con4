// api/chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { code } = req.body || {};
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Bad Request', message: 'Field "code" (string) is required' });
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_URL || 'https://hook.eu2.make.com/1452215';
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });

    const text = await upstream.text();
    let data;
    try { data = JSON.parse(text); } catch {
      return res.status(upstream.status).json({
        status: 'error',
        message: 'Upstream returned non-JSON payload',
        raw: text
      });
    }

    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Proxy Error', message: err?.message || String(err) });
  }
}