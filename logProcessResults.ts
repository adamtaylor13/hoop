import columns from "cli-columns";

export function logProcessResults(
    commitMessage: string,
    jobStatusLabels: string[]
) {
    console.clear();

    let message = `Job for:\n${commitMessage}`;
    let messageDelimiter = `-`.repeat(message.length);
    let content = `${messageDelimiter}\n${message}\n${messageDelimiter}`;
    console.log(content);

    // TODO: Some sort of success / finished state is true
    console.log(columns(jobStatusLabels, { sort: false }));
}
