// My test array of words because I can't seem to get an array of words from the API.
const myArrayOfWords = ['Hot', 'Cold', 'Close', 'Far', 'Quiet', 'Loud', 'Missing', 'Help'];

const remoteUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"    // My remote Url
// Choose a random first word from the array of words and make it the current word.
let myRandomNumber = Math.floor(Math.random() * myArrayOfWords.length);
let currrentWord = myArrayOfWords[myRandomNumber];
let numberOfPoints = 0;

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
function adjustMainWord() {
    myWordDisplay.innerHTML = currrentWord
}
function setPoints(myPoints) {
    gamePointScore.innerHTML = myPoints;
}
function removeElementsFromDOM(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}
// Set up game scoreboard
    //setPoints(numberOfPoints);
// Game Type of Fill in the Blanks
    //setHTMLforFillInBlanks()
    //getWordFillInBlanks(currrentWord);
// Game type of multiple choice

// Game type Match Synonyms