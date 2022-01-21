// global variables
var questionsElement = document.getElementById("questions");
var timerElement = document.getElementById("time");
var choicesElement = document.getElementById("choices");
var submitButton = document.getElementById("submit");
var startButton = document.getElementById("start");
var initialsElement = document.getElementById("initials");
var responseElement = document.getElementById("response");
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timer;

// a function needed to call the app start and set a time interval for the timer
function start() {
  var startElement = document.getElementById("start-screen");
  startElement.setAttribute("class", "hide");
  questionsElement.removeAttribute("class");
  timer = setInterval(clockTimer, 1000);

  // need to call the function for the questions
  getQuestions();
}

// here should be the function for getting the questions
function getQuestions() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleElement = document.getElementById("question-title");
  titleElement.textContent = currentQuestion.title;
  choicesElement.innerHTML = "";

  // need a function to give each question the proper selection and display criteria
  currentQuestion.choices.forEach(function(selection, i) {
    var choiceQ = document.createElement("button");
    choiceQ.setAttribute("class", "selection");
    choiceQ.setAttribute("value", selection);
    choiceQ.textContent = i + 1 + ". " + selection;
    choiceQ.onclick = questionClick;
    choicesElement.appendChild(choiceQ);
  });
}

// question functionality function
function questionClick() {
  // need to set a timer for incorrect answers to reduce the time by 10 seconds and give prompts for the answer they chose
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 20;
    if (time < 0) {
      time = 0;
    }
    timerElement.textContent = time;
    responseElement.textContent = "Incorrect!";
  } else {
    responseElement.textContent = "Correct!";
  }

  responseElement.setAttribute("class", "response");
  setTimeout(function() {
    responseElement.setAttribute("class", "response hide");
  }, 1000);
  currentQuestionIndex++;

  // set the end of the quiz here
  if (currentQuestionIndex === questions.length) {
    end();
  } else {
    getQuestions();
  }
}

// needed a function for the final results being displayed along with the score
function end() {
  clearInterval(timer);
  var endScreenElement = document.getElementById("end-screen");
  endScreenElement.removeAttribute("class");
  var finalScoreElement = document.getElementById("your-score");
  finalScoreElement.textContent = time;
  questionsElement.setAttribute("class", "hide");
}

// a function to set my timer and call the function if the time runs out to end the quiz
function clockTimer() {
  time--;
  timerElement.textContent = time;
  if (time <= 0) {
    end();
  }
}

// A needed function to save your scores to local storage
function saveHighscore() {
  var initials = initialsElement.value.trim();
  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var scores = {
      score: time,
      initials: initials
    };

    highscores.push(scores);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    // line not needed if scores are to be stored and displayed on the same page which would be logical if you hide them like the other areas on the page.
    // Need to confirm with others to see if this is good practice for multiple pages or to have one simple page
    window.location.href = "./Assets/highscorespage.html";
  }
}

submitButton.onclick = saveHighscore;
startButton.onclick = start;