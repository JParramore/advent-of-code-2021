const { readFileSync } = require('fs');
const input = readFileSync(__dirname + '/input.txt', 'utf8').split('\n').map(x => Number(x));

// PART 1
const one = input.reduce((acc, cur, i, arr) => {
    if (i === 0) return 0;
    return cur > arr[i - 1] ? acc + 1 : acc;
}, 0);

console.log('part 1:', one);

// PART 2
const two = input.reduce((acc, cur, i, arr) => {
    if (i === 0) return 0;
    const prev = arr[i-1] + arr[i-2] + arr[i-3];
    const window = cur + arr[i+1] + arr[i+2];

    return window > prev ? acc + 1 : acc;
},0);

console.log('part 2:', two);
