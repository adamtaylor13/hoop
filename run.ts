import { RunConfig } from "./types";
import { caseSensitiveCompare, sleep } from "./utils";
import { getPipelines } from "./getPipelines";
import { getJobsForWorkflow } from "./getJobsForWorkflow";
import { getWorkflow } from "./getWorkflow";
import { currentBranch } from "./currentBranch";
import { logProcessResults } from "./logProcessResults";
import { shouldExitLoop } from "./shouldExitLoop";
import { printJobName } from "./printJobName";

export async function run({ fetchInterval, pipelineIndex }: RunConfig) {
    const branch = await currentBranch();
    // @ts-ignore -- TODO: Document what/why we do this
    Error.prototype.branch = branch;
    while (true) {
        const { pipeline, commitMessage } = await getPipelines(
            branch,
            pipelineIndex
        );
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
