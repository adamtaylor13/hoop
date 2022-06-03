// istanbul ignore file - No point in testing types

import { CliArgs } from "./parseArgs";

export type RunConfig = CliArgs & {
    fetchInterval: number;
};
export const CircleAPIPipelineState = [
    "created",
    "errored",
    "setup-pending",
    "setup",
    "pending",
] as const;
export type CircleAPIPipeline = {
    id: string; // uuid
    errors: string[];
    project_slug: string;
    updated_at: string; // yyyy-mm-ddThh:mm:ss:SSSz
    number: number; // not sure what this is
    state: typeof CircleAPIPipelineState[number];
    created_at: string; // yyyy-mm-ddThh:mm:ss:SSSz
    // trigger: {};
    vcs: {
        origin_repository_url: string;
        target_repositry_url: string;
        revision: string;
        provider_name: string; // Always Github?
        commit?: {
            body: string;
            subject: string;
        };
        branch: string;
    };
};
export type Pipeline = Pick<CircleAPIPipeline, "id" | "number"> & {
    commit: string;
};
export const CircleApiWorkflowStatus = [
    "success",
    "running",
    "not_run",
    "failed",
    "error",
    "failing",
    "on_hold",
    "canceled",
    "unauthorized",
] as const;
export type CircleAPIWorkflow = {
    pipeline_id: string;
    id: string;
    name: string;
    project_slug: string;
    status: typeof CircleApiWorkflowStatus[number];
    started_by: string; // yyyy-mm-ddThh:mm:ss:SSSz
    created_at: string; // yyyy-mm-ddThh:mm:ss:SSSz
    stopped_at: string | null; // yyyy-mm-ddThh:mm:ss:SSSz
    pipeline_number: number;
};
export type Workflow = Pick<CircleAPIWorkflow, "id"> & {
    commit: string;
    pipelineNumber: number;
};
export type CircleAPIJob = {
    dependencies: string[];
    job_number: number;
    id: string; //uuid
    started_at: string; // yyyy-mm-ddThh:mm:ss:SSSz
    name: string;
    project_slug: string;
    status: string;
    type: string; // Verifying with the Circle CI team: https://github.com/circleci/circleci-docs/issues/6874
    stopped_at: string | null; // yyyy-mm-ddThh:mm:ss:SSSz
};
export type Job = Pick<CircleAPIJob, "name" | "status" | "job_number"> & {
    statusEmoji: string;
    commit: string;
    pipeline: {
        number: number;
    };
    workflow: {
        id: string;
    };
};
