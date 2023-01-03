startButton.addEventListener('click', () => {
    loadCurrentGame()
    if (optionsVisible) {
        hideShowOptions()
    }
    audioButton.style.visibility = 'visible'
})
optionStartButton.addEventListener('click', () => {
    loadCurrentGame()
    hideShowOptions()
    audioButton.style.visibility = 'visible'
})

function loadCurrentGame() {
    gameStarted = true;
    numberOfPoints = 0;
    numberFound = 0;
    setPoints(numberOfPoints)
    startButton.remove();
    if (_currentGame == 'synonym') {
        createSynonymGame(currentWord)
    }else if (_currentGame == 'definition') {
        getWordMultipleChoice(currentWord)
    }
}

function nextWord() {
    numberFound = 0;
    startButton.remove();
    if (_currentGame == 'synonym') {
        createSynonymGame(currentWord)
    }else if (_currentGame == 'definition') {
        getWordMultipleChoice(currentWord)
    }
}
function setNavButtons() {
    removeElementsFromDOM(middleAreaNextWord)
    let div = document.createElement('div')
    let img = document.createElement('img')
    img.classList.add('nextButton')
    img.src = 'images/cinnamonNewWord.png'
    img.addEventListener('click', () => {
        nextWord()
    })
    div.append(img)
    middleAreaNextWord.append(div)
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