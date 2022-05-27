import axios from "axios";
import {
    CircleAPIJob,
    CircleAPIPipeline,
    CircleAPIWorkflow,
    Job,
    Pipeline,
    Workflow,
} from "./types";

export async function fetchPipelines(
    branch: string
): Promise<{ items: CircleAPIPipeline[] }> {
    const { data } = await axios.get(
        `/project/${process.env.PROJECT_SLUG}/pipeline?branch=${branch}`
    );
    return data;
}

export async function fetchWorkflow(
    pipeline: Pipeline
): Promise<{ items: CircleAPIWorkflow[] }> {
    const { data } = await axios.get(`/pipeline/${pipeline.id}/workflow`);
    return data;
}

export async function fetchJobsForWorkflow(
    workflow: Workflow
): Promise<{ items: CircleAPIJob[] }> {
    const { data } = await axios.get(`/workflow/${workflow.id}/job`);
    return data;
}
