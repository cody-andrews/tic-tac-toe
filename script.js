const playerDisplay = document.getElementById('current-player');


let winner = false;
let remainingSpots = 8;

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


    for (let i = 0; i < board.length; i++)  {
        let gameTile = document.createElement('div');
        gameTile.dataset.index = i;  
        mainBoard.appendChild(gameTile).className = 'game-square';
    };

    const reset = () => {

        console.log('fdsf')
        const x = document.getElementsByClassName('game-square');
      


        for (let i = 0; i < x.length; i++) {
           x[i].innerHTML = '';
          }
        board.length = 0;
        playerDisplay.innerHTML = 'Player One it is you turn!';
        winner = false;
        remainingSpots = 9;
    }
    return{board, reset}

})();



var game = (() => {

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
       
        let playerOneWins = false;
        let playerTwoWins = false;
        
        winningCombo.forEach((item, index) => {
           
        

         if (gameBoard.board[item[0]] === 'X' && gameBoard.board[item[1]] === 'X' && gameBoard.board[item[2]] === 'X') {
             playerOneWins = true;
             winner = true;
        }

        else if (gameBoard.board[item[0]] === 'O' && gameBoard.board[item[1]] === 'O' && gameBoard.board[item[2]] === 'O')  {
            playerTwoWins = true;
            winner = true;
        }

        else if(remainingSpots < 1)   {
            playerDisplay.innerHTML = 'It is a Draw!!! <br>' + '<br>' + 'Click restart to play again'
        }
           
         })

         if (playerOneWins === true)    {
            playerDisplay.innerHTML = 'Player One Wins!!! <br>' + '<br>' + 'Click restart to play again'
         }

         else if (playerTwoWins === true)    {
            playerDisplay.innerHTML = 'Player Two Wins!!! <br>' + '<br>' + 'Click restart to play again'
         }

        remainingSpots = remainingSpots - 1;
         console.log(remainingSpots)
    }

    const reset = () => {
        player1.turn = true;
        player2.turn = false;
   
        playerOneWins = false;
        playerTwoWins = false;
    }
    
    addEventListener('click', (e) =>  {
        let targetTile = e.target; 

        
        
        if(e.target.className === 'restart-button')    {
            gameBoard.reset();
            reset();
        }
        else if(winner === true)    {
            return
        }

        else if (e.target.className === 'game-square' && player1.turn === true && e.target.innerHTML != 'X' && e.target.innerHTML != 'O'){
             
            //update board array so winning combo can be checked.
            gameBoard.board[e.target.dataset.index] = 'X';
            // update div in html with player marker
            e.target.innerHTML = gameBoard.board[e.target.dataset.index];
           
            //display next players turn
            playerDisplay.innerHTML = 'Player Two it is you turn!';

            player1.turn = false;
            player2.turn = true;
        }
        else if (e.target.className === 'game-square' && player2.turn === true && e.target.innerHTML != 'X' && e.target.innerHTML != 'O'){
           //update board array so winning combo can be checked.
           gameBoard.board[e.target.dataset.index] = 'O';
            
           // update div in html with player marker
           e.target.innerHTML = gameBoard.board[e.target.dataset.index];

            //display next players turn
            playerDisplay.innerHTML = 'Player One it is you turn!';
        
            player1.turn = true;
            player2.turn = false;
        }

            checkGameBoard()
    })
})();

