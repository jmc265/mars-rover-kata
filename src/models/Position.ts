import * as Direction from "./Direction";

export interface Type {
    x: number,
    y: number,
    direction: Direction.Type
}

export function fromString(inputPosition: string): Type {
    const [xString, yString, direction] = inputPosition.split(" ");
    return {
        x: Number(xString),
        y: Number(yString),
        direction: Direction.fromString(direction)
    };
}

export function toString(position: Type): string {
    return `${position.x} ${position.y} ${position.direction}`;
}