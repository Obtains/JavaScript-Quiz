const bestScore = document.querySelector("#bestScore");
const refresh = document.querySelector("#refresh");
const restartQuiz = document.querySelector("#restartQuiz");

refresh.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var leaderScores = localStorage.getItem("leaderScores");
leaderScores = JSON.parse(leaderScores);

if (leaderScores !== null) {
    for ( var i = 0; i < leaderScores.length; i++) {
        var liData = document.createElement("li");
        liData.textContent = leaderScores[i].initials + " " + leaderScores[i].score;
        bestScore.appendChild(liData);
    }
}

restartQuiz.addEventListener("click", function () {
    window.location.replace("index.html");
});