startButton.addEventListener('click', () => {
    startButton.remove();
    gameStarted = true;
    loadCurrentGame()
    if (optionsVisible) {
        hideShowOptions()
    }
})
optionStartButton.addEventListener('click', () => {
    loadCurrentGame()
    hideShowOptions()
    startButton.remove();
    gameStarted = true;
})

function loadCurrentGame() {
    if (_currentGame == 'synonym') {
        createSynonymGame(currentWord)
    }else if (_currentGame == 'definition') {
        getWordMultipleChoice(currentWord)
    }
}

// Dark theme here ************************************
darkThemeSwtich.addEventListener('click', applyDarkTheme)
function applyDarkTheme() {
    // Code for dark theme here ************************************
}

// Timer here ************************************
timerSwitch.addEventListener('click', setTimer)
function setTimer() {
    // Code for timer here ************************************
}