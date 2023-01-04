startButton.addEventListener('click', () => {
    loadCurrentGame()
    if (optionsVisible) {
        hideShowOptions()
    }

    if (timerDisplay) {
        applyTimer()
        timerFunc()
    }
    audioButton.style.visibility = 'visible'
})

optionStartButton.addEventListener('click', () => {
    loadCurrentGame()
    hideShowOptions()
    if (timerDisplay) {
        timerFunc()
        timeSecond = 60;
        timeRun.innerHTML = timeSecond;
        clearInterval(countDown)
        endTime()
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
    timeSection.style.visibility = 'visible';
    
    timeRun.innerHTML = timeSecond;    
}
//timer countdown---------------------------------------
// const timerFunc = 
//     () => {
//      const countDown = setInterval (() => {
//         timeSecond--;
//         timeRun.innerHTML = timeSecond;
//         if(timeSecond <=0 || timeSecond < 1) {
//             endTime()
//             clearInterval(countDown)
//         }
//     },1000)
// }
const timerFunc =
    () => {
     const countDown = setInterval (() => {
        timeRun.innerHTML = timeSecond;
        if(timeSecond > 0) {
            timeSecond--;
        } else if (timeSecond == 0) {
            clearInterval(countDown)
            endTime()
        }
    }
    ,1000)
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
    myWordDisplay.innerHTML = '';
    audioButton.remove();
    removeElementsFromDOM(listContainer)    // Clears DOM for the following appends
    removeElementsFromDOM(gameInput)        // Clears DOM for the following appends
    setPoints(numberOfPoints)  
    const nextButton = document.querySelector('.nextButton');
    nextButton.remove();
    timeRun.innerHTML = 'TIME OUT'
    const timesUp = document.createElement('div')
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
    restartButton.innerText = "RESTART"
    timesUp.appendChild(restartButton)

    restartButton.addEventListener('click', (myWord) => { 
        timesUp.remove()
        if (timerDisplay) {
            timeSecond = 60;
            timeRun.innerHTML = timeSecond;
            timerFunc()
        }
        createSynonymGame(myWord)
    })
    middleArea.appendChild(timesUp)
    }