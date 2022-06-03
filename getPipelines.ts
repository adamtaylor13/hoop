import dayjs from "dayjs";
import { CircleAPIPipeline, Pipeline } from "./types";
import { fetchPipelines } from "./fetch";

export async function getPipelines(
    branch: string,
    pipelineIndex?: string
): Promise<{ pipeline: Pipeline; commitMessage: string }> {
    const data = await fetchPipelines(branch);
    let pipelines = data.items
        .sort(
            (a, b) =>
                dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf()
        )
        .map(({ id, vcs, number }: CircleAPIPipeline): Pipeline => {
            return {
                id,
                commit: vcs?.commit?.subject,
                number,
            };
        });

    // If passed an index, get that one, otherwise--get the first pipeline
    const pipeline =
        typeof pipelineIndex === "string"
            ? pipelines.slice(parseInt(pipelineIndex))[0]
            : pipelines[0];

    return { pipeline: pipeline, commitMessage: pipeline.commit };
}
