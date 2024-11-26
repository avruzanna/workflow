const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('api-key');  

async function sendEmail(to, subject, text) {
    const msg = {
        to,
        from: 'tracker.reminder@example.com', 
        subject,
        text,
    };
    
    try {
        await sgMail.send(msg);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = { sendEmail };