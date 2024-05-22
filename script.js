const boardElement = document.querySelector(".board");

const gameBoard = function() {
    let tiles = [Array.from({length: 3}), Array.from({length: 3}), Array.from({length: 3})];
    let xMove = true;
    let gameFinished = false;

    const renderTiles = () => {
        boardElement.replaceChildren();

        for(let y = 0; y <= 2; y++) {
            for(let x = 0; x <= 2; x++) {
                const tile = document.createElement("div");
                tile.className = "tile";
                tile.addEventListener("mouseover", () => tile.style.opacity = 0.5);
                tile.addEventListener("mouseleave", () => tile.style.opacity = 0.3);
                tile.addEventListener("click", () => {
                    if(!tiles[y][x] && !gameFinished) {
                        tile.textContent = xMove ? "X" : "O";
                        updateTile(y, x);
                    }
                });
                
                boardElement.appendChild(tile);
            }
        }
    }
    
    const updateTile = (yPos, xPos) => {
        tiles[yPos][xPos] = xMove ? "X" : "O"
        checkBoard();
        xMove = xMove ? false : true;
    }

    const checkBoard = () => {
        if( !!tiles[0][0] && tiles[0][0] === tiles[0][1] && tiles[0][1] === tiles[0][2] ||
            !!tiles[1][0] && tiles[1][0] === tiles[1][1] && tiles[1][1] === tiles[1][2] ||
            !!tiles[2][0] && tiles[2][0] === tiles[2][1] && tiles[2][1] === tiles[2][2] ||
            !!tiles[0][0] && tiles[0][0] === tiles[1][0] && tiles[1][0] === tiles[2][0] ||
            !!tiles[0][1] && tiles[0][1] === tiles[1][1] && tiles[1][1] === tiles[2][1] ||
            !!tiles[0][2] && tiles[0][2] === tiles[1][2] && tiles[1][2] === tiles[2][2] ||
            !!tiles[0][0] && tiles[0][0] === tiles[1][1] && tiles[1][1] === tiles[2][2] ||
            !!tiles[2][0] && tiles[2][0] === tiles[1][1] && tiles[1][1] === tiles[0][2]  ) 
        {
            const resultElement = document.createElement("p");
            resultElement.textContent = `${xMove ? "X" : "O"} wins!`;
            document.body.insertBefore(resultElement, document.body.firstChild);

            gameFinished = true;
            renderResetButton();
        }
        else if(!!tiles[0][0] && !!tiles[0][1] && !!tiles[0][2] && !!tiles[1][0] && !!tiles[1][1] && !!tiles[1][2] && !!tiles[2][0] && !!tiles[2][1] && !!tiles[2][2]) {
            
            const resultElement = document.createElement("p");
            resultElement.textContent = `Draw`;
            document.body.insertBefore(resultElement, document.body.firstChild);

            gameFinished = true;
            renderResetButton();
        }
    }

    const renderResetButton = () => {
        const resetButton = document.createElement("button");
        resetButton.textContent = "Reset";
        
        resetButton.addEventListener("click", (e) => {
            resetBoard();
            document.body.removeChild(e.target);
        });
        
        document.body.appendChild(resetButton);
    }

    const resetBoard = () => {
        tiles = [Array.from({length: 3}), Array.from({length: 3}), Array.from({length: 3})];
        document.body.removeChild(document.body.firstChild);
        gameFinished = false;
        renderTiles();
    }

    return { renderTiles };
}();

gameBoard.renderTiles();

