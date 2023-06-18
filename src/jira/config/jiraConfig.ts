if (!process.env['JIRA_DOMAIN']) {
    throw new Error(`JIRA_DOMAIN is not defined in your environment variables`);
}

if (!process.env['JIRA_EMAIL']) {
    throw new Error(`JIRA_EMAIL is not defined in your environment variables`);
}

if (!process.env['JIRA_API_TOKEN']) {
    throw new Error(`JIRA_API_TOKEN is not defined in your environment variables`);
}

export const JIRA_DOMAIN = process.env['JIRA_DOMAIN'];
export const JIRA_EMAIL = process.env['JIRA_EMAIL'];
export const JIRA_API_TOKEN = process.env['JIRA_API_TOKEN'];
export const JIRA_API_URL = `https://${JIRA_DOMAIN}.atlassian.net/rest/api/3/issue/`;
