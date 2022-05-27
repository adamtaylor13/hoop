import { Job } from "./types";
import { jobNameWithLink } from "./jobNameWithLink";

export function printJobName(job: Job) {
    if (job.status === "failed") {
        return jobNameWithLink(job);
    } else {
        return job.name;
    }
}