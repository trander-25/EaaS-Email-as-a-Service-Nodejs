import { StatusCodes } from 'http-status-codes'
import { MOCK_USER } from '~/models/mockDatabase'
import { MAILERSEND_TEMPLATE_IDS } from '~/utils/mailerSendTemplates'
import { ResendProvider } from '~/providers/ResendProvider'
import { MailerSendProvider } from '~/providers/MailerSendProvider'
import { MailerSendWithTemplateDataProvider } from '~/providers/MailerSendTemplateProvider'
import { MailerSendWithAttachmentsProvider } from '~/providers/MailerSendAttachmentsProvider'
import { MailerSendWithInlineProvider } from '~/providers/MailerSendInlineProvider'
import { MailerSendWithScheduleBulkProvider } from '~/providers/MailerSendScheduleAndBulkProvider'

const register = async (req, res) => {
  try {
    // Mock successful account creation - In production, query database to create and save user data
    const createdUser = MOCK_USER

    // Send email after user registration (confirmation, welcome, etc.)
    // This step sends action to an Email as a Service provider
    const to = createdUser.EMAIL
    const toName = createdUser.USERNAME
    const subject = 'Created account successfully - Trander'
    const html = `
      <h1>Hello ${createdUser.USERNAME}</h1>
      <h2>Your account has been created successfully.</h2>
      <h3>Regards, Trander</h3>
    `
    // ------------------------------------------------------------

    // // Send email with Resend
    // const resendEmailResponse = await ResendProvider.sendEmail({ to, subject, html })

    // ------------------------------------------------------------

    // // Send email with MailerSend
    // const mailerSendEmailResponse = await MailerSendProvider.sendEmail({
    //   to,
    //   toName,
    //   subject,
    //   html
    // })

    // ------------------------------------------------------------

    // // Send email with MailerSend using Template Data
    // const personalizationData = [
    //   {
    //     email: to,
    //     data: {
    //       name: 'Trander',
    //       account_name: 'Trander25'
    //     }
    //   }
    // ]
    // const mailerSendTemplateResponse = await MailerSendWithTemplateDataProvider.sendEmail({
    //   to,
    //   toName,
    //   subject: 'Created account successfully - {{ name }}',
    //   html,
    //   templateId: MAILERSEND_TEMPLATE_IDS.REGISTER_ACCOUNT, // Email template ID, separate when having multiple
    //   personalizationData
    // })

    // ------------------------------------------------------------

    // // Send email with MailerSend using Template Data and Attachments
    // const personalizationData = [
    //   {
    //     email: to,
    //     data: {
    //       name: 'Trander',
    //       account_name: 'Trander25'
    //     }
    //   }
    // ]
    // const attachments = [
    //   {
    //     filePath: 'src/files/test01.pdf',
    //     fileName: 'test01',
    //     attachmentType: 'attachment' // Use 'attachment' value to attach file at end of email
    //   }
    // ]
    // const mailerSendAttachmentsResponse = await MailerSendWithAttachmentsProvider.sendEmail({
    //   to,
    //   toName,
    //   subject: 'Created account successfully - {{ name }}',
    //   html,
    //   templateId: MAILERSEND_TEMPLATE_IDS.REGISTER_ACCOUNT, // Email template ID, separate when having multiple
    //   personalizationData,
    //   attachments
    // })

    // ------------------------------------------------------------

    // // Send email with MailerSend using Template Data and Inline Attachments
    // const personalizationData = [
    //   {
    //     email: to,
    //     data: {
    //       name: 'Trander',
    //       account_name: 'Trander25',
    //       account_image: 'your_image'
    //     }
    //   }
    // ]
    // const attachments = [
    //   {
    //     filePath: 'src/files/test01.pdf',
    //     fileName: 'test01',
    //     attachmentType: 'attachment' // Use 'attachment' value to attach file at end of email
    //   },
    //   {
    //     filePath: 'src/files/test02.png',
    //     fileName: 'test02',
    //     attachmentType: 'inline', // Use 'inline' value to embed image file in email
    //     fileId: '123' // Used for HTML inline file reference
    //   }
    // ]
    // const mailerSendInlineResponse = await MailerSendWithInlineProvider.sendEmail({
    //   to,
    //   toName,
    //   subject: 'Created account successfully - {{ name }}',
    //   html: `
    //     <h1>Hello ${createdUser.USERNAME}</h1>
    //     <img src="cid:123" style="width:600px;"/>
    //   `,
    //   templateId: MAILERSEND_TEMPLATE_IDS.REGISTER_ACCOUNT, // Email template ID, separate when having multiple
    //   personalizationData,
    //   attachments
    // })

    // ------------------------------------------------------------

    // Send email with MailerSend with scheduled sending and bulk capabilities
    const personalizationData = [
      {
        email: to,
        data: {
          name: 'Trander',
          account_name: 'Trander25',
          account_image: 'your_image'
        }
      }
    ]
    const attachments = [
      {
        filePath: 'src/files/test01.pdf',
        fileName: 'test01',
        attachmentType: 'attachment' // Use 'attachment' value to attach file at end of email
      },
      {
        filePath: 'src/files/test02.png',
        fileName: 'test02',
        attachmentType: 'inline', // Use 'inline' value to embed image file in email
        fileId: '123' // Used for HTML inline file reference
      }
    ]
    const mailerSendScheduleBulkResponse = await MailerSendWithScheduleBulkProvider.sendEmail({
      to,
      toName,
      subject: 'Created account successfully - {{ name }}',
      html: `
        <h1>Hello ${createdUser.USERNAME}</h1>
        <img src="cid:123" style="width:600px;"/>
      `,
      templateId: MAILERSEND_TEMPLATE_IDS.REGISTER_ACCOUNT, // Email template ID, separate when having multiple
      personalizationData,
      attachments,
      sendAt: Math.floor((new Date(Date.now() + 30 * 60 * 1000)).getTime() / 1000) // 30 minutes - MailerSend uses Unix timestamp so divide by 1000 for seconds
    })

    // ------------------------------------------------------------

    // Return response with created user information
    res.status(StatusCodes.OK).json(createdUser)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const userController = {
  register
}
