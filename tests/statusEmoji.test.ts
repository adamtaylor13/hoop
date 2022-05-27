import { getEmoji } from "../statusEmoji";

describe("Status Emoji", function () {
    it("should return the emoji matching the status", function () {
        expect(getEmoji("running")).toBe("▶️ ");
    });
    it("should return the status itself if no emoji matches", function () {
        expect(getEmoji("foobar")).toBe("foobar");
    });
});
