const {readFileSync} = require('fs');

const fullyContains = (sect1, sect2) => sect1[0] <= sect2[0] && sect1[1] >= sect2[1]

const semiContains = (sect1, sect2) => sect1[0] <= sect2[0] && sect1[1] >= sect2[0]


const fileData = readFileSync('./data.txt', 'utf-8')
    .split('\r\n')
    .map(s => s.split(',').map(as => as.split('-').map(Number)));


const part1 = fileData.filter(s => fullyContains(s[0], s[1]) || fullyContains(s[1], s[0]));

const part2 = fileData.filter(s => semiContains(s[0], s[1]) || semiContains(s[1], s[0]));

console.log('part1: ', part1.length)
console.log('part2: ', part2.length)
