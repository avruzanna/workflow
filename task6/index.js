const API_URL = "http://localhost:3000/";

async function updateIssueFields(issue) {
    const [subsystem, component] = issue.Subsystem.split(' - ');
  
    const updateData = {
      Subsystem: subsystem,  
      Component: component,
      notifyUsers: false
    };
  
    try {
      const response = await fetch(`${API_URL}/${issue.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update issue ${issue.id}`);
      }
  
      console.log(`Successfully updated issue: ${issue.id}`);
    } catch (error) {
      console.error(`Error updating issue ${issue.id}:`, error.message);
    }
  }
  
  async function migrateSubsystemComponent() {
    try {
      const response = await fetch(`${API_URL}api/issues`);
      const issuesToUpdate = await response.json();
  
      if (issuesToUpdate.length === 0) {
        console.log('No issues to update.');
        return;
      }

      for (const issue of issuesToUpdate) {
        await updateIssueFields(issue);
      }
  
      console.log('Migration completed!');
    } catch (e) {
      console.error('Error during migration:', e.message);
    }
  }
  
  
  migrateSubsystemComponent();
  