const express = require('express');
const router = express.Router();

const LM_STUDIO_URL = 'http://localhost:1234/v1/chat/completions';

// POST /api/greenieai/chat
router.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages must be an array' });
    }

    // Call LM Studio directly with the messages
    const lmRes = await fetch(LM_STUDIO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
        stream: false
      })
    });

    if (!lmRes.ok) {
      const errorData = await lmRes.json().catch(() => ({}));
      console.error('LM Studio Error Response:', errorData);
      return res.status(500).json({ error: 'LM Studio error', details: errorData });
    }

    const data = await lmRes.json();
    console.log('LM Studio Response:', data);

    // Return the entire response from LM Studio
    return res.json(data);
  } catch (err) {
    console.error('GreenieAI backend error:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router; 