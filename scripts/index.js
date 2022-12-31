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
infoFromAPI(currentWord)
let isVisible = false;
let darkTheme = false;

// Gather up the Troops(HTML elements)
const myWordDisplay = document.querySelector('.gameTypeBar')
const gameDifficulty = document.querySelector('.difficulty')
const gamePointScore = document.querySelector('.score')
const gameInput = document.querySelector('.inputArea')
const listContainer = document.querySelector('.synonym-List')
const optionContainer = document.querySelector('.optionContainer')
const optionGameType = document.querySelector('.optionGameType')
const optionDifficulty = document.querySelector('.optionDifficulty')
const optionTimer = document.querySelector('.optionTimer')
const optionDark = document.querySelector('.optionDark')
const optionMenuButton = document.querySelector('.optionMenuButton')
const startButton = document.querySelector('.startButton')
startButton.addEventListener('click', () => {
    startButton.remove(); // This is only a placeholder so it deletes itself.
})
optionMenuButton.addEventListener('click', () => {
    hideShowOptions()
})
const darkThemeSwtich = document.getElementById('darkThemeSwtich')
darkThemeSwtich.addEventListener('click', () => {
    applyDarkTheme()
})
const timerSwitch = document.getElementById('timerSwitch')
timerSwitch.addEventListener('click', () => {
    setTimer()
})
    
function applyDarkTheme() {
    // Code for dark theme here ************************************
}
function setTimer() {
    // Code for timer here ************************************
}
    
function hideShowOptions() {
    if (isVisible) {
        optionContainer.style.height = '0px'
        optionContainer.style.visibility = 'hidden'
        isVisible = false
    } else {
        optionContainer.style.height = '200px'
        optionContainer.style.visibility = 'visible'
        isVisible = true
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
    // console.log(_APIsynonyms)
    // Super Fancy Comment *****
    // Another Super Fancy Comment **********************************
}