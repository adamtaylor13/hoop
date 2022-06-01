import { status } from "./stdout/status";

export function logProcessResults(
    commitMessage: string,
    jobStatusLabels: string[]
) {
    let message = `Job for:\n${commitMessage}`;
    let messageDelimiter = `-`.repeat(message.length);
    let content = `${messageDelimiter}\n${message}\n${messageDelimiter}`;

    // TODO: Big message when some sort of success / finished state is true
    status.render(content, jobStatusLabels);
}
