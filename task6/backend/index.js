const express = require('express');
const { Issue } = require('./models/issue'); 
const app = express();


async function getIssues() {
  try {
   
    const issues = await Issue.findAll({
      where: {
        Subsystem: {
          [Sequelize.Op.like]: '% - %',  
        },
      },
      order: [
        ['updated', 'ASC'],  
      ],
    });

    return issues;
 
  } catch (e) {
    console.error('Error fetching issues from the database:', e.message);
    return [];
  }
}


app.get('/api/issues', async (req, res) => {
  try {
    const issues = await getIssues();
    res.status(200).json(issues);
  } catch (e) {
    console.error('Error fetching issues for migration:', e.nessage);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/issues/:id', async (req, res) => {
  const issueId = req.params.id;
  const { Subsystem, Component, notifyUsers } = req.body;

  try {
    const issue = await Issue.findByPk(issueId);

    if (!issue) {
      return res.status(404).json({ error: `${issueId} not found` });
    }

    issue.Subsystem = Subsystem;
    issue.Component = Component;

    await issue.save();

    if (notifyUsers) {
      console.log(`Notification sent to users .`);
    }
    return res.status(200).json(`Issue ${issueId} updated successfully`);
  } catch (error) {
    console.error('Error updating issue:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});