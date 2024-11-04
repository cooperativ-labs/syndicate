import { emailConfirmationContent, emailNotificationContent } from '@src/services/postmark';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import { NotificationSubject, Organization } from 'types';

const getRecipientEmails = (organization: Organization, notificationSubject: NotificationSubject): string[] => {
  const recipients = organization.users?.filter((user) => {
    return user?.notificationConfigurations?.find((config) => config?.notificationSubject === notificationSubject);
  });
  if (!recipients) {
    return [];
  }
  const recipientEmails = recipients.map((orgUser) => orgUser.user.email);
  return recipientEmails as string[];
};

export const handleAddEmailAddress = async (address: string, completionUrl: string) => {
  window.localStorage.setItem('email', address);
  const secret = sha256(address);
  const confirmationLink = `${completionUrl}?token=${encodeURIComponent(secret)}`;
  const to = address;
  const subject = `Welcome to ${process.env.NEXT_PUBLIC_CLIENT === 'reizen' ? 'ReiZen' : 'Cooperativ'}.io`;
  const { html, text } = emailConfirmationContent(confirmationLink);
  const htmlBody = html;
  const textBody = text;
  const messageStream = 'outbound';
  try {
    await axios.post('/api/send-email', { to, subject, htmlBody, textBody, messageStream });
  } catch (error) {
    console.error(error);
  }
};

type EmailNotificationBaseProps = {
  organization: Organization;
  completionUrl: string;
  notificationText: string;
};
export const handleContractNotification = async ({
  organization,
  completionUrl,
  notificationText,
  notificationSubject,
  emailSubject,
}: EmailNotificationBaseProps & { notificationSubject: NotificationSubject; emailSubject: string }) => {
  const call = async (email: string) => {
    const to = email;
    const subject = emailSubject;
    const { html, text } = emailNotificationContent(notificationText, completionUrl);
    const htmlBody = html;
    const textBody = text;
    const messageStream = 'notifications';
    try {
      await axios.post('/api/send-email', { to, subject, htmlBody, textBody, messageStream });
    } catch (error) {
      console.error(error);
    }
  };

  const recipients = getRecipientEmails(organization, notificationSubject);
  recipients?.map(async (email: string) => {
    call(email);
  });
};

export const handleWhitelistUpdateNotification = async ({
  organization,
  completionUrl,
  notificationText,
}: EmailNotificationBaseProps) => {
  const emailSubject = 'Notification: New whitelist member added';
  const notificationSubject = NotificationSubject.WhitelistApproval;
  await handleContractNotification({
    organization,
    completionUrl,
    notificationText,
    notificationSubject,
    emailSubject,
  });
};

export const handleOfferingRequestNotification = async ({
  organization,
  completionUrl,
  notificationText,
}: EmailNotificationBaseProps) => {
  const emailSubject = `Notification: ${
    process.env.NEXT_PUBLIC_CLIENT === 'reizen' ? 'ReiZen' : 'Cooperativ'
  } trade approval requested`;
  const notificationSubject = NotificationSubject.TransactionRequest;
  handleContractNotification({
    organization,
    completionUrl,
    notificationText,
    notificationSubject,
    emailSubject,
  });
};

export const handleTradeExecutionNotification = async ({
  organization,
  completionUrl,
  notificationText,
}: EmailNotificationBaseProps) => {
  const emailSubject = `Notification: ${
    process.env.NEXT_PUBLIC_CLIENT === 'reizen' ? 'ReiZen' : 'Cooperativ'
  } trade executed`;
  const notificationSubject = NotificationSubject.TradeExecution;
  handleContractNotification({
    organization,
    completionUrl,
    notificationText,
    notificationSubject,
    emailSubject,
  });
};
