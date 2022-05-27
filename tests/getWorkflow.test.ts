import * as Fetch from "../fetch";
jest.mock("../fetch");
import { getWorkflow } from "../getWorkflow";

describe("getWorkflow", function () {
    it("should fetch the workflow matching our WORKFLOW_NAME variable", async function () {
        await expect(
            getWorkflow({ id: "foobar", commit: "commit message" })
        ).resolves.toEqual(
            expect.objectContaining({
                commit: "commit message",
                name: "Build and Test Stuff",
            })
        );
    });

    it("should throw NoWorkflowError if pipeline is actively loading", async function () {
        jest.spyOn(Fetch, "fetchWorkflow").mockImplementationOnce(
            () => ({ items: [] } as any)
        ); // Return no workflows
        await expect(
            getWorkflow({ id: "foobar", commit: "commit message" })
        ).rejects.toThrow(
            "No workflow could be found for pipeline: (foobar) commit message"
        );
    });
});
