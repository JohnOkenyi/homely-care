import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, phone, service, message } = await request.json();

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Resend API Key is missing. Please add it to your environment variables.' },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Homely Care Enquiry <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL_RECIPIENT || 'info@homelyhealth.uk'],
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #5B2A86; border-bottom: 2px solid #5B2A86; padding-bottom: 10px;">New Website Enquiry</h2>
          <p style="margin-bottom: 15px;">You have received a new enquiry through the Homely Care website.</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${service}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="font-weight: bold;">Message:</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; line-height: 1.6;">
              ${message.replace(/\n/g, '<br />')}
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
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
