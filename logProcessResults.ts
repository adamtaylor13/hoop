import columns from "cli-columns";

export function logProcessResults(
    commitMessage: string,
    jobStatusLabels: string[]
) {
    console.clear();

    let message = `Job for:\n${commitMessage}`;
    console.log(`-`.repeat(message.length));
    console.log(message);
    console.log(`-`.repeat(message.length));
    console.log("\n\n");
    // TODO: Big message when allow-merge is true
    console.log(columns(jobStatusLabels, { sort: false }));
}
