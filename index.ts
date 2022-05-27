// istanbul ignore file - All tests for this are in run.ts
import { run } from "./run";
import { NoWorkflowError } from "./getWorkflow";

function viewBranch(error) {
    if (error.branch) {
        console.log(
            `Check out the pipeline here: https://app.circleci.com/pipelines/${process.env.PROJECT_SLUG}?branch=${error.branch}&filter=all`
        );
    }
}

process.on("uncaughtException", function (err) {
    console.error("Uncaught exception! Stack was:");
    console.error(err.stack);
    viewBranch(err);
});

process.on("unhandledRejection", function (error) {
    console.error("Unhandled Promise Rejection:");
    console.error(error);
    viewBranch(error);
});

try {
    run({
        fetchInterval: 5,
    });
} catch (error) {
    if (error instanceof NoWorkflowError) {
        const tenSeconds = 10000;
        // Re-try with a 10s delay to let the pipeline finish loading
        setTimeout(() => {
            run({
                fetchInterval: 5,
            });
        }, tenSeconds);
    } else {
        console.error("Error caught: ", error);
    }
}
