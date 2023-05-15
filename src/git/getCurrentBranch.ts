import simpleGit from 'simple-git';

const git = simpleGit();

/**
 * Fetch the name of the current branch.
 */
export async function getCurrentBranch(): Promise<string> {
    const status = await git.status();
    return status.current ?? "";
}
