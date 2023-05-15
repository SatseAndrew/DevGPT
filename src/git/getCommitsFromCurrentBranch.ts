import simpleGit from "simple-git";
import { getCurrentBranch } from './getCurrentBranch';
import { CommitInfo } from "../interfaces";

const git = simpleGit();

/**
 * Fetch commits of the current branch
 */
export async function getCommitsFromCurrentBranch(): Promise<CommitInfo[]> {
    const currentBranch = await getCurrentBranch();

    const log = await git.log({ from: currentBranch });

    let commitInfos: CommitInfo[] = [];

    for (const logEntry of log.all) {
        const diff = await git.diff(['-w', logEntry.hash]);

        commitInfos.push({
            subject: logEntry.message,
            body: logEntry.body,
            diff
        });
    }

    return commitInfos;
}
