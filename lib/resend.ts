import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email not sent.');
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'The Capital Guru <no-reply@thecapitalguru.in>', // Update with verified domain
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { error };
  }
}

const LOGO_URL = 'https://i.ibb.co/Y7wKvYJ5/122151.png';

export const EmailTemplates = {
  paymentReceived: (name: string, planName: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 40px; border-radius: 20px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <img src="${LOGO_URL}" alt="The Capital Guru" style="width: 150px;" />
      </div>
      <h1 style="color: #d4af37; font-size: 24px; text-transform: italic;">Payment Received!</h1>
      <p style="font-size: 16px; line-height: 1.6; color: #ccc;">Hello ${name},</p>
      <p style="font-size: 16px; line-height: 1.6; color: #ccc;">We have received your payment request for the <strong>${planName}</strong>. Our team is currently verifying the transaction.</p>
      <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; margin: 30px 0; border: 1px solid #333;">
        <p style="margin: 0; font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 2px;">Status</p>
        <p style="margin: 10px 0 0; font-size: 20px; color: #d4af37; font-weight: bold;">Under Verification</p>
      </div>
      <p style="font-size: 14px; color: #666;">Verification typically takes 2-4 hours. You will receive another email once your access is activated.</p>
      <hr style="border: 0; border-top: 1px solid #333; margin: 40px 0;" />
      <p style="font-size: 12px; color: #444; text-align: center;">© 2024 The Capital Guru. All rights reserved.</p>
    </div>
  `,
  paymentApproved: (name: string, planName: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 40px; border-radius: 20px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <img src="${LOGO_URL}" alt="The Capital Guru" style="width: 150px;" />
      </div>
      <h1 style="color: #d4af37; font-size: 24px; text-transform: italic;">Access Activated!</h1>
      <p style="font-size: 16px; line-height: 1.6; color: #ccc;">Great news, ${name}!</p>
      <p style="font-size: 16px; line-height: 1.6; color: #ccc;">Your payment has been verified and your <strong>${planName}</strong> is now active. You can now access the terminal and all premium signals.</p>
      <div style="text-align: center; margin: 40px 0;">
        <a href="https://thecapitalguru.in/dashboard" style="background-color: #d4af37; color: #000; padding: 15px 40px; border-radius: 5px; text-decoration: none; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Go to Dashboard</a>
      </div>
      <p style="font-size: 14px; color: #666;">Welcome to the elite circle of traders.</p>
      <hr style="border: 0; border-top: 1px solid #333; margin: 40px 0;" />
      <p style="font-size: 12px; color: #444; text-align: center;">© 2024 The Capital Guru. All rights reserved.</p>
    </div>
  `,
  paymentRejected: (name: string, reason: string) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 40px; border-radius: 20px;">
      <div style="text-align: center; margin-bottom: 40px;">
        <img src="${LOGO_URL}" alt="The Capital Guru" style="width: 150px;" />
      </div>
      <h1 style="color: #ff4d4d; font-size: 24px;">Verification Failed</h1>
      <p style="font-size: 16px; line-height: 1.6; color: #ccc;">Hello ${name},</p>
      <p style="font-size: 16px; line-height: 1.6; color: #ccc;">Unfortunately, we were unable to verify your payment request.</p>
      <div style="background: #1a1a1a; padding: 20px; border-radius: 10px; margin: 30px 0; border: 1px solid #ff4d4d33;">
        <p style="margin: 0; font-size: 14px; color: #888; text-transform: uppercase;">Reason</p>
        <p style="margin: 10px 0 0; font-size: 16px; color: #fff;">${reason}</p>
      </div>
      <p style="font-size: 14px; color: #ccc;">Please resubmit your request with a valid screenshot and UTR number via the dashboard.</p>
      <div style="text-align: center; margin: 40px 0;">
        <a href="https://thecapitalguru.in/dashboard" style="background-color: #333; color: #fff; padding: 15px 40px; border-radius: 5px; text-decoration: none; font-weight: bold;">Retry Submission</a>
      </div>
      <hr style="border: 0; border-top: 1px solid #333; margin: 40px 0;" />
      <p style="font-size: 12px; color: #444; text-align: center;">© 2024 The Capital Guru. All rights reserved.</p>
    </div>
  `,
};
