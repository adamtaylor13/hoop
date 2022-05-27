export function shouldExitLoop() {
    let isTest = process.env.NODE_ENV === "test";
    return isTest;
}
