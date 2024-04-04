var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(subject:string, toEmail:string, otpText:string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arthurdayne556@gmail.com",
      pass: "vlmo nvtb znba hxjb ",
    },
  });

  var mailOptions = {
    from: "arthurdayne556@gmail.com",
    to: toEmail,
    subject: subject,
    text: otpText,
  };

  transporter.sendMail(mailOptions, function (error:any, info:any) {
    if (error) {
      throw new Error(error);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}