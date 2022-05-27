import { exec } from "child_process";

// istanbul ignore file - This feels arduous to test and won't change much
export async function currentBranch(): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(
            `git -C ${process.env.REPO_PATH} rev-parse --abbrev-ref HEAD`,
            (err, stdout, stderr) => {
                if (err) {
                    console.error("Error in currentBranch:", err);
                    reject(err);
                }

                resolve(stdout.trim());
            }
        );
    });
}
