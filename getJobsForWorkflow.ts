import { CircleAPIJob, Job, Workflow } from "./types";
import { getEmoji } from "./statusEmoji";
import { fetchJobsForWorkflow } from "./fetch";

export async function getJobsForWorkflow(workflow: Workflow): Promise<Job[]> {
    const data = await fetchJobsForWorkflow(workflow);
    return data.items.map(({ status, name }: CircleAPIJob) => {
        return {
            name,
            status: getEmoji(status),
            commit: workflow.commit,
        };
    });
}
