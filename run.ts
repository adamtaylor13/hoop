import { RunConfig } from "./types";
import { caseSensitiveCompare, sleep } from "./utils";
import { getPipelines } from "./getPipelines";
import { getJobsForWorkflow } from "./getJobsForWorkflow";
import { getWorkflow } from "./getWorkflow";
import { currentBranch } from "./currentBranch";
import { logProcessResults } from "./logProcessResults";
import { shouldExitLoop } from "./shouldExitLoop";
import { printJobName } from "./printJobName";

// TODO: Implement blessed: https://badacadabra.github.io/Building-a-visual-form-in-your-terminal-emulator-with-Blessed/

export async function run({ fetchInterval }: RunConfig) {
    const branch = await currentBranch();
    // @ts-ignore -- TODO: Document what/why we do this
    Error.prototype.branch = branch;
    while (true) {
        const { pipeline, commitMessage } = await getPipelines(branch);
        const workflow = await getWorkflow(pipeline);
        const jobs = await getJobsForWorkflow(workflow);

        const jobStatusLabels = jobs
            .sort(caseSensitiveCompare)
            .map((job) => `${job.statusEmoji} ${printJobName(job)}`);

        logProcessResults(commitMessage, jobStatusLabels);
        await sleep(fetchInterval);
        // istanbul ignore else - Else not important
        if (shouldExitLoop()) {
            break;
        }
    }
}
