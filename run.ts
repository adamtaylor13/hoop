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

        // TODO: Make this part of a plugin-system which defines something we
        //  can do with the process results.
        //  example: Log the results (as we do now)
        //  example: On success (whatever that looks like) do something else
        //  perhaps we also allow the plugins to define "shouldExitLoop" programmatically?
        //  Unsure what that looks like for now.
        logProcessResults(commitMessage, jobStatusLabels);
        await sleep(fetchInterval);
        // istanbul ignore else - Else not important
        if (shouldExitLoop()) {
            break;
        }
    }
}
