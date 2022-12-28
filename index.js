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
    let gameScore = `100`;

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
            myWord.forEach(element => {
                element.meanings.forEach(myMeanings => {
                    if (myMeanings.synonyms.length > 0) {
                        myMeanings.synonyms.forEach(mySynonym => {
                            // Skip words with spaces
                            if (mySynonym.includes(" ")) {
                                // Do nothing
                            } else {
                                let li = document.createElement('li')
                                li.innerHTML = '????'
                                li.classList.add('list-Item','notFound')
                                li.id = `${mySynonym}`;
                                
                                // This will get the definition of the synonym and display it in the 'hint' section
                                li.addEventListener('click', (e) => {
                                    buttonClicked(e, mySynonym)
                                })
                                listContainer.appendChild(li)
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

    function adjustMainWord() {
        titleBar.innerHTML = currrentWord
    }

    function setGameType() {
        gameTypeTitle.innerHTML = gameType;
    }

    function setPoints() {
        gamePointScore.innerHTML = gameScore;
    }

    function buttonClicked(e, mySynonym) {
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
    
    setGameType();
    setPoints();
    getWordFillInBlanks(currrentWord);
})