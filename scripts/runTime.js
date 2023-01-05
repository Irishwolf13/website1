timesUp = false;
let countDown = false;

startButton.addEventListener('click', () => {
    loadCurrentGame()
    if (optionsVisible) {
        hideShowOptions()
    }
    if (timerDisplay) {
        timeSecond = timeCurrent;
        timeRun.innerHTML = fancyTimeFormat(timeSecond);
        timeSection.style.visibility = 'visible';
        applyTimer()
        timerFunc()
    }
})

optionStartButton.addEventListener('click', () => {
    if (timesUp) {
        timesUp.remove()
    }
    loadCurrentGame()
    hideShowOptions()
    if (timerDisplay) {
        if (countDown) {
            clearInterval(countDown)
        }
        timeSecond = timeCurrent;
        timeRun.innerHTML = fancyTimeFormat(timeSecond);
        timeSection.style.visibility = 'visible';
        timerFunc()
    }
})

function loadCurrentGame() {
    gameStarted = true;
    numberOfPoints = 0;
    numberFound = 0;
    setPoints(numberOfPoints)
    startButton.remove();
    if (_currentGame == 'synonym') {
        createSynonymGame(currentWord)
    } else if (_currentGame == 'definition') {
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
//display timer--------------------------------------------------------
function applyTimer() {
    timeRun.innerHTML = fancyTimeFormat(timeSecond);    
}
//timer countdown---------------------------------------
const timerFunc = 
    () => {
    countDown = setInterval (() => {
        if(timeSecond > 0) {
            timeSecond--;
            timeRun.innerHTML = fancyTimeFormat(timeSecond);
        } else { 
            endTime()
            clearInterval(countDown) 
        }
    },1000)}

function fancyTimeFormat(duration) {
    let hrs = ~~(duration / 3600)
    let mins = ~~((duration % 3600) / 60)
    let secs = ~~(duration % 60)
    let ret = ""
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
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
        
//-------------------time out function---------------------
function endTime() {
    audioButton.style.visibility = 'hidden';
    myWordDisplay.innerHTML = '';
    removeElementsFromDOM(listContainer)    // Clears DOM for the following appends
    removeElementsFromDOM(gameInput)        // Clears DOM for the following appends
    setPoints(numberOfPoints)  
    const nextButton = document.querySelector('.nextButton');
    nextButton.remove();
    timeRun.innerHTML = 'TIME OUT'
    timesUp = document.createElement('div')
    timesUp.className = "timesUp"
//-----Game over image--------------------------------
    const gameOver = document.createElement('img')
    timesUp.appendChild(gameOver)
    gameOver.src = "images/gameOver.png"
    gameOver.className = "gameOver"
//------Point report--------------------------------
    const pointsRecord = document.createElement('div')
    pointsRecord.className = "pointsRecord"
    pointsRecord.innerText = `Your Points: ${numberOfPoints}`
    timesUp.appendChild(pointsRecord)
//-----restart Button---------------------------------
    const restartButton = document.createElement('button')
    restartButton.className = "restartButton"
    restartButton.innerText = "REPLAY"
    restartButton.addEventListener('click', (myWord) => { 
        timesUp.remove()
        if (timerDisplay) {
            timeSecond = timeCurrent;
            timeRun.innerHTML = fancyTimeFormat(timeSecond);
            timeSection.style.visibility = 'visible';
            if (_currentGame == 'synonym') {
                createSynonymGame(myWord)
            } else if (_currentGame == 'definition') {
                getWordMultipleChoice(myWord)
            }
            timerFunc()
        } else {
            if (_currentGame == 'synonym') {
                createSynonymGame(currentWord)
            } else if (_currentGame == 'definition') {
                getWordMultipleChoice(currentWord)
            }
        }
    })
    timesUp.appendChild(restartButton)
    middleArea.appendChild(timesUp)
}

