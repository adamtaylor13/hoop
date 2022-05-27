import { jobNameWithLink } from "../jobNameWithLink";

describe("jobNameWithLink", function () {
    it("should print out a job's name with a terminal escape sequence that prints a link", function () {
        expect(
            jobNameWithLink({
                status: "failed",
                workflow: { id: "workflow-id" },
                name: "failed job",
                commit: "Committing foobar",
                pipeline: { number: 123 },
                job_number: 456,
                statusEmoji: "",
            })
        ).toBe("]8;;https://app.circleci.com/pipelines/undefined/123/workflows/workflow-id/jobs/456failed job]8;;");
    });
});
