# EaaS - Email as a Service (Node.js)

A Node.js backend providing robust, flexible, and developer-friendly APIs for sending transactional, bulk, scheduled, and templated emails via Email-as-a-Service platforms (MailerSend, Resend, etc.). This solution is ideal for SaaS platforms, apps, or services needing reliable email delivery, attachments, templates, and advanced features with minimal setup.

---

## Features

- **Provider Abstraction:** Easily switch between MailerSend and Resend for email delivery.
- **Transactional Emails:** Send confirmations, notifications, and other transactional emails.
- **Bulk & Scheduled Emails:** Send emails to large recipient lists, with support for scheduling future sends.
- **Template Support:** Integrate with MailerSend’s templates and personalization for smart content.
- **Attachments & Inline Embedding:** Attach files (PDFs, images), or embed images inline in HTML emails.
- **CC/BCC Support:** Add carbon copy and blind carbon copy recipients.
- **Environment Variable Support:** (Recommended) Store API keys and sender info securely outside code.
- **Mocked User Actions:** Example flows for user registration with email confirmation.

---

## Providers Supported

- **MailerSend**
  - Transactional, bulk, scheduled, template, attachments, inline images
- **Resend**
  - Transactional emails, easy testing with dev domains

---

## Example Usage

### Sending a Transactional Email

```js
// Using Resend
await ResendProvider.sendEmail({
  to: 'user@example.com',
  subject: 'Welcome to EaaS!',
  html: '<h1>Hello User</h1><p>Your account has been created.</p>'
});

// Using MailerSend
await MailerSendProvider.sendEmail({
  to: 'user@example.com',
  toName: 'User Name',
  subject: 'Welcome to EaaS!',
  html: '<h1>Hello User</h1><p>Your account has been created.</p>'
});
```

### Sending Bulk or Scheduled Emails (MailerSend)

```js
await MailerSendWithScheduleBulkProvider.sendEmail({
  to: 'user@example.com',
  toName: 'User Name',
  subject: 'Scheduled Email',
  html: '<h1>Hello User</h1>',
  templateId: 'your_template_id',
  personalizationData: [ /* ... */ ],
  attachments: [ /* ... */ ],
  sendAt: new Date(Date.now() + 3600 * 1000) // send after 1 hour
});
```

### Sending Emails with Attachments

```js
await MailerSendWithAttachmentsProvider.sendEmail({
  to: 'user@example.com',
  toName: 'User Name',
  subject: 'Document Attached',
  html: '<h1>Hello User</h1>',
  templateId: 'your_template_id',
  attachments: [
    { filePath: 'src/files/test01.pdf', fileName: 'test01.pdf', attachmentType: 'attachment' }
  ]
});
```

---

## Directory Structure

```
src/
├── controllers/           # Example controllers (user registration etc.)
├── providers/             # Email provider integrations (MailerSend, Resend)
├── models/                # Mock database or data structures
├── utils/                 # Templates, constants, etc.
```

---

## Configuration

- **API Keys & Sender Info:**  
  Store your `MAILER_SEND_API_KEY`, `RESEND_API_KEY`, sender email/name in environment variables for production use.
- **Templates:**  
  Create and configure email templates in your MailerSend dashboard.
- **File Attachments:**  
  Place files to attach in the appropriate directory and reference them via their path.

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/trander-25/EaaS-Email-as-a-Service-Nodejs.git
   cd EaaS-Email-as-a-Service-Nodejs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Add your email provider API keys and sender details to a `.env` file or your environment.

4. **Run the server**
   ```bash
   npm run dev
   ```

---

## Security & Best Practices

- **Never hardcode API keys in production.** Use environment variables.
- **Verify sender domains for production use.**
- **Handle errors gracefully and log them securely.**
- **Use real database/user storage for production flows.**

---

## Author

[Trander](https://github.com/trander-25)

---

## License

No license specified.
