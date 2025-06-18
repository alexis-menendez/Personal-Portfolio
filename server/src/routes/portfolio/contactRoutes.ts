// File: server/src/routes/portfolio/contactRoutes.ts

import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { name, subject, message } = req.body;

  if (!name || !subject || !message) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Portfolio Contact: ${subject}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Email failed to send.' });
  }
});

export default router;
