/* Page Objects */
const bestscoreDiv = document.querySelector("#bestscore");
const contentEl = document.querySelector("#content");
const quizTimerEl = document.querySelector("#quizTimer");
const timerInfoEl = document.querySelector("#timer");

/* Global Variables */
var quizSecEl = 0;
var quizDurationEl = 0;
var quizIntervalEl;

var test = false;
var quiz = {};
var quizInfo = "";
var score = 0;

data();

/* Instructions on how quiz operates */
function data() {
    clearContent();
    reset();

    let instructions = document.createElement("p");
    instructions.setAttribute("id", instructions);
    instructions.textContent= "Awnser the question quickly for the best score and a chance on the Leader Board."

    let beginQuiz = document.createElement("button");
    beginQuiz.setAttribute("id", "beginQuiz");
    beginQuiz.setAttribute("class", "btn btn-secondary");
    beginQuiz.textContent = "Begin Quiz!";

    contentEl.appendChild(instructions);
    contentEl.appendChild(beginQuiz);

    beginQuiz.addEventListener("click", function () {
        quizInfo = "Java Script";
        startQuiz(jsQuestions);
    });
}

function clearContent() {
    contentEl.innerHTML= "";
}

function reset() {
    quizInfo = "";
    score = 0;

    quizSecEl = 0;
    quizDurationEl = 0;
    quizIntervalEl = 0;
}

/* Begin Quiz */
function startQuiz(quizSet) {
    if (test) {console.log("--- startQuiz ---"); }
    quiz = randomQuestions(quizSet);
    timerInfoEl.setAttribute("style", "visibility: visible;");
    
    quizDurationEl = quiz.length * 20;
    if (test) {console.log("duration g,q", quizDurationEl); }
    beginQuizTimer();
    startTime();

    startQuestion();
}


