const nodemailer = require("nodemailer");

const sendEmail = async (body) => {
  try {
    const { userName, userEmail, userPhone, userMessage } = body;
    const output = `
    <h2>You have new email</h2>
    <p>Please check details</p>
    <ul>
        <li>Name:${userName}</li>
        <li>Email:${userEmail}</li>
        <li>Phone:${userPhone} </li>
    </ul>
    <p>Message: ${userMessage}</p>`;

    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "kseniiaFS@outlook.com", // generated ethereal user
        pass: "Ksuyha2614", // generated ethereal password
      },
    });

    const emailOptions = {
      from: "<kseniiaFS@outlook.com>", // sender address
      to: "kseniia.fs@gmail.com", // list of receivers
      subject: userName, // Subject line
      text: userMessage, // plain text body
      html: output, // html body
    };
    let info = await transporter.sendMail(emailOptions);

    console.log("Message sent: %s", info.messageId);

    if (info.messageId) return info.messageId;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
