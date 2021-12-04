const { readFileSync } = require('fs');
const input = readFileSync(__dirname + '/input.txt', 'utf8').split(/\r?\n/);

// PART 1
const flattenInput = (nums) => {
    let countIndexes = Array(nums[0].length).fill(0);

    nums.forEach(num => {
        num.split('')
            .map(x => Number(x))
            .forEach((bit, index) => {
                countIndexes[index] += bit === 0 ? -1 : 1;
            });
    });

    return countIndexes.map(bit => bit >= 0 ? 1 : 0).join('');
}

const gamma = flattenInput(input);
const epsilon = flattenInput(input).split('').map(x => x === '1' ? '0' : '1').join('');

console.log('part 1:', parseInt(gamma,2) * parseInt(epsilon,2));

// PART 2
const getO2Rating = (nums, i = 0) => {
    const flat = flattenInput(nums);

    const filtered = nums.filter(num => num[i] === flat[i]);

    if (filtered.length === 1) {
        return filtered;
    }

    return getO2Rating(filtered, i+1);
}

const getCO2Rating = (nums, i = 0) => {
    const flat = flattenInput(nums).split('').map(x => x === '1' ? '0' : '1').join('');

    const filtered = nums.filter(num => num[i] === flat[i]);

    if (filtered.length === 1) {
        return filtered;
    }

    return getCO2Rating(filtered, i+1);
}

console.log('part 2:', parseInt(getCO2Rating(input), 2) * parseInt(getO2Rating(input), 2));
