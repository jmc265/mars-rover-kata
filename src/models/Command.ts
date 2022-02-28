const commands = ["L", "R", "M"] as const;
export type Type = typeof commands[number];
export type RotationType = Omit<Type, "M">;

export function fromString(value: string): Type {
    if (!isCommand(value)) {
        throw new Error(`Unknown command ${value}`);
    }
    return value;
}

function isCommand(value: string): value is Type {
    return typeof value === "string" && commands.find((command) => command === value) !== null;
}
