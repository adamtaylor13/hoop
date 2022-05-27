import axios from "axios";
import { fetchJobsForWorkflow, fetchPipelines, fetchWorkflow } from "../fetch";
import { Pipeline, Workflow } from "../types";

describe("fetch", function () {
    describe("Pipelines", function () {
        it("should fetch pipelines based on brand and PROJECT_SLUG", async function () {
            jest.spyOn(axios, "get").mockResolvedValueOnce({
                data: "Success!",
            });

            process.env.PROJECT_SLUG = "my_slug";
            await fetchPipelines("foo");
            expect(axios.get).toHaveBeenCalledWith(
                `/project/my_slug/pipeline?branch=foo`
            );
        });
    });

    describe("Workflows", function () {
        it("should fetch workflows based on the pipeline.id", async function () {
            jest.spyOn(axios, "get").mockResolvedValueOnce({
                data: "Success!",
            });

            await fetchWorkflow({ id: "foobar" } as Pipeline);
            expect(axios.get).toHaveBeenCalledWith(`/pipeline/foobar/workflow`);
        });
    });

    describe("Jobs", function () {
        it("should fetch jobs based on the workflow.id", async function () {
            jest.spyOn(axios, "get").mockResolvedValueOnce({
                data: "Success!",
            });

            await fetchJobsForWorkflow({ id: "foobar" } as Workflow);
            expect(axios.get).toHaveBeenCalledWith(`/workflow/foobar/job`);
        });
    });
});
