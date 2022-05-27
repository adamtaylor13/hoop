jest.mock("../fetch");
import { getPipelines } from "../getPipelines";

describe("getPipelines", function () {
    it("should sort pipelines with the most recent first", async function () {
        await expect(getPipelines("foo")).resolves.toEqual(
            expect.objectContaining({
                commitMessage: "A lil test commit name that is more recent",
            })
        );
    });

    it("should apply the commit message to be the most recent pipeline's commit", async function () {
        const sameCommitMessage = "A lil test commit name that is more recent";
        await expect(getPipelines("foo")).resolves.toEqual(
            expect.objectContaining({
                commitMessage: sameCommitMessage,
                pipeline: expect.objectContaining({
                    commit: sameCommitMessage,
                }),
            })
        );
    });
});
