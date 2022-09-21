//newPlayer factory Function 
const newPlayer = (name, marker, turn) => {
    return {name, marker, turn}
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
    return{
        board
    }
})();



var game = (() => {
    
    const playerDisplay = document.getElementById('current-player');

    //generate players
    let player1 = newPlayer('Player One', 'X', true);
    let player2 = newPlayer('Player Two', 'O', false);

    playerDisplay.innerHTML = 'Player One it is you turn!';

    const winningCombo  = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    function checkGameBoard() {
    
        let winner = false;

        winningCombo.forEach((item, index) => {

            if (gameBoard.board[item[0]] === 'X' && gameBoard.board[item[1]] === 'X' && gameBoard.board[item[2]] === 'X') {
             playerDisplay.innerHTML = 'Player One Wins!!!'
             playerDisplay.insertAdjacentText('afterend', 'Refresh to Play Again!')

             winner = true;
             console.log('Hello')
        }

        else if (gameBoard.board[item[0]] === 'O' && gameBoard.board[item[1]] === 'O' && gameBoard.board[item[2]] === 'O')  {
            playerDisplay.innerHTML = 'Player Two Wins!!!'
            winner = true;
            console.log('Hello 2')
        }
       
         })
         return winner; 
    }
   
    
    addEventListener('click', (e) =>  {
        let targetTile = e.target; 
        
        if (e.target.className === 'game-square' && player1.turn === true && e.target.innerHTML != 'X' && e.target.innerHTML != 'O'){
             // update div in html with player marker
            e.target.innerHTML = 'X';
           
            //update board array so winning combo can be checked.
            gameBoard.board[e.target.dataset.tile] = 'X';
           
            //display next players turn
            playerDisplay.innerHTML = 'Player Two it is you turn!';

            player1.turn = false;
            player2.turn = true;
        }
        else if (e.target.className === 'game-square' && player2.turn === true && e.target.innerHTML != 'X' && e.target.innerHTML != 'O'){
            // update div in html with player marker
            e.target.innerHTML = 'O';
            
            //update board array so winning combo can be checked.
            gameBoard.board[e.target.dataset.tile] = 'O';

            //display next players turn
            playerDisplay.innerHTML = 'Player One it is you turn!';
        
            player1.turn = true;
            player2.turn = false;
        }
        checkGameBoard()
    })
})();

