//newPlayer factory Function 
const newPlayer = (name, marker) => {
    return {name, marker}
}

//gameboard object
var gameBoard = (() => {
    
    //generate board array
    let board = [];
    
    for (let i = 0; i < 9; i++)  {
        board.push('');
    };

    //add and display div elements for the mainBoard
    const mainBoard = document.getElementById('main-board');

    board.forEach((item, index) => {
        let gameTile = document.createElement('div');
        gameTile.dataset.tile = index;
        mainBoard.appendChild(gameTile).className = 'game-square';
    });
    
})();

addEventListener('click', (e) =>  [
    console.log(e.target.dataset.tile)

])

var game = (() => {
    
    const currentPlayer = document.getElementById('current-player');

    //generate players
    let player1 = newPlayer('Player One', 'X');
    let player2 = newPlayer('Player Two', 'O');

    currentPlayer.innerHTML = 'Player One it is you turn!';

})();

