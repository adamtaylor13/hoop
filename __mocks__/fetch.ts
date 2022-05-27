import {
    CircleAPIJob,
    CircleAPIPipeline,
    CircleAPIWorkflow,
    Pipeline,
    Workflow,
} from "../types";

export async function fetchPipelines(
    branch: string
): Promise<{ items: CircleAPIPipeline[] }> {
    return {
        items: [
            {
                id: "pipelineId1",
                created_at: "2022-05-24T15:11:12.123Z",
                vcs: {
                    commit: {
                        subject: "A lil test commit name!",
                    },
                },
            },
            {
                id: "pipelineId2",
                created_at: "2022-05-25T15:11:12.123Z",
                vcs: {
                    commit: {
                        subject: "A lil test commit name that is more recent",
                    },
                },
            },
        ] as unknown as CircleAPIPipeline[],
    };
}

export async function fetchWorkflow(
    pipeline: Pipeline
): Promise<{ items: CircleAPIWorkflow[] }> {
    process.env.WORKFLOW_NAME = "Build and Test Stuff";
    return {
        items: [
            {
                pipeline_id: "foobar",
                id: "123",
                name: "Test the stuff",
                project_slug: "/project/foobar",
                status: "running",
                started_by: "adam",
                created_at: "2022-05-26 14:27:43:000Z",
                stopped_at: null,
                pipeline_number: 34,
            },
            {
                pipeline_id: "bazbunq",
                id: "345",
                name: "Build and Test Stuff",
                project_slug: "/project/baz",
                status: "waiting",
                started_by: "adam",
                created_at: "2022-05-26 15:27:43:000Z",
                stopped_at: null,
                pipeline_number: 35,
            },
        ],
    };
}

export async function fetchJobsForWorkflow(
    workflow: Workflow
): Promise<{ items: CircleAPIJob[] }> {
    return {
        items: [
            {
                id: "a549fbd5-1091-4b6e-a79e-b9559b7c4857",
                job_number: 123,
                dependencies: [],
                started_at: "2022-05-26T20:13:31:000Z",
                name: "Foo Job",
                project_slug: "/test_slug/",
                status: "running",
                type: "SOME_TYPE",
                stopped_at: null,
            },
        ],
    };
}
