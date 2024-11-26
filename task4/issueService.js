let issues = [
    {
        id: '1',
        title: 'Issue 1: Cannot login',
        status: 'unresolved',
        tags: ['reminder'],
        assignee: { id: '12', email: 'john.doe@example.com', name: 'John Doe' },
    },
    {
        id: '2',
        title: 'Issue 2: UI bug in dashboard',
        status: 'resolved',
        tags: ['reminder'],
        assignee: { id: '34', email: 'anna.smith@example.com', name: 'Anna Smith' },
    },
    {
        id: '3',
        title: 'Issue 3: Database connection failure',
        status: 'unresolved',
        tags: ['reminder'],
        assignee: null,
    },
    {
        id: '4',
        title: 'Issue 4: Logout error',
        status: 'resolved',
        tags: ['reminder'],
        assignee: { id: '34', email: 'anna.smith@example.com', name: 'Anna Smith' },
    },
];

async function getIssuesForReminder(tag) {
    return issues.filter(issue => issue.status !== 'resolved' && issue.tags.includes(tag));
}
async function updateResolvedIssues (issueId) {
    const issue = issues.find(issue => issue.id === issueId);
    if( issue) {
        issue.tags = issue.tags.filter( (tag) =>  tag !== 'reminder' )
    }
}
  
module.exports = {
    getIssuesForReminder,
    updateResolvedIssues 
}