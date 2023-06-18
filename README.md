# DevGPT

DevGPT is a Node.JS console application that leverages the power of OpenAI's ChatGPT to automate and enhance programming-related tasks. By integrating with Git, Jira, and GitHub, this application streamlines your development workflow, helping you to focus more on writing code and less on administrative tasks. 

## Features

1. **Commit Message Writer**: Generate a meaningful git commit message based on the staged changes in your local git repository. Run the command `devgpt write git message`.

2. **Pull Request Description Writer**: Craft a comprehensive pull request description using commit logs, Jira tickets, and optionally, a GitHub pull request template. Run the command `devgpt write pr description`.

3. **Code Review**: Have your code reviewed with just a single command. This feature provides feedback on how to improve the code. Run the command `review <filepath>`.

## Installation & Setup

Clone this repository locally and install dependencies:

```bash
git clone https://github.com/SatseAndrew/DevGPT
cd devgpt
npm install
```

Set the following environment variables for the application:

1. `OPENAI_API_KEY`: Your API key for making requests to OpenAI.
2. `JIRA_DOMAIN`: The domain name of your Jira host.
3. `JIRA_EMAIL`: The email address associated with the Jira user that will perform API requests.
4. `JIRA_API_TOKEN`: The API token for making requests to Jira.

These variables can be set in a `.env` file in the root of your project. An example of the `.env` file is shown below:

```
OPENAI_API_KEY=your-openai-api-key
JIRA_DOMAIN=your-jira-domain
JIRA_EMAIL=your-jira-email
JIRA_API_TOKEN=your-jira-api-token
```

Replace `your-openai-api-key`, `your-jira-domain`, `your-jira-email`, and `your-jira-api-token` with your actual information.

## Usage

To use DevGPT, run the following command in your terminal:

```bash
npm run start <command>
```

Replace `<command>` with any of the following commands:

- `write git message`
- `write pr description`
- `review <filepath>`

For example, to have DevGPT write a git commit message, you would run:

```bash
npm run start write git message
```

When you build the application, it becomes globally accessible on your machine. This allows you to run the app from any directory you choose. To build the application, run the following command:

```bash
npm run build
```

## Development

While developing the app you can run the following command to compile the typescript files whenever you save, causing the app to restart with the new build:

```bash
npm run dev <command>
```

## Goals

The primary goal of DevGPT is to increase your productivity as a developer. By handling the administrative parts of the coding process, DevGPT allows you to focus on what you do best - coding.

## Contributing

We encourage you to contribute to DevGPT! Please check out the [Contributing guide](CONTRIBUTING.md) for guidelines about how to proceed.

## License

DevGPT is released under the [MIT License](LICENSE.md).