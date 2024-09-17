import { EmailTemplate } from '@/components/auth/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async(email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from: 'Valles Tour <onboarding@resend.dev>',
        to: email,
        subject: 'Confirma tu correo',
        react: EmailTemplate({confirmLink }),
      });
}