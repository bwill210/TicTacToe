const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    
    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
    };

    return {render,};
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
    return {start, }; 
})();



const startButton = document.querySelector('#start-button');
startButton.addEventListener("click", () => {
    Game.start();
})

/*
console.log(gameBoard.boardIsFull());



const player1 = createPlayer('Marc', 'X');
const player2 = createPlayer('Alice', 'O');

function playGame(player1, player2, gameBoard) {
    i = 1;
    while (gameBoard.boardIsFull) {
        if (i%2 === 1) { //player 1's turn
            gameBoard.showBoard();
            console.log(player1.name + '\'s turn');
            i = prompt('Please enter the row number');
            j = prompt('Please enter the column number');
            player1.makeMove(i, j);
            i++;
        }
        else { //player 2's turn
            gameBoard.showBoard();
            console.log(player2.name + '\'s turn');
            i = prompt('Please enter the row number');
            j = prompt('Please enter the column number');
            player2.makeMove(i, j);
            i++;
        }
    }
    return gameBoard.showBoard();
}

playGame(player1, player2);


/*


*/