const {readFileSync} = require('fs');

function getCommonChar(a, b) {
    const commonChars = a.split('').filter(as => b.split('').includes(as))
    return [...new Set(commonChars)];
}

function splitString(s) {
    const spliceIndex = s.length / 2
    return [s.slice(0, spliceIndex), s.slice(spliceIndex)];
}

const sum = (a, b) => a + b;

const fileData = readFileSync('./data.txt', 'utf-8')
    .split('\r\n');

function getPriority(c) {
    return c === c.toUpperCase() ? c.charCodeAt(0) - 38 : c.charCodeAt(0) - 96;
}

const part1 = fileData
    .map(s => splitString(s))
    .map(([a, b]) => getCommonChar(a, b)).flat()
    .map(c => getPriority(c))
    .reduce((a, b) => sum(a, b), 0);

function getGroups(array) {
    const finalArray = []
    while (array.length > 0)
        finalArray.push(array.splice(0, 3));

    return finalArray
}

function getGroupLetter(a) {
    const letters = a.reduce((a, b) => a.filter(c => b.includes(c)))
    return [... new Set(letters)];
}

const part2 = getGroups([...fileData])
    .map(a => a.map(b=> b.split('')))
    .map(a=> getGroupLetter(a)).flat()
    .map(c => getPriority(c))
    .reduce((a, b) => sum(a, b), 0);


console.log('part1: ', part1)
console.log('part2: ', part2)
