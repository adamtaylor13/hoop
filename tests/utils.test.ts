import { caseSensitiveCompare, sleep } from "../utils";

describe("Sleep", function () {
    it("should wait for X seconds", async function () {
        const seconds = 0.1;
        const multiplier = 1000;
        let now = new Date().valueOf();
        await sleep(seconds);
        let totalTime = new Date().valueOf() - now;
        expect(totalTime).toBeGreaterThanOrEqual(seconds * multiplier);
    });
});

describe("caseSensitiveCompare", function () {
    it.each([
        ["abcABC", "aAbBcC"],
        ["AaBbCc", "aAbBcC"],
        ["✅❌⚠️", "️⚠✅❌"], // Emoji loses something here, but functionally the same?
        ["ABC", "ABC"],
    ])("should sort %s to equal %s", function (strings, result) {
        let sortedArray = strings.split("").sort(caseSensitiveCompare);
        expect(sortedArray.join("")).toBe(result);
    });

    it("should sort arrays of strings as well", function () {
        expect(["abc", "def"].sort(caseSensitiveCompare)).toEqual([
            "abc",
            "def",
        ]);
        expect(["abc", "abc"].sort(caseSensitiveCompare)).toEqual([
            "abc",
            "abc",
        ]);
    });
});
