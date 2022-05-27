import { CircleAPIJob, Job, Workflow } from "./types";
import { getEmoji } from "./statusEmoji";
import { fetchJobsForWorkflow } from "./fetch";

export async function getJobsForWorkflow(workflow: Workflow): Promise<Job[]> {
    const data = await fetchJobsForWorkflow(workflow);
    return data.items.map(({ status, name, job_number }: CircleAPIJob) => {
        return {
            name,
            status: status,
            statusEmoji: getEmoji(status),
            commit: workflow.commit,
            job_number,
            pipeline: {
                number: workflow.pipelineNumber,
            },
            workflow: {
                id: workflow.id,
            },
        };
    });
}
