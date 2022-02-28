const directions = ["N", "E", "W", "S"] as const;
export type Type = typeof directions[number];

const rotationMap: {[D in Type]: {[C in "L" | "R"]: Type}} = {
    "N": {
        "L": "W",
        "R": "E"
    },
    "E": {
        "L": "N",
        "R": "S",
    },
    "S": {
        "L": "E",
        "R": "W",
    },
    "W": {
        "L": "S",
        "R": "N"
    }
};

export function fromString(value: string): Type {
    if (!isDirection(value)) {
        throw new Error(`Unknown direction ${value}`);
    }
    return value;
}

function isDirection(value: string): value is Type {
    return typeof value === "string" && directions.find((direction) => direction === value) !== null;
}

export function getNewDirection(current: Type, command: "L" | "R"): Type {
    return rotationMap[current][command];
}
