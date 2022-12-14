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
            clearInterval(countDown) 
            endTime()
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
        clearInterval(countDown)
    } else {
        timeSection.style.display = 'visible'
        timerDisplay = true
    }
}
        
//-------------------time out function---------------------
function endTime() {
    const nextButton = document.querySelector('.nextButton');
    if (nextButton) {
        nextButton.remove();
    }
    audioButton.style.visibility = 'hidden';
    myWordDisplay.innerHTML = '';
    removeElementsFromDOM(listContainer)    // Clears DOM for the following appends
    removeElementsFromDOM(gameInput)        // Clears DOM for the following appends
    setPoints(numberOfPoints)  
    timeRun.innerHTML = 'TIME OUT'
    setHighScores()
}
//------GET high scores for current user function-------------
function getHighScores() {
    _highScores = []
    //GET function for grabbing high scores based on current game style and current difficulty level. stored in _highScores in index.js with all the other globally stored variables
    fetch(`http://localhost:3000/scores?_sort=score&_order=desc&username=user1&gameType=${_currentGame}&difficulty=${_currentDifficulty}&_limit=3`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then((apiReturn) => apiReturn.json())
    .then((response) => {
        response.forEach(e => {
            _highScores.push(e.score)
        });
        //-----Game over image--------------------------------
        timesUp = document.createElement('div')
        timesUp.className = "timesUp"
        const gameOver = document.createElement('img')
        timesUp.appendChild(gameOver)
        gameOver.src = "images/gameOver.png"
        gameOver.className = "gameOver"
        //-----High Scores div--------------------------------
        const highScoresContainer = document.createElement('div')
        highScoresContainer.className = "highScoresContainer"

        let myDiv = document.createElement('div')
        myDiv.innerHTML = `1st.  ${_highScores[0]}`
        highScoresContainer.appendChild(myDiv)
        myDiv = document.createElement('div')
        myDiv.innerHTML = `2nd.  ${_highScores[1]}`
        highScoresContainer.appendChild(myDiv)
        myDiv = document.createElement('div')
        myDiv.innerHTML = `3rd.  ${_highScores[2]}`
        highScoresContainer.appendChild(myDiv)

        timesUp.appendChild(highScoresContainer)
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
            numberOfPoints = 0
            setPoints(numberOfPoints)
            timesUp.remove()
            if (timerDisplay) {
                timeSecond = timeCurrent;
                timeRun.innerHTML = fancyTimeFormat(timeSecond);
                timeSection.style.visibility = 'visible';
                if (_currentGame == 'synonym') {
                    createSynonymGame(currentWord)
                } else if (_currentGame == 'definition') {
                    getWordMultipleChoice(currentWord)
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
    })
}
//------SET high scores for current user function-------------
function setHighScores() {
    fetch('http://localhost:3000/scores', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            username: "user1",
            gameType: _currentGame,
            difficulty: _currentDifficulty,
            score: numberOfPoints
        })
    })
    .then(getHighScores())
}

    