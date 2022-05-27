import { CircleAPIWorkflow, Pipeline, Workflow } from "./types";
import { getEmoji } from "./statusEmoji";
import { fetchWorkflow } from "./fetch";

/**
 * Returns the workflow for the given pipeline based on
 * the configured WORKFLOW_NAME variable set in the env.
 * @throws NoWorkflowError
 */
export async function getWorkflow(pipeline: Pipeline): Promise<Workflow> {
    const data = await fetchWorkflow(pipeline);
    let foundWorkflow = data.items
        .map((workflow: CircleAPIWorkflow) => {
            return {
                ...workflow,
                id: workflow.id,
                name: workflow.name,
                status: getEmoji(workflow.status),
                commit: pipeline.commit,
                pipelineNumber: pipeline.number,
            };
        })
        .find((workflow) => workflow.name === process.env.WORKFLOW_NAME);

    if (!foundWorkflow) {
        throw new NoWorkflowError(pipeline);
    }

    return foundWorkflow;
}

/**
 * Typically this just means we are loading a pipeline and
 * it hasn't started the workflow yet, so it's undefined.
 */
export class NoWorkflowError extends Error {
    constructor(pipeline: Pipeline) {
        super(
            `No workflow could be found for pipeline: (${pipeline.id}) ${pipeline.commit}`
        );
    }
}
