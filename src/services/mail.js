const nodemailer = require('nodemailer');
/**
 * To send emails
 * @param {Array} emails
 */
export const sendMail = (emails) =>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailoption = {
    from: process.env.MAIL_ID,
    to: emails,
    subject: 'sample subject',
    text: 'sample text',
  };

  transporter.sendMail(mailoption, function(err, resp) {
    if (err) console.log('error');
    else console.log('email sent');
  });
};
