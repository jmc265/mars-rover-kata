import {execute} from "../index";

describe("plane coords", () => {
    it("should throw an exception when only plane coords are inputted", () => {
        expect(() => execute(["5 5"])).toThrowError();
    });
});

describe("plane coords & rover position only", () => {
    it("should throw an exception when only plane coords & rover position are inputted", () => {
        expect(() => execute([
            "5 5",
            "1 2 N"
        ])).toThrowError();
    });
});

describe("L command", () => {
    it.each([
        ["N", "W"],
        ["E", "N"],
        ["S", "E"],
        ["W", "S"]
    ])("should rotate rover left one turn", (originalDirection, expectedDirection) => {
        expect(execute([
            "5 5",
            `1 2 ${originalDirection}`,
            "L"
        ])).toEqual([`1 2 ${expectedDirection}`]);
    })
});

describe("R command", () => {
    it.each([
        ["N", "E"],
        ["E", "S"],
        ["S", "W"],
        ["W", "N"]
    ])("should rotate rover right one turn", (originalDirection, expectedDirection) => {
        expect(execute([
            "5 5",
            `1 2 ${originalDirection}`,
            "R"
        ])).toEqual([`1 2 ${expectedDirection}`]);
    })
});

describe("M command", () => {
    it.each([
        ["3 3", "3 4"],
        ["2 3", "2 4"]
    ])("should move rover 1 unit north", (originalLocation, expectedLocation) => {
        expect(execute([
            "5 5",
            `${originalLocation} N`,
            "M"
        ])).toEqual([`${expectedLocation} N`]);
    });

    it.each([
        ["3 3", "4 3"],
        ["2 3", "3 3"]
    ])("should move rover 1 unit east", (originalLocation, expectedLocation) => {
        expect(execute([
            "5 5",
            `${originalLocation} E`,
            "M"
        ])).toEqual([`${expectedLocation} E`]);
    });

    it.each([
        ["3 3", "3 2"],
        ["2 3", "2 2"]
    ])("should move rover 1 unit south", (originalLocation, expectedLocation) => {
        expect(execute([
            "5 5",
            `${originalLocation} S`,
            "M"
        ])).toEqual([`${expectedLocation} S`]);
    });

    it.each([
        ["3 3", "2 3"],
        ["2 3", "1 3"]
    ])("should move rover 1 unit west", (originalLocation, expectedLocation) => {
        expect(execute([
            "5 5",
            `${originalLocation} W`,
            "M"
        ])).toEqual([`${expectedLocation} W`]);
    });
});

describe("different initial locations", () => {
    it("should not move the location of the rover", () => {
        expect(execute([
            "5 5",
            "3 3 N",
            "L"
        ])).toEqual(["3 3 W"]);
    });

    it("should throw an exception on invalid initial location", () => {
        expect(() => execute([
            "5 5",
            "6 5 W",
            "M"
        ])).toThrowError();
    });
});

describe("multiple commands", () => {
    it("should rotate then move the rover", () => {
        expect(execute([
            "5 5",
            "3 3 N",
            "RM"
        ])).toEqual(["4 3 E"]);
    });
});

describe("multiple rovers", () => {
    it("should execute for multiple rovers", () => {
        expect(execute([
            "5 5",
            "3 3 N",
            "M",
            "2 2 E",
            "M"
        ])).toEqual([
            "3 4 N",
            "3 2 E"
        ]);
    });
});

describe("test from readme", () => {
    it("should complete the example from the readme", () => {
        expect(execute([
            "5 5",
            "1 2 N",
            "LMLMLMLMM",
            "3 3 E",
            "MMRMMRMRRM",
        ])).toEqual([
            "1 3 N",
            "5 1 E"
        ]);
    });
});