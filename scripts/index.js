// My test array of words because I can't seem to get an array of words from the API.
const myArrayOfWords = ['hot', 'Cold', 'Fair', 'Far', 'Quiet', 'Loud', 'Missing', 'Help'];

const remoteUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"    // My remote Url
// Choose a random first word from the array of words and make it the current word.
let myRandomNumber = Math.floor(Math.random() * myArrayOfWords.length);
let currentWord = myArrayOfWords[myRandomNumber];
let numberOfPoints = 0;
let _APIword = {};
let _APIsynonyms = {};
let _APIantonyms = {};
let _currentGame = 'synonym';
let _currentDifficulty = 'easy';
let _isTimer = false;
let _timerCounter = 60;
let darkTheme = false;

let optionsVisible = false;
let gameStarted = false;
infoFromAPI(currentWord)

// Gather up the Troops(HTML elements)
const myWordDisplay = document.querySelector('.gameTypeBar')
const gameDifficulty = document.querySelector('.difficulty')
const gameCircle = document.querySelector('.circle')
const gamePointScore = document.querySelector('.score')
const gamePointTitle = document.querySelector('.pointsTitle')
const gameInput = document.querySelector('.inputArea')
const listContainer = document.querySelector('.synonym-List')
const optionContainer = document.querySelector('.optionContainer')
const optionGameType = document.querySelector('.optionGameType')
const optionDifficulty = document.querySelector('.optionDifficulty')
const optionTimer = document.getElementById('timerSwitch')
const optionDark = document.getElementById('darkThemeSwtich')
const optionMenuButton = document.querySelector('.optionMenuButton')
const startButton = document.querySelector('.startButton')
const optionStartButton = document.querySelector('.optionStartButton')
const optionDifEasy = document.querySelector('.easy')
const optionDifMedium = document.querySelector('.medium')
const optionDifHard = document.querySelector('.hard')
const darkThemeSwtich = document.getElementById('darkThemeSwtich')
const timerSwitch = document.getElementById('timerSwitch')

optionMenuButton.addEventListener('click', hideShowOptions)
function hideShowOptions() {
    optionMenuButton.innerHTML == 'Options' ? optionMenuButton.innerHTML = 'Close Options' : optionMenuButton.innerHTML = 'Options'
    if (optionsVisible) {
        optionContainer.style.height = '0px'
        optionContainer.style.visibility = 'hidden'
        optionsVisible = false
    } else {
        optionContainer.style.height = '200px'
        optionContainer.style.visibility = 'visible'
        optionsVisible = true
    }
    if (!gameStarted) {
        if (startButton.style.visibility == '') {
            startButton.style.visibility = 'hidden'
        }else {
            startButton.style.visibility = ''
        }
    }
}
function getNewRandomWord() {
    myRandomNumber = Math.floor(Math.random() * myArrayOfWords.length)
    currentWord = myArrayOfWords[myRandomNumber]
}
function adjustMainWord(gameWord, gameMode) {
    myWordDisplay.innerHTML = gameWord
    gameDifficulty.innerHTML = gameMode
}
function setPoints(myPoints) {
    gameCircle.style.visibility = 'visible'
    gamePointTitle.innerHTML = 'Points:'
    gamePointScore.innerHTML = myPoints;
}
function removeElementsFromDOM(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

function setUpNewWord() {
    _APIsynonyms = {};
    _APIantonyms = {};
    getNewRandomWord()
    infoFromAPI(currentWord)
}

function infoFromAPI(myWord) {
    const myURL = remoteUrl + myWord
    fetch(myURL, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then((apiReturn) => apiReturn.json())
    .then((response) => {
        response.forEach(element => {
            element.meanings.forEach(e => {
                let myType = e.partOfSpeech
                e.synonyms.forEach(s => {
                    if (!s.includes(" ")){
                        _APIsynonyms[s] = myType;
                    }
                })
            })
        });
        response.forEach(element => {
            element.meanings.forEach(e => {
                let myType = e.partOfSpeech
                e.antonyms.forEach(s => {
                    if (!s.includes(" ")){
                        _APIantonyms[s] = myType;
                    }
                })
            })
        })
    })
}

// BEGIN section is for game setup using Options *************************************
const synonymButton = document.querySelector('.selectSynonym')
const defintionButton = document.querySelector('.selecDefinition')

synonymButton.addEventListener('click', (e) => {
    if (e.target.id == '') {
        e.target.id = 'myGameType'
        defintionButton.id = ''
        _currentGame = 'synonym'
    }
    console.log(_currentGame)
})
defintionButton.addEventListener('click', (e) => {
    if (e.target.id == '') {
        e.target.id = 'myGameType'
        synonymButton.id = ''
        _currentGame = 'definition'
    }
    console.log(_currentGame)
})
function switchDificulty(button) {
    button.target.id ='myDificulty'
    _currentDifficulty = button.target.class
    switch (button.target.classList[0]) {
        case 'easy':
            optionDifMedium.id = ''
            optionDifHard.id = ''
        break
        case'medium':
            optionDifEasy.id = ''
            optionDifHard.id = ''
        break
        case 'hard':
            optionDifEasy.id = ''
            optionDifMedium.id = ''
        break
    }
}
optionDifEasy.addEventListener('click', switchDificulty)
optionDifMedium.addEventListener('click', switchDificulty)
optionDifHard.addEventListener('click', switchDificulty)

optionTimer.addEventListener('click', (e) => {
    _isTimer ? _isTimer = false : _isTimer = true
})
optionDark.addEventListener('click', (e) => {
    darkTheme ? darkTheme = false : darkTheme = true
})
// END section is for game setup using Options *************************************