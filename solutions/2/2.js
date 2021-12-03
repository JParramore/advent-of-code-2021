const { readFileSync } = require('fs');
const input = readFileSync(__dirname + '/input.txt', 'utf8').split(/\r?\n/).map(x => x.split(' '));

// PART 1
let horizontal = 0;
let vertical = 0;

input.forEach(instruction => {
    switch (instruction[0]){
        case 'up':
            vertical -= Number(instruction[1]);
            break;
        case 'down':
            vertical += Number(instruction[1]);
            break;
        case 'forward':
            horizontal += Number(instruction[1]);
            break;
    }
});

console.log('part 1:', horizontal*vertical);

// PART 2
horizontal = 0;
vertical = 0;
let aim = 0;

input.forEach(instruction => {
    switch (instruction[0]){
        case 'up':
            aim -= Number(instruction[1]);
            break;
        case 'down':
            aim += Number(instruction[1]);
            break;
        case 'forward':
            horizontal += Number(instruction[1]);
            vertical += aim *  Number(instruction[1]);
            break;
    }
});

console.log('part 2:', horizontal*vertical);
