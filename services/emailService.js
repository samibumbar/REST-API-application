import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `${process.env.BASE_URL}/api/users/verify/${verificationToken}`;

  const msg = {
    to: email,
    from: "sbumbar21@gmail.com",
    subject: "Verify your email",
    text: `Click the link to verify your email: ${verificationLink}`,
    html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
  };

  await sgMail.send(msg);
};

export default sendVerificationEmail;
