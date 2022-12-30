// My test array of words because I can't seem to get an array of words from the API.
const myArrayOfWords = ['Hot', 'Cold', 'Fair', 'Far', 'Quiet', 'Loud', 'Missing', 'Help'];

const remoteUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"    // My remote Url
// Choose a random first word from the array of words and make it the current word.
let myRandomNumber = Math.floor(Math.random() * myArrayOfWords.length);
let currentWord = myArrayOfWords[myRandomNumber];
let numberOfPoints = 0;
let _APIword = {};
let _APIsynonyms = {};
let _APIantonyms = {};
infoFromAPI(currentWord)
let coverVis = true;

// Gather up the Troops(HTML elements)
const myWordDisplay = document.querySelector('.gameTypeBar')
const gameDifficulty = document.querySelector('.difficulty')
const gamePointScore = document.querySelector('.score')
const gameInput = document.querySelector('.inputArea')
const sideTitleContainer = document.querySelector('.sideTitleContainer')
const sideGameType = document.querySelector('.sideGameType')
const sideDifficulty = document.querySelector('.sideDifficulty')
const sideTimer = document.querySelector('.sideTimer')
const sideDark = document.querySelector('.sideDark')
const listContainer = document.querySelector('.synonym-List')

const cover = document.querySelector('.sideTitleCover')
const mainMenu = document.querySelector('.mainMenu')
mainMenu.addEventListener('click', () => {
    if (coverVis == true) {
        cover.style.height = '0px'
        coverVis = false
    } else if (coverVis == false) {
        cover.style.height = '400px'
        coverVis = true
    }
})

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
}