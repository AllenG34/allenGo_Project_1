let playerText =document.getElementById('playerText')
let resetBtn = document.getElementById('resetBtn')
let squares = Array.from(document.getElementsByClassName('square'))

let winnerIndicatior = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const player_O = 'O'
const player_X = 'X'
const resultElement = document.getElementById('results')
let currentPlayer = player_X
let spaces = Array(9).fill(null)

const startGame= () => {
    squares.forEach(square => square.addEventListener('click', squareClicked))
}

function squareClicked(e) {
    if (playerHasWon()) {
        return
    }
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerText = `${currentPlayer} WINS!!`
            let winning_blocks = playerHasWon()

            winning_blocks.map(square => squares[square].style.backgroundColor=winnerIndicatior)

            /*alert(playerText)*/
            document.querySelector('#results').textContent=playerText
            return
        }

        currentPlayer = currentPlayer == player_X ? player_O : player_X
    }
}

function playerHasWon(){
    
    for (const condition of howToWin) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a,b,c]
        }
    }
    return false
}

const howToWin = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [2,5,8],
    [1,4,7]
]

resetBtn.addEventListener('click', reset)

function reset(){
    spaces.fill(null)

    squares.forEach( square => {
        square.innerText = ''
        square.style.backgroundColor=''
    })

    resultElement.innerText=''

    currentPlayer = player_X
}
startGame()