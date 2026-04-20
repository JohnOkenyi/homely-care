import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, message } = req.body;

    // Using FormSubmit.co to bypass DNS/Wix MX record limitations
    const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `New Enquiry from ${name}`,
        _replyto: email,
        Name: name,
        Email: email,
        Phone: phone || "Not provided",
        Service: service || "Not provided",
        Message: message,
      }),
    });

    if (!response.ok) {
        throw new Error('FormSubmit API error');
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (err: unknown) {
    console.error('API Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return res.status(500).json({ error: errorMessage });
  }
}
