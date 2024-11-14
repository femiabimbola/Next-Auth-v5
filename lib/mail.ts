import email from "next-auth/providers/email";
import { Resend } from "resend";
const domain = process.env.NEXT_PUBLIC_APP_URL;

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  // const confirmationLink = `${domain}/auth/new-verification?token=${token}`;

  const confirmationLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p> Click <a href="${confirmationLink}"> here </a> to confirm your email </p>`,
  });
};

export const sendPasswordReset = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p> Click <a href="${resetLink}"> here </a> to reset your password </p>`,
  });
};
