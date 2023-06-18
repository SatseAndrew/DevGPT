import axios from 'axios';
import { JIRA_API_URL, JIRA_EMAIL, JIRA_API_TOKEN } from './config/jiraConfig';
import { SimpleIssue } from '../interfaces';
import { extractTextFromADF } from './utils/exctractTextFromADF';

export async function fetchJiraIssue(issueId: string): Promise<SimpleIssue> {
  try {
    const token = Buffer
        .from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`)
        .toString('base64');

    const response = await axios.get(
        `${JIRA_API_URL}${issueId}`,
        {
            headers: {
                'Authorization': `Basic ${token}`,
                'Accept': 'application/json'        
            }
        }
    )

    const { fields } = response.data;

    return {
      title: fields.summary,
      description: extractTextFromADF(fields.description)
    };
  } catch (err) {
    console.error(`Error sending request: ${err}`);
    throw err;
  }
}
