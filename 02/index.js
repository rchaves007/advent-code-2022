/**
 * Rules:
 * A -> Rock
 * B -> Paper
 * C -> Scissors
 *
 * Y -> Paper
 * X -> Rock
 * Z -> Scissors
 *
 * Y > A ; Y == B; Y < C
 * X > C ; X == A; X < B
 * Z > B ; Z == C; Z < A
 *
 * Points:
 * X -> 1
 * Y -> 2
 * Z -> 3
 *
 * Win -> 6
 * Tie -> 3
 * Loss -> 0
 *
 */

const { readFileSync} = require('fs');

const shapeScore = {
    X: 1,
    Y: 2,
    Z: 3,
}

const outcomeScores = {
    A: { X: 3, Y: 6, Z: 0 },
    B: { X: 0, Y: 3, Z: 6 },
    C: { X: 6, Y: 0, Z: 3 },
}

const forcedOutcome = {
    X: 0,
    Y: 3,
    Z: 6
}

const getData = () => {
    const contents = readFileSync('./data.txt', 'utf-8');

    return contents.split('\n').map(round => round.replace('\r', '').split(' '))
}

const run1 = () => {
    const points = getData().map(([a,b]) => outcomeScores[a][b]+shapeScore[b]).reduce((a,b) => a+b)

    console.log('part1 :',points)
}


const run2 = () => {
    const points = getData().map(([a,b]) => {
        const newB = Object
            .entries(outcomeScores[a])
            .filter(([_, value]) => value === forcedOutcome[b])
            .flat()[0];

        return outcomeScores[a][newB] + shapeScore[newB]
    }).reduce((a,b) => a+b)

    console.log('part2 :',points)
}

run1()
run2()