// MineSweeper game constants

const GameConst = {
    noOfBombs: 10,
    rows: 9,
    cols: 8,
    secPerMinute: 60,
    gameStates: ['init', 'action', 'defeat', 'victory'],
    gameStateMsg: {
        'init':    '',
        'action':  '',
        'defeat':  'YOU LOST',
        'victory': 'YOU WIN'
    }
} // const GameConst

export default GameConst;
