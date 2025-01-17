import Gmailtransporter from '../../utils/nodemailer';

interface SendGmailInputTypes {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const SendGmail = async (input: SendGmailInputTypes) => {
  const mailOptions = {
    from: `${process.env.EMAIL_USER}`,
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
  };

  const mail = await Gmailtransporter.sendMail();
};
