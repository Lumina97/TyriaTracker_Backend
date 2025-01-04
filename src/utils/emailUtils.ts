import nodemailer from "nodemailer";

export const SendEmail = (toEmail: string, code: string) => {
  if (!toEmail || !code) {
    console.log("Email or code was NULL - unable to send email");
    return;
  }

  const email = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!email || !pass) {
    console.log("Unable to load email or password from env file");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  });

  const mailOptions = {
    from: email,
    to: toEmail,
    subject: "Password reset.",
    text: code,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
