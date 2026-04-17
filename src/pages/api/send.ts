import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, message } = req.body;

    // Direct key check to avoid initialization issues if missing
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is missing');
      return res.status(500).json({ error: 'Email configuration missing' });
    }

    const resend = new Resend(apiKey);
    const recipient = process.env.CONTACT_EMAIL_RECIPIENT || 'info@homelyhealth.uk';

    const { data, error } = await resend.emails.send({
      from: 'Homely Care Enquiry <onboarding@resend.dev>',
      to: [recipient],
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #5B2A86; border-bottom: 2px solid #5B2A86; padding-bottom: 10px;">New Website Enquiry</h2>
          <p style="margin-bottom: 15px;">You have received a new enquiry through the Homely Care website.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${service || 'N/A'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="font-weight: bold;">Message:</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; line-height: 1.6;">
              ${(message || '').replace(/\n/g, '<br />')}
            </div>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
            This email was sent from the direct enquiry system on homelyhealth.uk
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(500).json({ error });
    }

    return res.status(200).json({ success: true, data });
  } catch (err: unknown) {
    console.error('API Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return res.status(500).json({ error: errorMessage });
  }
}
