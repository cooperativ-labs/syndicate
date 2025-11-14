import { emailConfirmationContent, emailNotificationContent } from '@src/services/postmark';
import { getOrganization, getOrganizationUsers } from '@src/utils/actions/organizationActions';
import axios from 'axios';
import { sha256 } from 'js-sha256';

import { NotificationSubject, Organization } from '@/types';

const getRecipientEmails = async (
  organizationId: string | number,
  notificationSubject: (typeof NotificationSubject)[keyof typeof NotificationSubject]
): Promise<string[]> => {
  const recipients = await getOrganizationUsers({ organizationId });
  if (!recipients) {
    return [];
  }
  const recipientEmails = recipients.map(orgUser => orgUser.account_email);
  return recipientEmails as string[];
};

export const handleAddEmailAddress = async (address: string, completionUrl: string) => {
  window.localStorage.setItem('email', address);
  const secret = sha256(address);
  const confirmationLink = `${completionUrl}?token=${encodeURIComponent(secret)}`;
  const to = address;
  const subject = 'Welcome to Cooperativ.io';
  const { html, text } = emailConfirmationContent(confirmationLink);
  const htmlBody = html;
  const textBody = text;
  const messageStream = 'outbound';
  try {
    await axios.post('/api/send-email', {
      to,
      subject,
      htmlBody,
      textBody,
      messageStream
    });
  } catch (error) {
    console.error(error);
  }
};

type EmailNotificationBaseProps = {
  organizationId: string | number;
  completionUrl: string;
  notificationText: string;
};
export const handleContractNotification = async ({
  organizationId,
  completionUrl,
  notificationText,
  notificationSubject,
  emailSubject
}: EmailNotificationBaseProps & {
  notificationSubject: (typeof NotificationSubject)[keyof typeof NotificationSubject];
  emailSubject: string;
}) => {
  const call = async (email: string) => {
    const to = email;
    const subject = emailSubject;
    const { html, text } = emailNotificationContent(notificationText, completionUrl);
    const htmlBody = html;
    const textBody = text;
    const messageStream = 'notifications';
    try {
      await axios.post('/api/send-email', {
        to,
        subject,
        htmlBody,
        textBody,
        messageStream
      });
    } catch (error) {
      console.error(error);
    }
  };

  const recipients = await getRecipientEmails(organizationId, notificationSubject);
  recipients?.map(async (email: string) => {
    call(email);
  });
};

export const handleWhitelistUpdateNotification = async ({
  organizationId,
  completionUrl,
  notificationText
}: EmailNotificationBaseProps) => {
  const emailSubject = 'Notification: New whitelist member added';
  const notificationSubject = NotificationSubject.WHITELIST_APPROVAL;
  await handleContractNotification({
    organizationId,
    completionUrl,
    notificationText,
    notificationSubject,
    emailSubject
  });
};

export const handleOfferingRequestNotification = async ({
  organizationId,
  completionUrl,
  notificationText
}: EmailNotificationBaseProps) => {
  const emailSubject = 'Notification: Cooperativ.io trade approval requested';
  const notificationSubject = NotificationSubject.TRANSACTION_REQUEST;
  handleContractNotification({
    organizationId,
    completionUrl,
    notificationText,
    notificationSubject,
    emailSubject
  });
};

export const handleTradeExecutionNotification = async ({
  organizationId,
  completionUrl,
  notificationText
}: EmailNotificationBaseProps) => {
  const emailSubject = 'Notification: Cooperativ.io trade executed';
  const notificationSubject = NotificationSubject.TRADE_EXECUTION;
  handleContractNotification({
    organizationId,
    completionUrl,
    notificationText,
    notificationSubject,
    emailSubject
  });
};
