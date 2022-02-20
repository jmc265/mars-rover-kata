import {add} from "../index";

describe("add function", () => {
    it.each([
        [1, 2, 3]
    ])("should add %i & %i to get %i", (a, b, expected) => {
        expect(add(a, b)).toEqual(expected);
    });
});