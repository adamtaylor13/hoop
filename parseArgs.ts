export type CliArgs = {
    pipelineIndex?: string;
};

export function parseArgs(): CliArgs {
    const argArray = process.argv.slice(2);

    const argObj = argArray.reduce((acc, curr) => {
        let [key, value] = curr.split("="); // --key, value
        key = key.slice(2);
        acc[key] = value;
        return acc;
    }, {});

    return argObj;
}
