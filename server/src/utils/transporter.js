import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASS,
  },
});
// const transporter = nodemailer.createTransport({
//   service: 'smtp.localhost',
//   port: 2500,
//   auth: {
//     user: process.env.GMAIL_ID,
//     pass: process.env.GMAIL_PASS,
//   },
// });

export default transporter;
