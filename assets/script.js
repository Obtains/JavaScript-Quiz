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

    let heading = document.createElement("p");
    heading.setAttribute("id", "content-heading");
    heading.textContent = "Best Quiz Ever!!!"

    let instructions = document.createElement("p");
    instructions.setAttribute("id", instructions);
    instructions.textContent= "Awnser the question quickly for the best score and a chance on the Leader Board."

    let beginQuiz = document.createElement("button");
    beginQuiz.setAttribute("id", "beginQuiz");
    beginQuiz.setAttribute("class", "btn btn-secondary");
    beginQuiz.textContent = "Begin Quiz!";

    contentEl.appendChild(heading);
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

function randomQuestions(array) {
    if (test) {console.log("--- randomQuestions ---"); }

    let runQuiz = [];

    for (let i = 0; i < array.length; i++) {
        runQuiz.push(array[i]);
    }
    return runQuiz;
}

function startQuestion() {
    if (test) {console.log("--- startQuestion ---"); }

    quizSecEl = 0;

    if (quiz.length === 0) {
        endOfQuiz();
        return;
    }

    currentQuestion = quiz.pop();
    clearContent();

    /* Displays Question to screen */
    let question = document.createElement("h1");
    question.setAttribute("question", currentQuestion.title);
    question.textContent = currentQuestion.title;
    contentEl.appendChild(question)

    /* Container for the list of awnsers */
    let awnserCont = document.createElement("ul");
    awnserCont.setAttribute("id", "awnserCont");
    contentEl.appendChild(awnserCont);

    /* Displays Awnsers to screen */
    for (let i = 0; i < currentQuestion.options.length; i++) {
        let listOptions = document.createElement("li");
        listOptions.setAttribute("options-value", currentQuestion.options[i]);
        listOptions.setAttribute("id", "questionNumber"+i);
        listOptions.textContent = currentQuestion.options[i];
        awnserCont.appendChild(listOptions)

       if (test) {console.log("current", currentQuestion); }
       awnserCont.addEventListener("click", function (){
           quizAwnser(currentQuestion);
       });
    }

    function quizAwnser(current) {
        if (test) {console.log("--- quizAwnser ---"); }

        var event = event.target;
        if (event.matches("li")) {
            let selectInfo = event.textContent;
            
            if (test) {console.log("selectInfo quiz" + selectInfo); }

            if (selectInfo === current.awnser) {
                score += quizDurationEl - quizSecEl;
            }
            else {
                if (test) {console.log("Wrong Awnser");}
                quizDurationEl -= 10;
            }
        }
        if (test) {console.log("selected", selectInfo);}
        revAwnsers(current);
    }
}

function revAwnsers(current) {
    if (test) {console.log("--- revAnwser ---"); }
    if (test) {console.log("selected", selectInfo); }

    for (let i = 0; i < current.options.length; i++) {
        let questionId = "#questionNumber" + i;
        let questionVert = document.querySelector(questionId);

        if (current.options[i] !== current.anwser) {
            if (test) {console.log("color test false"); }
            questionVert.setAttribute("style", "background-color: red");
        }
        else {
            if (test) {console.log("color test true"); }
            questionVert.setAttribute("style", "background-color: green");
        }
    }
    setTimeout(startQuestion,500);
}

function setupQuizTime() {
    clearInterval(quizIntervalEl);
    quizSeconds = quizDurationEl;
}

function startTime() {
    quizTimerEl.textContent = quizDurationEl - quizSecEl

    if ( (quizDurationEl - quizSecEl) < 1) {
        endOfQuiz();
    }
}

function startQuizTimer() {

    setupQuizTime();

    quizIntervalEl = setInterval(function() {
        quizSecEl++;
        startTime();
    }, 1000);
}

function stopTime() {
    quizSeconds = 0;
    clearInterval(quizIntervalEl);
}

function endOfQuiz() {
    stopTime();
    clearContent();

    timerInfoEl.setAttribute("style", "visibility: hidden;");

    let heading = document.createElement("p");
    heading.setAttribute("id", "content-heading");
    heading.textContent = "Quiz Over";

    let instructions = document.createElement("p");
    instructions.setAttribute("id", "instructions");
    instructions.textContent = " Score is " + score;

    let startAgain = document.createElement("button");
    startAgain.setAttribute("id", "startAgain");
    startAgain.setAttribute("class", "btn btn-secondary");
    startAgain.textContent = "Start Quiz Again";

    let info = document.createElement("p");

    let initialLabel = document.createElement("label");
    initialLabel.setAttribute("for", "userInital");
    initialLabel.textContent = "Enter Intials: ";

    let initialInput = document.createElement("input");
    initialInput.setAttribute("id", "userInitial");
    initialInput.setAttribute("name", "userInitial");
    initialInput.setAttribute("minlength", "3");
    initialInput.setAttribute("maxlength", "3");
    initialInput.setAttribute("size", "3");

    contentEl.appendChild(heading);
    contentEl.appendChild(instructions);
    contentEl.appendChild(initialLabel);
    contentEl.appendChild(initialInput);
    contentEl.appendChild(info);
    contentEl.appendChild(startAgain);

    startAgain.addEventListener("click", data);

    initialInput.addEventListener("input", function() {
        initialInput.value = initialInput.value.toUpperCase();
        if (initialInput.value.length === 3) {
            let currentScore = [{type: quizInfo, name: initialInput.value, score: score }];

            let storedScore = JSON.parse(localStorage.getItem("bestScores"));
            if (storedScore !== null) {
                storedScore.push(currentScore[0]);
            }
            else {
                storedScore = currentScore;
            }

            localStorage.setItem("bestScores", JSON.stringify(storedScore));
            bestScores();
        }
    });
}

function bestScores() {
    stopTime();
    clearContent();

    timerInfoEl.setAttribute("style", "visibility: hidden;");

    let storedScore = JSON.parse (localStorage.getItem("bestScores"));

    let heading = document.createAttribute("h2");
    heading.setAttribute("id", "content-heading");
    heading.textContent = "Top 5 Best Scores";

    contentEl.appendChild(heading);

    if (storedScore !== null) {
        storedScore.sort((a,b) => (a.score < b.score) ? 1: -1);

        let scoresToDisplay = 5;
        if (storedScore.length < 5) {
            scoresToDisplay = storedScore.length;
        }

        for (var i = 0; i < scoresToDisplay; i++) {
            var inputScore = storedScore[i];
            var p = document.createElement("p");
            p.textContent = inputScore.name + "" + inputScore.score + " (" + inputScore.type + ")";
            contentEl.appendChild(p);
        }
    }   else {
            var p = document.createElement("p");
            p.textContent = "Initials Here"
            contentEl.appendChild(p);
        }

        let startAgain = document.createElement("button");
        startAgain.setAttribute("id", "startAgain");
        startAgain.setAttribute("class", "btn btn-secondary");
        startAgain.textContent = "Begin";

        contentEl.appendChild(startAgain);

        startAgain.addEventListener("click", data);
}

bestscoreDiv.addEventListener("click", bestScores);