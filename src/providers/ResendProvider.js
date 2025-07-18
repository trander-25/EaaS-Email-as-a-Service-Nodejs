import { Resend } from 'resend'

// TODO: Secure API key with environment variables
const RESEND_API_KEY = 'your_resend_api_key' || process.env.RESEND_API_KEY

// Use Resend's dev email for testing without domain verification
// For production, configure your own verified domain
const ADMIN_SENDER_EMAIL = 'onboarding@resend.dev' || process.env.ADMIN_SENDER_EMAIL

// Initialize Resend instance
const resendInstance = new Resend(RESEND_API_KEY)

// Send email function
const sendEmail = async ({ to, subject, html }) => {
  try {
    const data = await resendInstance.emails.send({
      from: ADMIN_SENDER_EMAIL,
      to, // Limited to registered email without verified domain
      subject,
      html
    })
    return data
  } catch (error) {
    throw error
  }
}

export const ResendProvider = {
  sendEmail
}
