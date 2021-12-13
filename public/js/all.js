"use strict";

var pages = document.querySelectorAll('[data-page]');

function showPage(page) {
  pages.forEach(function (item) {
    if (!item.classList.contains('d-none')) {
      item.classList.add('d-none');
    }

    if (item.classList.contains(page)) {
      item.classList.remove('d-none');
    }
  });
} // 進行遊戲


var scorePanel = document.querySelector('[data-score-panel]');
var timePanel = document.querySelector('[data-time-panel]');
var firstNumber = document.querySelector('[data-nmuber-first]');
var secondaryNumber = document.querySelector('[data-nmuber-secondary]');
var operation = document.querySelector('[data-operation]');
var resultInput = document.querySelector('[data-result-input]');
var time = 60000; // 60秒

var score = 0; // 初始分數

var symbols = ['+', '-', '*', '/'];
var correctAnswer = ''; // 顯示倒數時間

function showTime(milliseconds) {
  var minutes = Math.floor(milliseconds / 1000 / 60);
  var seconds = milliseconds / 1000 % 60;
  timePanel.innerText = "0".concat(minutes, " : ").concat(seconds < 10 ? "0".concat(seconds) : seconds);
} // 顯示目前分數


function showScore(score) {
  var str = '';
  if (score >= 100) str = "".concat(score);
  if (score < 100 && score >= 10) str = "0".concat(score);
  if (score < 10) str = "00".concat(score);
  scorePanel.innerHTML = str;
}

function setScore(isCorrect) {
  if (time <= 60000 && time > 20000) {
    isCorrect ? score += 1 : score > 0 ? score -= 1 : score;
  } else if (time <= 20000) {
    isCorrect ? score += 5 : score > 0 ? score -= 1 : score;
  }
} // 產生新題目


function creatQuestion() {
  var index = Math.floor(Math.random() * symbols.length);
  var sign = symbols[index];
  getAnswerBySign(sign);
  resultInput.value = '';
}

function displayOperation(_ref) {
  var firstNum = _ref.firstNum,
      lastNum = _ref.lastNum,
      symbol = _ref.symbol;
  firstNumber.innerText = firstNum;
  secondaryNumber.innerText = lastNum;
  operation.innerText = symbol;
} // 產生指定範圍隨機數字


function randomNumBoth(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入

  return num;
}

function getAnswerBySign(sign) {
  var min = 0;
  var max = 0;
  var firstNum = 0;
  var lastNum = 0;

  if (time <= 60000 && time > 40000) {
    min = 1;
    max = 9;
  } else if (time <= 40000 && time > 20000) {
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
      displayOperation({
        firstNum: firstNum,
        lastNum: lastNum,
        symbol: '+'
      });
      break;

    case '-':
      var subtraction = [];

      for (var i = 0; subtraction.length < 2; i++) {
        firstNum = randomNumBoth(min, max);
        lastNum = randomNumBoth(min, max);

        if (firstNum > lastNum) {
          subtraction[0] = firstNum;
          subtraction[1] = lastNum;
        }
      }

      correctAnswer = subtraction[0] - subtraction[1];
      displayOperation({
        firstNum: firstNum,
        lastNum: lastNum,
        symbol: '-'
      });
      break;

    case '*':
      firstNum = randomNumBoth(min, max);
      lastNum = randomNumBoth(min, max);
      displayOperation({
        firstNum: firstNum,
        lastNum: lastNum,
        symbol: 'x'
      });
      correctAnswer = firstNum * lastNum;
      break;

    case '/':
      var division = [];

      for (var _i = 0; division.length < 2; _i++) {
        firstNum = randomNumBoth(min, max);
        lastNum = randomNumBoth(min, max);

        if (firstNum % lastNum === 0 && firstNum > lastNum) {
          division[0] = firstNum;
          division[1] = lastNum;
        }
      }

      correctAnswer = division[0] / division[1];
      displayOperation({
        firstNum: firstNum,
        lastNum: lastNum,
        symbol: '÷'
      });
      break;
  }
} // 結果頁面


var finalScore = document.querySelector('[data-final-score]');
var restartButton = document.querySelector('[data-restart-button]');
restartButton.addEventListener('click', function (e) {
  e.preventDefault();
  showPage('start-page');
});

function countDownTimer() {
  var timer;
  timer = setInterval(function () {
    time = time - 1000;
    showTime(time);

    if (time <= 0) {
      // 清除計時器並將時間調回 60秒
      clearInterval(timer);
      time = 60000;
      finalScore.innerText = score;
      showPage('result-page');
    }
  }, 1000);
}

resultInput.addEventListener('keyup', function (e) {
  e.preventDefault();

  if (e.keyCode === 13) {
    var value = parseInt(e.target.value);
    if (!value) return;

    if (value === correctAnswer) {
      setScore(true);
    } else {
      setScore(false);
    }

    showScore(score);
    creatQuestion();
  }
}); // 開始遊戲按鈕

var startButton = document.querySelector('.start-button');
startButton.addEventListener('click', function (e) {
  e.preventDefault();
  showPage('game-page');
  showTime(60000);
  score = 0;
  showScore(score);
  countDownTimer();
  creatQuestion();
}); // 初始化

function init() {
  showPage('start-page');
}

init();
//# sourceMappingURL=all.js.map
