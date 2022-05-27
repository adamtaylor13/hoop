jest.mock("../utils");
jest.mock("../fetch");
jest.mock("../currentBranch");

import { run } from "../run";

describe("core logic loop", function () {
    it("should log process results", async function () {
        await run({ fetchInterval: 5 });
    });
});
