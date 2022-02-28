import * as Position from "./models/Position";
import * as Direction from "./models/Direction";
import * as Command from "./models/Command";

export function execute(input: string[]): string[] {
    const [maxX, maxY] = input[0].split(" ").map(s => Number(s));
    const isLocationValidFunc = isLocationValid(maxX, maxY);
    const roverData = input.slice(1);
    const amountRovers = roverData.length / 2;
    const initialPositions = [...Array(amountRovers).keys()]
        .map(i => i * 2)
        .map(i => roverData[i])
        .map(Position.fromString);
    const commands = [...Array(amountRovers).keys()]
        .map(i => (i * 2) + 1)
        .map(i => roverData[i])
        .map(s => Array.from(s).map(Command.fromString));
    
    // Check rover data lengths
    if (amountRovers <= 0 || initialPositions.length !== amountRovers || commands.length !== amountRovers) {
        throw new Error(`Invalid input of rover data`);
    }

    // Check rover data initial positions are correct
    const invalidInitialPositions = initialPositions.filter(pos => !isLocationValidFunc(pos));
    if (invalidInitialPositions.length > 0) {
        throw new Error(`Invalid location(s) ${initialPositions.map(Position.toString)}`);
    }

    // Execute the commands over the initial positions
    const finalPositions = initialPositions.map((pos, index) => commands[index].reduce((prev, curr) => {
        const newPosition = executeCommand(prev, curr);
        if (!isLocationValidFunc(newPosition)) {
            throw new Error(`Invalid location ${Position.toString(newPosition)}`);
        }
        return newPosition;
    }, pos));

    // Output the final positions
    return finalPositions.map(Position.toString);
}

function executeCommand(current: Position.Type, command: Command.Type): Position.Type {
    switch(command) {
        case "L":
        case "R":
            return {...current, direction: Direction.getNewDirection(current.direction, command)};
        case "M":
            return getNewLocation(current);
    }
}

function getNewLocation(current: Position.Type): Position.Type {
    switch(current.direction) {
        case "N": 
            return {...current, y: current.y + 1};
        case "E":
            return {...current, x: current.x + 1};
        case "S":
            return {...current, y: current.y - 1};
        case "W":
            return {...current, x: current.x - 1};
    }
}

function isLocationValid(maxX: number, maxY: number) {
    return (rover: Position.Type) => {
        return rover.x >= 0 && rover.y >= 0 && rover.x <= maxX && rover.y <= maxY;
    }
}
