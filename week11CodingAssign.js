/*Javascript file for Week 11 Coding Assignment - create a Tic Tac Toe game
   Use an HTML element of choice; click on grid cell - x or o will appear; heading for x's or o's turn; button to
    clear the grid; bootstrap alert announcing winner or a draw if board is full and no one wins */ 

/*function to add eventlistener on window object; listen for the DOM content loaded event:*/
     document.addEventListener('DOMContentLoaded', () => {  /*ensures browser processes the HTML*/
    
/*references to all needed html elements using the DOM APIs (query selector, query selector all)
  array.from - enables use of array tools by converting to a proper array*/ 
    const squares = Array.from(document.querySelectorAll('.square')); 
    const playerUpdate = document.querySelector('.show-player');
    const resetButton = document.querySelector('#reset');
    const gameResult = document.querySelector('.gameResult'); 

/*create variables needed for the game*/
    let gameBox = ['', '', '', '', '', '', '', '', '']; /* array of nine empty strings for the nine squares in game box*/
    let currentPlayer = 'X'; /*can store X or O in the current player variable*/
    let playGame = true; /*boolean to check whether game is continuing or not*/

    const xWins = 'Player X Wins'; /*these string variables are used to declare results at game's end*/ 
    const oWins = 'Player O Wins';
    const tie = 'Tie';    

/*array for game box layout of winning rows*/      
    const winningRows = [       
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
        ];

/*function to check for a winner by looping thru winning rows array and sub-arrays that each contain three numbers;
  check to see if array has same characters for those indexes*/
    function handleResultValidation() { 
        let roundWon = false;
            for (let i = 0; i <= 7; i++) {
                const winningRow = winningRows[i];
                const a = gameBox[winningRow[0]]; 
                const b = gameBox[winningRow[1]]; 
                const c = gameBox[winningRow[2]];
                if (a === '' || b === '' || c === '') { /*checking for empty squares to continue game or not*/
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

/*function for declaring results of game to the players*/
    const declareWinner = (type) => {  
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

/*function to make sure players will only play empty tiles */        
    const isValidAction = (square) => { 
        if (square.innerText === 'X' || square.innerText === 'O'){
            return false;
        }
            return true;
    };

/*function to update the game box*/    
    const updategameBox = (index) => { 
        gameBox[index] = currentPlayer;
    }

/*function to remove class list of current player, change current player to be x or o*/
    const changePlayer = () => {  
        playerUpdate.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerUpdate.innerText = currentPlayer; /*display current player */
        playerUpdate.classList.add(`player${currentPlayer}`);
    }

/*function to check if a playre's action is valid and if game is active*/
    const userAction = (square, index) => { 
        if(isValidAction(square) && playGame) { 
            square.innerText = currentPlayer;
            square.classList.add(`player${currentPlayer}`);
            updategameBox(index);
            handleResultValidation();
            changePlayer();
        }
    }

/*function for re-setting the game box*/
    const resetgameBox = () => { 
        gameBox = ['', '', '', '', '', '', '', '', '',];
        playGame = true;
        gameResult.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }
        
/*function to update the UI */        
        squares.forEach(square => {
        square.innerText = '';
        square.classList.remove('playerX');
        square.classList.remove('playerO');
        });
    }

/* function for attaching an event listener to each of the squares*/     
    squares.forEach( (square, index) => {  
    square.addEventListener('click', () => userAction(square, index));/*click on tile; calling a user sction function*/
    });                                                                 /*reference to a specific tile and index of it*/

    resetButton.addEventListener('click',  resetgameBox);
});
