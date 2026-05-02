import nodemailer from "nodemailer";

const sendMail = async (userEmail, otpCode) => {
  try {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    const mailOptions = { 
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Verify your email address ',
        html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome!</h2>
          <p>Your 6-digit verification code is:</p>
          <h1 style="color: #DC2626; letter-spacing: 5px;">${otpCode}</h1>
          <p>This code will expire in 15 minutes.</p>
        </div>
        `
    }
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", userEmail);

  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};

export default sendMail;