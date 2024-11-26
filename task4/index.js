const cron = require('node-cron');
const { getIssuesForReminder, updateResolvedIssues } = require('./issueService');  
const { sendEmail } = require('./sendEmail')

const projectLeaderEmail = 'project.leader@example.com';


async function sendReminderEmails() {
    try {
        const issues = await getIssuesForReminder('reminder');

        for (const issue of issues) {
            const { id, assignee, status, title } = issue;

            const email = assignee ? assignee.email : projectLeaderEmail;
            const subject = `Reminder: Unresolved Issue - ${id}`;
            const text = `Hi, The issue "${title}" is still unresolved. Please take action.`;
            await sendEmail(email, subject, text);
            updateResolvedIssues(id);

        }
    } catch (error) {
        console.error('Error sending reminder emails:', error);
    }
}




cron.schedule('0 8 * * *', () => {
    console.log('Sending daily reminder emails...');
    sendReminderEmails();
});