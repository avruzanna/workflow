const cron = require('node-cron');

const assignees = [
    { id: '12', name: 'Anna', developerOf: "Java" },
    { id: '13', name: 'Bob', developerOf: "Python" },
    { id: '14', name: 'Joe', developerOf: "C++" },
];

function getNextMonthDetails() {
    const now = new Date();
    const nextMonth = now.getMonth() + 1; 
    const year = now.getFullYear();
    const nextMonthName = new Date(year, nextMonth).toLocaleString('default', { month: 'long' });
    const dueDate = new Date(year, nextMonth, 1); 
    return {
        nextMonthName,
        nextMonthYear: year,
        dueDate,
    };
}

async function createIssue(summary, assigneeId, dueDate) {
    const data = {
        summary: summary,
        assignee: assigneeId,
        due_date: dueDate,
        status: 'Open',
    };

    try {
        const response = await fetch(
           'https://example.com/api/issues/createIssue', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if( response.success) {
            console.log(`Issue created: ${summary}`);
        }
    }catch(e){
        throw new Error(e.message);
    }
}


async function createMonthlyIssues() {
    const { nextMonthName, dueDate } = getNextMonthDetails();

    const summaries = [
        `Newsletter for Java Developers in ${nextMonthName}`,
        `Newsletter for Python Developers in ${nextMonthName}`,
        `Newsletter for C++ Developers in ${nextMonthName}`,
    ];

    for (let i = 0; i < 3; i++) {
        const assigneeId = assignees[i].id;
        const summary = summaries[i];
        await createIssue(summary, assigneeId, dueDate); 
    }
}

cron.schedule('0 9 15 * *', () => {
    console.log('Monthly task to create issues...');
    createMonthlyIssues();
});