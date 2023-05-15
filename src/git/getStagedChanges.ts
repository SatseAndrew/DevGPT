import simpleGit from "simple-git";

const git = simpleGit();

/**
 * Fetch the changes that are staged for commit.
 */
export async function getStagedChanges(): Promise<string> {
    return await git.diff(['--staged']);
}
