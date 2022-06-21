/*Javascript file for Week 11 Coding Assignment - Tic Tac Toe game*/

document.addEventListener('DOMContentLoaded', () => {  /*ensures browser processes the HTML*/
    
    const squares = Array.from(document.querySelectorAll('.square')); /*enables use of array tools*/
    const playerUpdate = document.querySelector('.show-player');
    const resetButton = document.querySelector('#reset');
    const gameResult = document.querySelector('.gameResult');

    let gameBox = ['', '', '', '', '', '', '', '', '']; /* array of nine empty strings for the nine squares in game box*/
    let currentPlayer = 'X'; /*can store X or O in the current player variable*/
    let playGame = true; /*boolean to check whether game is continuing or not*/

    const xWins = 'Player X Wins'; /*these string variables are used in determining results at end of each game*/ 
    const oWins = 'Player O Wins';
    const tie = 'Tie';    

    const winningRows = [   /* game box layout 0 1 2, 3 4 5, 6 7 8 (vertically)*/    
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];

    function handleResultValidation() {
        let roundWon = false;
            for (let i = 0; i <= 7; i++) {
                const winningRow = winningRows[i];
                const a = gameBox[winningRow[0]];
                const b = gameBox[winningRow[1]];
                const c = gameBox[winningRow[2]];
                if (a === '' || b === '' || c === '') { /*checking for empty squares*/
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }
        if (roundWon) { /*if there's a winner then we use the declareWinner function*/
            declareWinner(currentPlayer === 'X' ? xWins : oWins); /*based on current player's value*/
            playGame = false;
            return;
        }    
        if (!gameBox.includes('')) /*if no winner check to see if no squares are empty*/
            declareWinner(tie);
        }

    const declareWinner = (type) => {  /*declaring results of game*/
        switch(type){
            case oWins:
                gameResult.innerHTML = 'Player <span class="playerO">O</span> Wins!!';
                break;
            case xWins:
                gameResult.innerHTML = 'Player <span class="playerO">X</span> Wins!!';
                break;
            case tie:
                gameResult.innerText = "It's a Tie";                              
            }
            gameResult.classList.remove('hide');
        };

    const isValidAction = (square) => { 
        if (square.innerText === 'X' || square.innerText === 'O'){
            return false;
        }
            return true;
    };

    const updategameBox = (index) => { /*function used to make sure players just play the empty tiles*/
        gameBox[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerUpdate.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerUpdate.innerText = currentPlayer;
        playerUpdate.classList.add(`player${currentPlayer}`);
    }

    const userAction = (square, index) => { /*this function gets called when user clicks on a square*/
        if(isValidAction(square) && playGame) { /*checks to see if action is valid and if game is active*/
            square.innerText = currentPlayer;
            square.classList.add(`player${currentPlayer}`);
            updategameBox(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetgameBox = () => { /*function for re-setting the game box*/
        gameBox = ['', '', '', '', '', '', '', '', '',];
        playGame = true;
        gameResult.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }
            
        squares.forEach(square => {
        square.innerText = '';
        square.classList.remove('playerX');
        square.classList.remove('playerO');
        });
    }

    squares.forEach( (square, index) => {  /* this attaches an event listener to the squares*/ 
    square.addEventListener('click', () => userAction(square, index));/*click on tile; calling userAction function*/
    });

    resetButton.addEventListener('click',  resetgameBox);
});
