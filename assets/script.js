/* Quiz Questions */
var jsQuestions= [
    {
        title: "What does the term DOM stand for?",
        options: ["Document Object Model", "Data Object Media", "Decimal Opt Model", "Delta Oscar Micheal"],
        answer: "Document Object Model",
    },

    {
        title: "What does the term API stand for?",
        options: ["Alpacas Pacing Independantly", "Application Programming Info", "Application Programming Interface", "Apply Pictures Index"],
        answer: "Application Programming Interface",
    },

    {
        title: "What encloses the condition of a if/else statement?",
        options: ["Curly Brackets", "Parentheses", "Square Brackets", "Quotes"],
        answer: "Parentheses",
    },
];

/* Page Objects */
var score = 0;
var quizList = 0;
var questionInfo = document.querySelector("#questionInfo");
var contentEl = document.querySelector("#content");
var currentTime = document.querySelector("#quizTimer");
var timerInfo = document.querySelector("#beginTime");

/* Timer Variables */
var ulData = document.createElement("ul");
var timeLeft = 60;
var timeInterval = 0;
var penalty = 5;

timerInfo.addEventListener("click", function () {
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            timeLeft--;
            currentTime.textContent = "Time Remaining: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                quizDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    create(quizList);
});

/* function for the lists of question */
function create(quizList) {
    questionInfo.innerHTML ="";
    ulData.innerHTML = "";
    for (var i = 0; i < jsQuestions.length; i++) {
        var dataQuestion = jsQuestions[quizList].title;
        var dataOptions = jsQuestions[quizList].options;
        questionInfo.textContent = dataQuestion;
    }

    dataOptions.forEach(function (dataObj) {
        var listObj = document.createElement("li");
        listObj.textContent = dataObj;
        questionInfo.appendChild(ulData);
        ulData.appendChild(listObj); 
        listObj.addEventListener("click", check);
    });
}

/* function to check user anwser to correct anwser */
function check(event) {
    var e = event.target;
    if (e.matches("li")) {
        var divData = document.createElement("div");
        divData.setAttribute("id", "divData");
        if (e.textContent == jsQuestions[quizList].answer) {
            score++;
            divData.textContent = "Correct!!!";
        }
        else {
            timeLeft = timeLeft - penalty;
            divData.textContent = "Wrong!!!";
        }
    }

    quizList++;

    if (quizList >= jsQuestions.length) {
        quizDone();
        divData.textContent = "Quiz Over " + " " + "You scored " + score + "/" + jsQuestions.length + " Correct!!!";
    }
        else {
            create(quizList);
        }
        questionInfo.appendChild(divData);
}

/* Quiz Completed */
function quizDone() {
    questionInfo.innerHTML = "";
    currentTime.innerHTML = "";

    var h1Data = document.createElement("h1");
    h1Data.setAttribute("id", "h1Data");
    h1Data.textContent = "Completed!";

    questionInfo.appendChild(h1Data);

    if (timeLeft >= 0) {
        var timeRemain = timeLeft;
        var pData = document.createElement("p");
        clearInterval(timeInterval);
        pData.textContent = " Final Score is: " + timeRemain;

        questionInfo.appendChild(pData);
    }

    var labelData = document.createElement("label");
    labelData.setAttribute("id", "labelData");
    labelData.textContent = " Enter Your Initials: ";

    questionInfo.appendChild(labelData);

    var inputData = document.createElement("input");
    inputData.setAttribute("type", "text");
    inputData.setAttribute("id", "initials");
    inputData.textContent = "";

    questionInfo.appendChild(inputData);

    var buttonData = document.createElement("button");
    buttonData.setAttribute("type", "enter");
    buttonData.setAttribute("id", "Enter");
    buttonData.textContent = "Enter";

    questionInfo.appendChild(buttonData);

    buttonData.addEventListener("click", function () {
        var initials = inputData.value;

        if (initials === null) {
            alert("No input entered, please enter in initials.");
        }
        else {
            var endScore = {
                initials: initials,
                score: timeRemain,
            };
            console.log(endScore);
            var leaderScores = localStorage.getItem("leaderScores");
            if (leaderScores === null) {
                leaderScores = [];
            }
            else {
                leaderScores = JSON.parse(leaderScores);
            }
            leaderScores.push(endScore);
            var newScore = JSON.stringify(leaderScores);
            localStorage.setItem("leaderScores", newScore);
            window.location.replace("bestscores.html");
        }
    });
}