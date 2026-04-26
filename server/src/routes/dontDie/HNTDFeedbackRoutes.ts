// File: server/src/routes/dontDie/HNTDFeedbackRoutes.ts

import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
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

    await transporter.sendMail({
      from: `"HNTD Feedback" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: `"${name}" <${email}>`,
      subject: 'How Not To Die Demo — Feedback',
      text: `From: ${name} <${email}>\n\n${feedback}`,
    });

    res.status(200).json({ message: 'Feedback sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send feedback.' });
  }
});

export default router;
