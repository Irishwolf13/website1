startButton.addEventListener('click', () => {
    loadCurrentGame()
    if (optionsVisible) {
        hideShowOptions()
    }
})
optionStartButton.addEventListener('click', () => {
    loadCurrentGame()
    hideShowOptions()
})

function loadCurrentGame() {
    gameStarted = true;
    numberOfPoints = 0;
    setPoints(numberOfPoints)
    startButton.remove();
    if (_currentGame == 'synonym') {
        createSynonymGame(currentWord)
    }else if (_currentGame == 'definition') {
        getWordMultipleChoice(currentWord)
    }
}

function nextWord() {
    // NEED CODE HERE FOR ADDING A NEXT WORD BUTTON AT THE BOTTOM *******************************
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