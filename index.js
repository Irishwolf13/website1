// My test array of words because I can't seem to get an array of words from the API.
myArrayOfWords = ['Hot', 'Cold', 'Close', 'Far', 'Quiet', 'Loud', 'Missing', 'Help'];

document.addEventListener('DOMContentLoaded', async () => {
    // This will choose a random first word from the array of words and make it the current word.
    let myRandomNumber = Math.floor(Math.random() * myArrayOfWords.length);
    let currrentWord = myArrayOfWords[myRandomNumber];
    // My remote Url
    const remoteUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

    // Place Holders for GameType and GameScore
    // Will replace with dynamic values when we get to them.
    let gameType = `Fill in the Blanks`
    let gameScore = 0;

    // Global Variables needed for hint word dashes
    let wordHints = {};
    let hintLetters = ''
    let numberOfShownLetters = 1

    // Gather up the Troops(HTML elements)
    const listContainer = document.querySelector('.synonym-List')
    const titleBar = document.querySelector('.titlebar')
    const gameTypeTitle = document.querySelector('.difficulty')
    const gamePointScore = document.querySelector('.score')
    const hintText = document.querySelector('.hint')

    function adjustMainWord() {
        titleBar.innerHTML = currrentWord
    }
    function setGameType() {
        gameTypeTitle.innerHTML = gameType;
    }
    function setPoints() {
        gamePointScore.innerHTML = gameScore;
    }

    // This is for fill in the blank gamestyle
    function getWordFillInBlanks(myWord) {
        fetch(`${remoteUrl}${myWord}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(response => response.json()) 
        .then(myWord => {
            let wordArray = {}
            myWord.forEach(element => {
                element.meanings.forEach(myMeanings => {
                    if (myMeanings.synonyms.length > 0) {
                        myMeanings.synonyms.forEach(mySynonym => {
                            // Skip words with spaces
                            if (!mySynonym.includes(" ")) {
                                // This checks to see that the word hasn't already been added.
                                if (wordArray[mySynonym] === undefined) {
                                    wordArray[mySynonym] = true;

                                    // Creates element and populates it with all that I need.
                                    let li = document.createElement('li')
                                    li.id = `${mySynonym}`;
                                    li.classList.add('list-Item','notFound')
                                    li.innerHTML = '????'
                                    li.addEventListener('click', (e) => {
                                        hintButtonClicked(e, mySynonym)
                                    })
                                    // Appened the whole deal to the DOM
                                    listContainer.appendChild(li)
                                }
                            } 
                        })
                    }
                })
            })
            // This should eventually get the word from the dictionary and make it the current word
            let newWord = currrentWord
            adjustMainWord(newWord)
        })
    };

    function hintButtonClicked(e, mySynonym) {
        if (wordHints[e.target.id]) {
            hintLetters = e.target.id.slice(0, wordHints[e.target.id])
        } else {
            wordHints[e.target.id] = 1
            hintLetters = e.target.id.slice(0, 1)
        }
        // Add Dashes for the number of letters
        for (let i = 0; i <= mySynonym.length -(wordHints[e.target.id]+1); i++) {
            hintLetters += ' -'
        }
        if (wordHints[e.target.id] == mySynonym.length) {
// This is where we need to set div as complete and change background color as if user inputted it correctly
            console.log(wordHints)
            gameScore += 100
            setPoints()
        }
        wordHints[e.target.id] ++;
        // Sets Text in the Box to hangman version of the word
        e.target.innerHTML = hintLetters

        // This fetch is to get the definition of the synonym and display it in the 'hint' section
        fetch(`${remoteUrl}${e.target.id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(response => response.json())
        .then(mySynonymWord => {
            mySynonymWord.forEach(element => {
                // Definition of the synonym and display it in the 'hint' section
                hintText.innerHTML = element.meanings[0].definitions[0].definition
            })
        })
    }
    
    // This is where I actually run the code
    setGameType();
    setPoints();
    getWordFillInBlanks(currrentWord);
})