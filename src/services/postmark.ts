var postmark = require('postmark');

// Send an email:
export const postmarkClient = new postmark.ServerClient(process.env.NEXT_PUBLIC_POSTMARK_API_KEY);

type MessageStreamOptions = 'outbound' | 'magic-link-stream' | 'notifications';

export async function sendEmail(
  to: string,
  subject: string,
  htmlBody: string,
  textBody: string,
  messageStream: MessageStreamOptions
) {
  try {
    await postmarkClient.sendEmail({
      From: process.env.NEXT_PUBLIC_NOTIFICATIONS_FROM,
      To: to,
      Subject: subject,
      HtmlBody: htmlBody,
      TextBody: textBody,
      MessageStream: messageStream,
    });
  } catch (error: any) {
    throw new Error('Error sending email:', error);
  }
}

export const emailConfirmationContent = (confirmationLink: string) => {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      a {
        color: #0066cc;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      .footer {
        font-size: 14px;
        color: #999;
        text-align: center;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <p>Hello,</p>
      <p>Please confirm your email address by clicking the link below:</p>
      <p><a href="${confirmationLink}">${confirmationLink}</a></p>
      <p>Thanks!</p>
      <p>The ${process.env.NEXT_PUBLIC_CLIENT === 'reizen' ? 'ReiZen' : 'Cooperativ'} Team</p>
    </div>
    <p class="footer">© ${
      process.env.NEXT_PUBLIC_CLIENT === 'reizen' ? 'ReiZen.xyz' : 'Cooperativ.io'
    }, All Rights Reserved.</p>
  </body>
  </html>
  `;

  const text = `Welcome to ${process.env.NEXT_PUBLIC_CLIENT === 'reizen' ? 'ReiZen' : 'Cooperativ'}!
  Please confirm your email address by clicking the link below:
  ${confirmationLink}`;

  return { html, text };
};

export const emailNotificationContent = (notificationText: string, actionLink: string) => {
  const html = `<html>
      <body>
        <p>Hello,</p>
        <p>${notificationText}</p>
        <p><a href="${actionLink}">${actionLink}</a></p>
      
        <p>The ${process.env.NEXT_PUBLIC_CLIENT === 'reizen' ? 'ReiZen' : 'Cooperativ'} Team</p>
      </body>
    </html>
  `;

  const text = `${notificationText}: 
  ${actionLink}`;

  return { html, text };
};
