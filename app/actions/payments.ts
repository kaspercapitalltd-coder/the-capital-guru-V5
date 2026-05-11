'use server';

import { createClient } from '@/lib/supabase/server';
import { sendEmail, EmailTemplates } from '@/lib/resend';

export async function sendPaymentReceivedEmail(planName: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) return;

  const fullName = user.user_metadata?.full_name || 'Trader';

  await sendEmail({
    to: user.email,
    subject: 'Payment Under Verification - The Capital Guru',
    html: EmailTemplates.paymentReceived(fullName, planName)
  });
}
