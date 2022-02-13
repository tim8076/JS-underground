// 遊戲開始畫面
const gameIndexView = document.querySelector('[data-game-start]');
const startGameButton = document.querySelector('[data-game-start-button]');
const gamingView = document.querySelector('[data-gaming]');

const startGame = () => {
  gameIndexView.classList.add('d-none');
  document.body.classList.add('bg-primary');
  gamingView.classList.remove('d-none');
}
startGameButton.addEventListener('click', startGame);

// 讀取指定cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// 遊戲進行中
const xScoreBoard = document.querySelector('[data-x-score]');
const oScoreBoard = document.querySelector('[data-o-score]');
let xScore = Number(getCookie('xScore')) || 0;
let oScore = Number(getCookie('oScore')) || 0;
console.log(xScore, oScore)
const gameBoard = document.querySelector('.game-grid-container.gaming');
const grids = document.querySelectorAll('.game-grid-container.gaming .col');
const resultViews = document.querySelectorAll('[data-result-win]');
let currentTurn = 'o';
const winMatch = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
const oMatch = [];
const xMatch = [];
let winner;
let turnCount = 1;

const switchTurn = () => {
  turnCount += 1;
  if (currentTurn === 'o') {
    gamingView.classList.remove('o-turn');
    gamingView.classList.add('x-turn');
    currentTurn = 'x';
  } else {
    gamingView.classList.remove('x-turn');
    gamingView.classList.add('o-turn');
    currentTurn = 'o';
  }
}

const checkWinner = (currentMatch) => {
  let win = false;
  winMatch.forEach(match => {
    let isWin = match.every(num => {
      return currentMatch.includes(num);
    });
    if (isWin) win = true;
  })
  return win;
}

const setScore = (scoreBoard, score) => {
  scoreBoard.innerText = score;
}

const showResult = (winner) => {
  resultViews.forEach(view => {
    view.classList.add('d-none');
    if(view.classList.contains(winner)) {
      view.classList.remove('d-none');
    }
  })
}
const playGame = function(e) {
  if (e.currentTarget.childNodes.length) return;
  const targetNum = parseInt(e.target.dataset.num);
  if (currentTurn === 'o') {
    e.currentTarget.innerHTML ='<i class="fa-regular fa-circle"></i>';
    oMatch.push(targetNum);
    if(checkWinner(oMatch)) {
      oScore += 1;
      setScore(oScoreBoard, oScore);
      document.cookie = `oScore=${oScore}`;
      gameBoard.classList.add('d-none');
      showResult('o-win');
      return;
    }
  } 
  if (currentTurn === 'x') {
    e.currentTarget.innerHTML = '<i class="fa-solid fa-x"></i>';
    xMatch.push(targetNum);
    if (checkWinner(xMatch)) {
      xScore += 1;
      setScore(xScoreBoard, xScore);
      document.cookie = `xScore=${xScore}`;
      gameBoard.classList.add('d-none');
      showResult('x-win');
      return;
    }
  }

  // 平手時
  if (turnCount >= 9) {
    gameBoard.classList.add('d-none');
    showResult('draw');
  } else {
    switchTurn();
  }
}

grids.forEach(grid => {
  grid.addEventListener('click', playGame);
});

// 再玩一次
const restartGameButton = document.querySelector('[data-restart-game-button]');
const restartGame = () => {
  resultViews.forEach(view => view.classList.add('d-none'));
  grids.forEach(grid => grid.innerHTML = '');
  turnCount = 1;
  oMatch.length = 0;
  xMatch.length = 0;
  gameBoard.classList.remove('d-none');
}

restartGameButton.addEventListener('click', restartGame);

// 初始化
const init = () => {
  xScoreBoard.innerText = xScore;
  oScoreBoard.innerText = oScore;
}
init();



