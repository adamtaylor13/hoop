import dayjs from "dayjs";
import { CircleAPIPipeline, Pipeline } from "./types";
import { fetchPipelines } from "./fetch";

export async function getPipelines(
    branch: string
): Promise<{ pipeline: Pipeline; commitMessage: string }> {
    const data = await fetchPipelines(branch);
    let [firstPipeline] = data.items
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

    return { pipeline: firstPipeline, commitMessage: firstPipeline.commit };
}
