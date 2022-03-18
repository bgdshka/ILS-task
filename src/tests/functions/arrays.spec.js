import { arraysEqual } from "../../functions/arrays";

describe("Function::arraysEqual", () => {
  it("Should return true if arrays are equal", () => {
    expect(arraysEqual([1],[1])).toEqual(true);
  });
  it("Should return false if arrays aren't equal", () => {
    expect(arraysEqual([1],[2])).toEqual(false);
  });
});
