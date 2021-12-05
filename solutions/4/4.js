const { readFileSync } = require('fs');
const input = readFileSync(__dirname + '/input.txt', 'utf8').split(/\r?\n/);

const allCalled = input[0].split(',').map(x => Number(x));
const boards = [];

// Build boards
for (let i = 2; i < input.length; i += 6) {
    boards.push(
        input.slice(i, i + 5).map(
            row =>
                row
                    .split(' ')
                    .filter(x => x)
                    .map(x => Number(x)) // redo this mess.. or don't
        )
    );
}

// PART 1
const getWinningScore = () => {
    const numbersCopy = [...allCalled];
    const called = new Set();

    while (numbersCopy.length > 0) {
        const next = numbersCopy.shift();
        called.add(next);

        for (const board of boards) {
            if (checkBoardForWin(board, next, called)) {
                return getScore(board, next, called);
            }
        }
    }
};

const checkBoardForWin = (board, next, called) => {
    for (let i = 0; i < board[0].length; i++) {
        const col = board[i].indexOf(next);
        if (col !== -1) {
            return (
                board[i].every(n => called.has(n)) ||
                board.map(n => n[col]).every(n => called.has(n))
            );
        }
    }
};

const getScore = (board, next, called) => {
    let unmarkedScore = 0;
    for (const row of board) {
        unmarkedScore += row
            .filter(num => !called.has(num))
            .reduce((acc, curr) => acc + curr, 0);
    }
    return unmarkedScore * next;
};

console.log('part 1:', getWinningScore());

// PART 2
const getLosingScore = () => {
    const boardsCopy = JSON.parse(JSON.stringify(boards));
    const numbersCopy = [...allCalled];
    const called = new Set();

    let curr = null;

    for (const number of numbersCopy) {
        called.add(number);

        let i = boardsCopy.length;
        while (i--) {
            if (checkBoardForWin(boardsCopy[i], number, called)) {
                curr = boardsCopy.splice(i, 1)[0];
            }

            if (!boardsCopy.length) {
                return getScore(curr, number, called);
            }
        }
    }
};

console.log('part 2:', getLosingScore());
