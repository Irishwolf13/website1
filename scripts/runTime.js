startButton.addEventListener('click', () => {
    loadCurrentGame()
    if (optionsVisible) {
        hideShowOptions()
    }
    if (timerDisplay) {
        applyTimer()
        startTimer()
    }
    audioButton.style.visibility = 'visible'
})
optionStartButton.addEventListener('click', () => {
    loadCurrentGame()
    hideShowOptions()
    if (timerDisplay) {
        startTimer()
    }
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

// Timer here ************************************
timerSwitch.addEventListener('click', applyTimer)
function applyTimer() {
    //code for timer here ************************************
    timeSection.style.visibility = 'visible';
    
    timeRun.innerHTML = timeSecond;    
}

function startTimer() {
     const countDown = setInterval (() => {
        timeSecond--;
        timeRun.innerHTML = timeSecond;
        if(timeSecond <=0 || timeSecond < 1) {
            endTime()
            clearInterval(countDown)
        }
    },1000)
    
}

timerSwitch.addEventListener('click', displayTimer)
    function displayTimer() {
        if (timerDisplay) {
            timeSection.style.visibility = 'hidden'
            timerDisplay = false
        } else {
            timeSection.style.display = 'visible'
            timerDisplay = true
        }
    }
        

function endTime() {
    timeRun.innerHTML = 'TIME OUT'
}

    // Code for timer here ************************************
