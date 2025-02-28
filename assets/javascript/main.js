const gridPfour = [
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
]
const gameContainer = document.querySelector('#gameContainer')


function createMap(map){
    map.forEach((row) =>{
        const rowContainer = document.createElement('div')
        rowContainer.classList.add('row')
        gameContainer.appendChild(rowContainer)
        
        row.forEach((cell)=>{
            const cellContainer = document.createElement('div')
            cellContainer.classList.add("cell")
            rowContainer.appendChild(cellContainer)
        })
    })
}


createMap(gridPfour)





////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
/*
const gameMode = document.querySelector('#gameMode')
const gameContainer = document.querySelector('#gameContainer')
const modeBtn = document.querySelector('#modeBtn')
const pvpBtn = document.querySelector('#pvp')
const cpuBtn = document.querySelector('#cpu')

const grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]
let currentPlayer = 'X'
let gameOver = false
let count = 0
let isCpu = false

pvpBtn.addEventListener('click', () => {
    isCpu = false
    document.querySelector('#playerTurn').textContent = `C'est au tour du joueur ${currentPlayer}`
    reset()
})

cpuBtn.addEventListener('click', () => {
    isCpu = true
    document.querySelector('#playerTurn').textContent = `C'est au tour du joueur ${currentPlayer}`
    reset()
})

function displayGrid() {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            const cellContainer = document.createElement('div')
            cellContainer.classList.add('cell')
            cellContainer.addEventListener('click', () => playerMove(rowIndex, cellIndex))
            gameContainer.appendChild(cellContainer)
        })
    })
}
displayGrid()

function playerMove(rowIndex, cellIndex) {
    if (gameOver) {
        document.querySelector('#message').textContent = 'Le jeu est terminé !'
    } else if (grid[rowIndex][cellIndex] !== '') {
        document.querySelector('#message').textContent = 'Cette cellule est deja occupée'
    }
    else {
        grid[rowIndex][cellIndex] = currentPlayer
        count++
        updateGrid()
        if (checkWinner()) {
            message.textContent = `Le joueur ${currentPlayer} a gagné !`
            gameOver = true
        } else if (isDraw()) {
            message.textContent = `Match nul !`
            gameOver = true
        } else { // chgmt de joueur, décla ternaire pour eviter les if else
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
            document.querySelector('#playerTurn').textContent = `C'est au tour du joueur ${currentPlayer}`
            if (isCpu && currentPlayer === 'O') {
                setTimeout(() => cpuMove(), 800)
            }
        }
    }
}

// fonction qui parcourt ttes les cellules du jeu et MAJ leur contenu
function updateGrid() {
    const cells = document.querySelectorAll('.cell')
    cells.forEach((cell, index) => {
        const rowIndex = Math.floor(index / 3)  // calc index de la ligne
        const cellIndex = index % 3  // calc index de la cellule 
        cell.textContent = grid[rowIndex][cellIndex]
    })
}

function checkWinner() {
    //verif des lignes
    for (let i = 0; i < 3; i++) {
        if (grid[i][0] && grid[i][0] === grid[i][1] && grid[i][1] == grid[i][2]) {
            return true
        }
    }
    //verif des colonnes
    for (let i = 0; i < 3; i++) {
        if (grid[0][i] && grid[0][i] === grid[1][i] && grid[1][i] == grid[2][i]) {
            return true
        }
    }
    //verif des diago
    for (let i = 0; i < 3; i+=2) {
        if (grid[0][0+i] && grid[0][0+i] === grid[1][1] && grid[1][1] === grid[2][2-i]) {
            return true
        }
    }
    return false
}
// verifier si egalité ou pas (si les cellules sont vides ou pas)
function isDraw() {

    return count === 9
    // for (let i = 0; i < 3; i++) {
    //     for (let j = 0; j< 3; j++) {
    //         if (grid[i][j] === '') {
    //             return false
    //         }
    //     }
    // }
    // return true
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cpuMove() {
    if (gameOver) {
        document.querySelector('#message').textContent = 'Le jeu est terminé !'
    }
    let rowIndex
    let cellIndex
    // tant qu'une cellule n'est pas vide 
    while (true) {
        rowIndex = random(0, 2)
        cellIndex = random(0, 2)
        if (grid[rowIndex][cellIndex] === '') {
            break
        }
    }
    // mouvement du cpu quasi identique a la fonction playerMove
    grid[rowIndex][cellIndex] = currentPlayer
    count++
    updateGrid()
    if (checkWinner()) {
        message.textContent = `Le joueur ${currentPlayer} a gagné !`
        gameOver = true
    } else if (isDraw()) {
        message.textContent = `Match nul !`
        gameOver = true
    } else { // chgmt de joueur, décla ternaire pour eviter les if else
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        document.querySelector('#playerTurn').textContent = `C'est au tour de ${currentPlayer}`

    }
}

function reset() {
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            grid[rowIndex][cellIndex] = ""  // On vide la grille
            currentPlayer = 'X'
            gameOver = false
            count = 0
            updateGrid()
            document.querySelector("#message").textContent = ""
            document.querySelector("#playerTurn").textContent = `C'est au tour du joueur ${currentPlayer}`
        })
    })
}
*/
