// global variables
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var responseEl = document.getElementById("response");
var currentQuestionIndex = 0;
var time = questions.length * 20;
var timer;

// a function needed to call the app start and set a time interval for the timer
function start() {
  var startEl = document.getElementById("start-screen");
  startEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  timer = setInterval(clockTick, 1000);

  // need to call the function for the questions
  getQuestions();
}

function getQuestions() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";

  // need a function to give each question the proper selection and display criteria
  currentQuestion.choices.forEach(function(selection, i) {
    var choiceQ = document.createElement("button");
    choiceQ.setAttribute("class", "selection");
    choiceQ.setAttribute("value", selection);
    choiceQ.textContent = i + 1 + ". " + selection;
    choiceQ.onclick = questionClick;
    choicesEl.appendChild(choiceQ);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 20;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    responseEl.textContent = "Incorrect!";
  } else {
    responseEl.textContent = "Correct!";
  }
  responseEl.setAttribute("class", "response");
  setTimeout(function() {
    responseEl.setAttribute("class", "response hide");
  }, 1000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestions();
  }
}

// needed a function for the final results being displayed along with the score
function quizEnd() {
  clearInterval(timer);
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  var finalScoreEl = document.getElementById("your-score");
  finalScoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

// a function to set my timer and call the function if the time runs out to end the quiz
function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  var initials = initialsEl.value.trim();
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscorespage.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

submitBtn.onclick = saveHighscore;
startBtn.onclick = start;
initialsEl.onkeyup = checkForEnter;