import { sendEmail } from '@src/services/postmark';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('req.method', req.method);
  if (req.method === 'POST') {
    const { to, subject, htmlBody, textBody } = req.body;
    try {
      await sendEmail(to, subject, htmlBody, textBody);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error: any) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
