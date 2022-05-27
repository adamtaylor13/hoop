import { Job } from "./types";

// Borrowed from: https://github.com/sindresorhus/ansi-escapes as I did not
// wish to import the entire package just to print a link to my terminal.
// Note that this will not check if the terminal can print a link, it will
// simply blindly do so, without taking a moment to consider its actions!

const OSC = "\u001B]";
const BEL = "\u0007";
const SEP = ";";
const BASE_CIRCLE_APP_URL = "https://app.circleci.com";

export function jobNameWithLink(job: Job) {
    const text = job.name;
    const url = `${BASE_CIRCLE_APP_URL}/pipelines/${process.env.PROJECT_SLUG}/${job.pipeline.number}/workflows/${job.workflow.id}/jobs/${job.job_number}`;
    return [OSC, "8", SEP, SEP, url, BEL, text, OSC, "8", SEP, SEP, BEL].join(
        ""
    );
}
