import axios from "axios";
import {
    CircleAPIJob,
    CircleAPIPipeline,
    CircleAPIWorkflow,
    Pipeline,
    Workflow,
} from "./types";

const BASE_CIRCLE_API_URL = "https://circleci.com/api/v2";
axios.defaults.baseURL = BASE_CIRCLE_API_URL;
axios.defaults.headers.common["Circle-Token"] = process.env.CIRCLE_API_TOKEN;
axios.defaults.headers.common["Content-Type"] = `text/plain`;

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
