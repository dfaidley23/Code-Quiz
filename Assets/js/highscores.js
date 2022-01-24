function highscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    // will grab each item in the array and attach it to a li item and then append that item to the parent element
    highscores.forEach(function (score) {
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;
        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
    });
}

// a function needed to reset the highscores if requested
function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

highscores();