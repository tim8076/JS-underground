
const pages = document.querySelectorAll('[data-page]')
function showPage(page) {
  pages.forEach((item) => {
    if (!item.classList.contains('d-none')) {
      item.classList.add('d-none');
    }
    if (item.classList.contains(page)) {
      item.classList.remove('d-none');
    }
  });
}

// 進行遊戲
const scorePanel = document.querySelector('[data-score-panel]');
const timePanel = document.querySelector('[data-time-panel]');
const firstNumber = document.querySelector('[data-nmuber-first]');
const secondaryNumber = document.querySelector('[data-nmuber-secondary]');
const operation = document.querySelector('[data-operation]');
const resultInput = document.querySelector('[data-result-input]');
let time = 60000; // 60秒
let score = 0;  // 初始分數
const symbols = ['+', '-', '*', '/'];
let correctAnswer = '';

// 顯示倒數時間
function showTime(milliseconds) {
  const minutes = Math.floor(milliseconds / 1000 / 60);
  const seconds = (milliseconds / 1000) % 60;
  timePanel.innerText = `0${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}
// 顯示目前分數
function showScore(score) {
  let str = '';
  if (score >= 100) str = `${score}`;
  if (score < 100 && score >= 10) str = `0${score}`;
  if (score < 10) str = `00${score}`;
  scorePanel.innerHTML = str;
}

function setScore(isCorrect) {
  if (time <= 60000 && time > 20000) {
    isCorrect ? score += 1 : score - 1;
  } else if (time <= 20000) {
    isCorrect ? score += 5 : score - 1;
  }
}

// 產生新題目
function creatQuestion() {
  const index = Math.floor(Math.random() * symbols.length);
  const sign = symbols[index];
  getAnswerBySign(sign);
  resultInput.value = '';
}

function displayOperation({ firstNum, lastNum, symbol }) {
  firstNumber.innerText = firstNum;
  secondaryNumber.innerText = lastNum;
  operation.innerText = symbol;
}

// 產生指定範圍隨機數字
function randomNumBoth(Min, Max) {
  const Range = Max - Min;
  const Rand = Math.random();
  const num = Min + Math.round(Rand * Range);  //四舍五入
  return num;
}

function getAnswerBySign(sign) {
  let min = 0;
  let max = 0;
  let firstNum = 0;
  let lastNum = 0;
  if (time <= 60000 && time > 40000) {
    min = 1;
    max = 9;
  } else if (time <= 40000 && time > 20000 ) {
    min = 10;
    max = 99;
  } else if (time <= 20000 && time > 0) {
    min = 100;
    max = 999;
  }
  switch (sign) {
    case '+':
      firstNum = randomNumBoth(min, max);
      lastNum = randomNumBoth(min, max);
      correctAnswer = firstNum + lastNum;
      displayOperation({ firstNum, lastNum, symbol: '+' });
      break;
    case '-':
      let subtraction = [];
      for (let i = 0; subtraction.length < 2; i++) {
        firstNum = randomNumBoth(min, max);
        lastNum = randomNumBoth(min, max);
        if (firstNum > lastNum ) {
          subtraction[0] = firstNum;
          subtraction[1] = lastNum;
        }
      }
      correctAnswer = subtraction[0] - subtraction[1];
      displayOperation({ firstNum, lastNum, symbol: '-' });
      break;
    case '*':
      firstNum = randomNumBoth(min, max);
      lastNum = randomNumBoth(min, max);
      displayOperation({ firstNum, lastNum, symbol: 'x' });
      correctAnswer = firstNum * lastNum;
      break;
    case '/':
      let division = [];
      for (let i = 0; division.length < 2; i++) {
        firstNum = randomNumBoth(min, max);
        lastNum = randomNumBoth(min, max);
        if (firstNum % lastNum === 0 && firstNum > lastNum) {
          division[0] = firstNum;
          division[1] = lastNum;
        }
      }
      correctAnswer = division[0] / division[1];
      displayOperation({ firstNum, lastNum, symbol: '÷' });
      break;
  }
}

// 結果頁面
const finalScore = document.querySelector('[data-final-score]')
const restartButton = document.querySelector('[data-restart-button]');

restartButton.addEventListener('click', function(e) {
  e.preventDefault();
  showPage('start-page');
})

function countDownTimer() {
  let timer;
  timer = setInterval(function() {
    time = time - 1000;
    showTime(time);
    if (time <= 0) {
      // 清除計時器並將時間調回 60秒
      clearInterval(timer);
      time = 60000;
      finalScore.innerText = score;
      showPage('result-page');
    }
  },1000)
}

resultInput.addEventListener('keyup', function(e) {
  e.preventDefault();
  if (e.keyCode === 13 ) {
    let value = parseInt(e.target.value);
    if (!value) return;
    if (value === correctAnswer) {
      setScore(true);
    } else {
      setScore(false);
    }
    showScore(score);
    creatQuestion();
  }
})

// 開始遊戲按鈕
const startButton = document.querySelector('.start-button');

startButton.addEventListener('click', function (e) {
  e.preventDefault();
  showPage('game-page');
  showTime(60000);
  score = 0;
  showScore(score);
  countDownTimer();
  creatQuestion();
})

// 初始化
function init() {
  showPage('start-page');
}
init();

