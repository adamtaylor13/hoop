import columns from "cli-columns";

export function logProcessResults(
    commitMessage: string,
    jobStatusLabels: string[]
) {
    console.clear();

    let message = `Job for:\n${commitMessage}`;
    let messageDelimiter = `-`.repeat(message.length);

    console.log(messageDelimiter);
    console.log(message);
    console.log(messageDelimiter);
    console.log("\n\n");

    // TODO: Big message when some sort of success / finished state is true
    console.log(columns(jobStatusLabels, { sort: false }));
}
