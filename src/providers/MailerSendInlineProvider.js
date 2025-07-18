import { MailerSend, EmailParams, Sender, Recipient, Attachment } from 'mailersend'
import fs from 'fs'

const MAILER_SEND_API_KEY = 'your_mailer_send_api_key' ||
  process.env.MAILER_SEND_API_KEY
const ADMIN_SENDER_EMAIL = 'your_admin_email' || process.env.ADMIN_SENDER_EMAIL
const ADMIN_SENDER_NAME = 'Trander' || process.env.ADMIN_SENDER_NAME

// Initialize MailerSend instance
const mailerSendInstance = new MailerSend({ apiKey: MAILER_SEND_API_KEY })
// Configure sender information
const sentFrom = new Sender(ADMIN_SENDER_EMAIL, ADMIN_SENDER_NAME)

// Send email function with inline attachments
const sendEmail = async ({
  to,
  toName,
  subject,
  html,
  templateId,
  personalizationData,
  attachments
}) => {
  try {
    // Setup email recipients
    const recipients = [
      new Recipient(to, toName)
      // Multiple recipients can be added to the array
    ]

    // CC: Carbon Copy - visible to all recipients
    const cc = [
      new Recipient('your_cc_01@trander.com', 'Your Client CC 01'),
      new Recipient('your_cc_02@trander.com', 'Your Client CC 02'),
      new Recipient('your_cc_03@trander.com', 'Your Client CC 03')
    ]

    // BCC: Blind Carbon Copy - hidden from other recipients
    const bcc = [
      new Recipient('your_bcc_01@trander.com', 'Your Client BCC 01'),
      new Recipient('your_bcc_02@trander.com', 'Your Client BCC 02'),
      new Recipient('your_bcc_03@trander.com', 'Your Client BCC 03')
    ]

    // Process file attachments for inline embedding
    const buildAttachments = attachments.map(att => {
      return new Attachment(
        fs.readFileSync(att.filePath, { encoding: 'base64' }),
        att.fileName,
        att.attachmentType,
        att.fileId // For inline attachment reference
      )
    })

    // Configure email parameters
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      // .setCc(cc)
      // .setBcc(bcc)
      .setSubject(subject)
      // .setHtml(html) // Use HTML to embed files in content
      // .setText() - Plain text email, rarely used
      .setTemplateId(templateId) // Template created from MailerSend dashboard
      .setPersonalization(personalizationData) // Dynamic data for template variables
      .setAttachments(buildAttachments)

    // Send the email
    const data = await mailerSendInstance.email.send(emailParams)

    return data
  } catch (error) {
    throw error
  }
}

export const MailerSendWithInlineProvider = {
  sendEmail
}