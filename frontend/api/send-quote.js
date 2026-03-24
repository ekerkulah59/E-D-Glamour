const { Resend } = require('resend');

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Vercel serverless function - receives quote form submissions and emails them via Resend
module.exports = async function handler(req, res) {
  setCors(res);
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.RECIPIENT_EMAIL || 'eanddglamourmarketing.24@gmail.com';
  const fromEmail = process.env.FROM_EMAIL || 'E&D Glamour Marketing <onboarding@resend.dev>';

  if (!apiKey) {
    return res.status(500).json({ error: 'Email service not configured. Add RESEND_API_KEY to your environment.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: 'Invalid request body' });
      }
    }
    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Request body is required' });
    }
    const { name, email, phone, event_type, event_date, guest_count, message, cart_items } = body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const resend = new Resend(apiKey);
    const eventTypeLabel = event_type ? String(event_type).replace(/_/g, ' ') : 'Not specified';

    let cartHtml = '';
    if (Array.isArray(cart_items) && cart_items.length > 0) {
      const rows = cart_items.map((item) => {
        const priceCell = item.price_per_day != null
          ? `$${Number(item.price_per_day).toFixed(2)}/day × ${item.quantity}`
          : 'Quote required';
        return `<tr>
          <td style="padding:6px 8px;border-bottom:1px solid #eee;">${escapeHtml(item.name)}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #eee;">${escapeHtml(item.category || '—')}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #eee;">${priceCell}</td>
        </tr>`;
      }).join('');
      cartHtml = `
        <h3>Cart Items</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead>
            <tr style="background:#f5f5f5;">
              <th style="padding:6px 8px;text-align:left;">Item</th>
              <th style="padding:6px 8px;text-align:left;">Category</th>
              <th style="padding:6px 8px;text-align:center;">Qty</th>
              <th style="padding:6px 8px;text-align:left;">Price</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
    }

    const html = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || '—')}</p>
      <p><strong>Event Type:</strong> ${escapeHtml(eventTypeLabel)}</p>
      <p><strong>Event Date:</strong> ${escapeHtml(event_date || '—')}</p>
      <p><strong>Guest Count:</strong> ${escapeHtml(guest_count || '—')}</p>
      ${cartHtml}
      <h3>Message</h3>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      <hr>
      <p style="color:#888;font-size:12px;">Submitted via E&D Glamour Marketing contact form</p>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: email,
      subject: `Quote Request from ${escapeHtml(name)} – ${escapeHtml(eventTypeLabel)}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message || 'Failed to send email' });
    }

    return res.status(200).json({ message: 'Quote request sent successfully', id: data?.id });
  } catch (err) {
    console.error('Send quote error:', err);
    return res.status(500).json({ error: err.message || 'Something went wrong' });
  }
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
