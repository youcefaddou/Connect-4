const gridPfour = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
]
const gameContainer = document.querySelector('#gameContainer')
const gameMode = document.querySelector('#gameMode')
const modeBtn = document.querySelector('#modeBtn')
const pvpBtn = document.querySelector('#pvp')
const cpuBtn = document.querySelector('#cpu')
const endGameModal = document.querySelector('#endGameModal')
const modalMessage = document.querySelector('#message')
const restartButton = document.querySelector('#restartButton')
const errorMessage = document.querySelector('#errorMessage')
function showEndGameModal(message) {
    modalMessage.innerHTML = message; // utilise innerHTML pour le span
    endGameModal.style.display = 'flex' // Afficher la modal
}

restartButton.addEventListener('click', () => {
    endGameModal.style.display = 'none' // Cacher la modal
    reset()
})

let currentPlayer = 'Rouge'
let gameOver = false
let isCpu = false
let count = 0

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

function createMap(map) {
    map.forEach((row, rowIndex) => {
        const rowContainer = document.createElement('div')
        rowContainer.classList.add('row')
        gameContainer.appendChild(rowContainer)

        row.forEach((cell, cellIndex) => {
            const cellContainer = document.createElement('div')
            cellContainer.classList.add("cell")
            rowContainer.appendChild(cellContainer)
            cellContainer.addEventListener('click', () => {
                if (!gameOver) {
                    playerMove(cellIndex)
                }
            })
        })
    })
}

createMap(gridPfour)

function playerMove(colIndex) {
    if (!gameOver) {
        const rowIndex = emptyRow(colIndex)
        if (rowIndex !== -1) { // si la colonne n'est pas pleine
            count++
            gridPfour[rowIndex][colIndex] = currentPlayer
            updateGrid()

            if (checkWinner()) {
                //message.textContent = `Le joueur ${currentPlayer} a gagné !`
                showEndGameModal(`Le joueur <span class="${currentPlayer === 'Rouge' ? 'red-text' : 'yellow-text'}">${currentPlayer}</span> a gagné !`);
                gameOver = true
            } else if (isDraw()) {
                showEndGameModal('Égalité, personne ne gagne !')
                gameOver = true
            } else {
                currentPlayer = currentPlayer === 'Rouge' ? 'Jaune' : 'Rouge'
                // document.querySelector('#playerTurn').textContent = `C'est au tour du joueur ${currentPlayer}`
                document.querySelector('#playerTurn').innerHTML = `C'est au tour du joueur <span class="${currentPlayer === 'Rouge' ? 'red-text' : 'yellow-text'}">${currentPlayer}</span>`
                if (isCpu && currentPlayer === 'Jaune') {
                    setTimeout(() => cpuMove(), 800)
                }
            }
        } else {
            errorMessage.textContent = 'Cette colonne est pleine !';
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 1800);
        }
    } else {
        document.querySelector('#message').textContent = `Le jeu est terminé !`
    }
}
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function cpuMove() {
    if (gameOver) {
        //document.querySelector('#message').textContent = 'Le jeu est terminé !'
        message.innerHTML = `Le joueur <span class="${currentPlayer === 'Rouge' ? 'red-text' : 'yellow-text'}">${currentPlayer}</span> a gagné !`
    }
    let colIndex
    let rowIndex
    // choisit une colonne random jusqu'a en trouver une pas pleine
    while (true) {
        colIndex = random(0, 6)
        rowIndex = emptyRow(colIndex)   //trouver 1ere cellule vide dans la colonne
        if (rowIndex !== -1) {          //si la col n'est pas pleine
            break
        }
    }
    count++
    gridPfour[rowIndex][colIndex] = currentPlayer
    updateGrid()

    if (checkWinner()) {
        message.textContent = `Le joueur ${currentPlayer} a gagné !`
        gameOver = true
    } else if (isDraw()) {
        message.textContent = `Égalité, personne ne gagne !`
        gameOver = true
    } else {
        currentPlayer = currentPlayer === 'Rouge' ? 'Jaune' : 'Rouge'
        //document.querySelector('#playerTurn').textContent = `C'est au tour du joueur ${currentPlayer}`
        document.querySelector('#playerTurn').innerHTML = `C'est au tour du joueur <span class="${currentPlayer === 'Rouge' ? 'red-text' : 'yellow-text'}">${currentPlayer}</span>`
    }
}
function updateGrid() {
    const cells = document.querySelectorAll('.cell')
    cells.forEach((cell, index) => {
        const rowIndex = Math.floor(index / 7) // calcul index de ligne (6lignes) 
        const cellIndex = index % 7 // calc index cellule (7 colonnes)

        const cellValue = gridPfour[rowIndex][cellIndex] // récup la valeur de la cellule
        cell.textContent = ''
        cell.classList.remove('red', 'yellow')
        //applique la classe en fonction de la valeur de la cell
        if (cellValue === 'Rouge') {
            cell.classList.add('red')
        } else if (cellValue === 'Jaune') {
            cell.classList.add('yellow')
        }
    })
}
//fonction pour trouver une cell vide dans une colonne 
function emptyRow(colIndex) {
    for (let rowIndex = 5; rowIndex >= 0; rowIndex--) { // commence par lebas de la col
        if (gridPfour[rowIndex][colIndex] === '') {
            return rowIndex // index de la 1ere cell vide
        }
    }
    return -1 // si la col est pleine
}

function isDraw() {
    return count === 42
}

function checkWinner() {
    const rows = 6
    const cols = 7

    //check des lignes
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 3; col++) {
            if (gridPfour[row][col]
                && gridPfour[row][col] === gridPfour[row][col + 1]
                && gridPfour[row][col] === gridPfour[row][col + 2]
                && gridPfour[row][col] === gridPfour[row][col + 3]) {

                return gridPfour[row][col]
            }
        }
    }
    //check des colonnes
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 3; row++) {
            if (gridPfour[row][col]
                && gridPfour[row][col] === gridPfour[row + 1][col]
                && gridPfour[row][col] === gridPfour[row + 2][col]
                && gridPfour[row][col] === gridPfour[row + 3][col]) {

                return gridPfour[row][col]
            }
        }
    }
    //check des diago vers le bas
    for (let row = 0; row < rows - 3; row++) {
        for (let col = 0; col < cols - 3; col++) {
            if (gridPfour[row][col]
                && gridPfour[row][col] === gridPfour[row + 1][col + 1]
                && gridPfour[row][col] === gridPfour[row + 2][col + 2]
                && gridPfour[row][col] === gridPfour[row + 3][col + 3]) {

                return gridPfour[row][col]
            }
        }
    }
    //check des diago vers le haut
    for (let row = 3; row < rows; row++) {
        for (let col = 0; col < cols - 3; col++) {
            if (gridPfour[row][col]
                && gridPfour[row][col] === gridPfour[row - 1][col + 1]
                && gridPfour[row][col] === gridPfour[row - 2][col + 2]
                && gridPfour[row][col] === gridPfour[row - 3][col + 3]) {

                return gridPfour[row][col]
            }
        }
    }
    return false

}
function reset() {
    gridPfour.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            gridPfour[rowIndex][cellIndex] = "" //on vide la grille

        })
    })
    currentPlayer = 'Rouge'
    gameOver = false
    count = 0
    updateGrid()
    document.querySelector('#message').textContent = ''
    // document.querySelector('#playerTurn').textContent = `C'est au tour du joueur ${currentPlayer}`
    document.querySelector('#playerTurn').innerHTML = `C'est au tour du joueur <span class="red-text">Rouge</span>`
}
