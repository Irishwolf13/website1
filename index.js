// My test array of words because I can't seem to get an array of words from the API.
const myArrayOfWords = ['Hot', 'Cold', 'Fair', 'Far', 'Quiet', 'Loud', 'Missing', 'Help'];

const remoteUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"    // My remote Url
// Choose a random first word from the array of words and make it the current word.
let myRandomNumber = Math.floor(Math.random() * myArrayOfWords.length);
let currrentWord = myArrayOfWords[myRandomNumber];
let numberOfPoints = 0;
let _APIword = {};
let _APIsynonyms = {};

// Gather up the Troops(HTML elements)
const myWordDisplay = document.querySelector('.gameTypeBar')
const gameDifficulty = document.querySelector('.difficulty')
const gamePointScore = document.querySelector('.score')
const gameInput = document.querySelector('.inputArea')
const newWordButtonHolder = document.querySelector('.newWordButtonHolder')
const listContainer = document.querySelector('.synonym-List')

function getNewRandomNumber() {
    myRandomNumber = Math.floor(Math.random() * myArrayOfWords.length)
    currrentWord = myArrayOfWords[myRandomNumber]
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

function infoFromAPI(myWord) {
    const myURL = remoteUrl + myWord
    fetch(myURL, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then((response) => response.json())
    .then((response) => {
        _APIword = response
    })
}

function getSynonyms(fromMyWord) {
    fromMyWord.forEach(element => {
        //console.log(element)
        element.meanings.forEach(e => {
            let myType = e.partOfSpeech
            e.synonyms.forEach(s => {
                if (!s.includes(" ")){
                    _APIsynonyms[s] = myType;
                }
            })
        })
    });
    console.log(_APIsynonyms)
}

infoFromAPI(currrentWord)