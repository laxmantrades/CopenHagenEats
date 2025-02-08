import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";
import { client, sender } from "./mailtrap";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipients = [{ email }];
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Verify your email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Email Verification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email Verification");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipients = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Welcome to Copenhagen Eats",
      html: htmlContent,
      category: "Welcome Message",
      template_variables: {
        company_info_name: "Copenhagen Eats",
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
) => {
  const recipients = [{ email }];
  const htmlContent = generatePasswordResetEmailHtml(resetURL);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Reset your email",
      html: htmlContent,
      category: "Reset Verification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset  email");
  }
};

export const sendResetSuccessEmail = async (email: string) => {
  const recipients = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Password Reset Successfully",
      html: htmlContent,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send reset success email");
  }
};
