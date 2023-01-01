startButton.addEventListener('click', () => {
    startButton.remove();
    loadCurrentGame()
    if (isVisible) {
        hideShowOptions()
    }
})
optionStartButton.addEventListener('click', () => {
    loadCurrentGame()
    hideShowOptions()
})

function loadCurrentGame() {
    if (_currentGame == 'synonym') {
        createSynonymGame(currentWord)
    }else if (_currentGame == 'definition') {
        getWordMultipleChoice(currentWord)
    }
}

// let _currentGame = 'synonym';
// let _currentDifficulty = 'easy';
// let _isTimer = false;
// let _timerCounter = 60;



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