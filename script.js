const displayController = (() => {

    const messageBox = document.querySelector('#message');
    
    const renderMessage = (message) => {
        messageBox.innerHTML = message;
    }

    return {renderMessage};
})();

const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    
    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.addEventListener("click", Game.handleClick)
        });
    };

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    }

    const getGameboard = () => gameboard;



        return {render, update, getGameboard};
})(); 


const createPlayer = (name, marker) => {
    return {name, marker};
};


const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () => {
        players = [
            createPlayer(document.querySelector('#player1').value, 'X'),
            createPlayer(document.querySelector('#player2').value, 'O')
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
    }

    const restart = () => {
        gameOver = false;
        for (let i = 0; i < 9; i++) {
            Gameboard.update(i, "");
        }
        Gameboard.render();
        displayController.renderMessage("");
    };

    const checkForWin = (board) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] && board[a] === board[b] && board[b] === board[c]){
                return true;
            }
        }
        return false;
    }

    const checkForTie = (board) => {
        return board.every(cell => cell !== '');
    }

    const handleClick = (event) => {
        //if game over disallow click events
        if (gameOver){
            return;
        }

        //logic to check if square is marked already
        let index = parseInt(event.target.id.split("-")[1]);
        if (Gameboard.getGameboard()[index] !== "")
            return;

        Gameboard.update(index, players[currentPlayerIndex].marker);

        //check for 3 in a row
        if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].marker)) {
            gameOver = true;
            displayController.renderMessage(`${players[currentPlayerIndex].name} won!`);
        }
        else if (checkForTie(Gameboard.getGameboard())){
            gameOver = true;
            displayController.renderMessage(`Tie Game!`);
        }
        //change players' turn
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }

    return {start, restart, handleClick}; 
})();


const startButton = document.querySelector('#start-button');
startButton.addEventListener("click", () => {
    Game.start();
});

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
    Game.restart();
});


