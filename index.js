// My test array of words because I can't seem to get an array of words from the API.
myArrayOfWords = ['Hot', 'Cold', 'Close', 'Far', 'Quiet', 'Loud', 'Missing', 'Help'];

document.addEventListener('DOMContentLoaded', async () => {
    const remoteUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"    // My remote Url
    // Choose a random first word from the array of words and make it the current word.
    let myRandomNumber = Math.floor(Math.random() * myArrayOfWords.length);
    let currrentWord = myArrayOfWords[myRandomNumber];

    // Global Variables needed for hint word dashes
    let gameType = ``
    let numberOfPoints = 0;
    let wordHints = {};
    let hintLetters = ''

    // Gather up the Troops(HTML elements)
    const listContainer = document.querySelector('.synonym-List')
    const titleBar = document.querySelector('.titlebar')
    const gameTypeTitle = document.querySelector('.difficulty')
    const gamePointScore = document.querySelector('.score')
    const gameInput = document.querySelector('.inputArea')
    const newWordButtonHolder = document.querySelector('.newWordButtonHolder')

    function createGetNewWordButton() {
        const getNewWord = document.createElement('button')
        getNewWord.innerHTML = 'Get New Word'
        getNewWord.addEventListener('click', () => {
            getNewRandomNumber()
            setPoints(numberOfPoints)
            setHTMLforFillInBlanks()
            getWordFillInBlanks(currrentWord)
            let myhint = document.querySelector('.hint')
            myhint.innerHTML = "Click on a Box to get a hint!"
        })
        newWordButtonHolder.appendChild(getNewWord)
    }
    createGetNewWordButton()

    function getNewRandomNumber() {
        myRandomNumber = Math.floor(Math.random() * myArrayOfWords.length)
        currrentWord = myArrayOfWords[myRandomNumber]
    }
    function adjustMainWord() {
        titleBar.innerHTML = currrentWord
    }
    function setPoints(numberOfPoints) {
        gamePointScore.innerHTML = numberOfPoints;
    }
    function removeElementsFromDOM(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }
    // This is for fill in the blank gamestyle
    function getWordFillInBlanks(myWord) {
        removeElementsFromDOM(listContainer) // Clears DOM for the following appends
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
                                    wordHints[mySynonym] = 1;
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
            adjustMainWord(currrentWord)
            gameTypeTitle.innerHTML = 'Fill in the Blanks';
        })
    };

    function setHTMLforFillInBlanks() {
        let form = document.createElement("form")
        let input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("name", "name")
        input.setAttribute("value", "")
        input.setAttribute("placeholder", "Guess Synonym here")
        input.classList.add("input-text")
        let submit = document.createElement("input")
        submit.setAttribute("type", "submit")
        submit.setAttribute("name", "submit")
        submit.setAttribute("value", "submit")
        submit.classList.add("submit")
        form.appendChild(input)
        form.appendChild(submit)
        form.classList.add("form")
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            foundWord(e)
            e.target.reset()
        })
        let p = document.createElement("p")
        p.classList.add("hint")
        p.innerHTML = "Click on a Box to get a hint!"
        removeElementsFromDOM(gameInput) // Clears DOM for the following appends
        gameInput.appendChild(form)
        gameInput.appendChild(p)
    }

    function foundWord(e) {
        //console.log(wordHints)
        if (wordHints[e.target.name.value]) {
            let myDiv = document.querySelector(`#${e.target.name.value}`)
            myDiv.classList.remove('notFound')
            myDiv.classList.add('found')
            myDiv.innerHTML = e.target.name.value;
            wordHints[e.target.name.value] = (e.target.name.value.length +1);
            numberOfPoints += 100
            setPoints(numberOfPoints)
        }
        
    }
    function hintButtonClicked(e, mySynonym) {
        hintLetters = e.target.id.slice(0, wordHints[e.target.id])
        // Add Dashes for the number of letters
        for (let i = 0; i <= mySynonym.length -(wordHints[e.target.id]+1); i++) {
            hintLetters += ' -'
        }
        if (wordHints[e.target.id] == mySynonym.length) {
            // This is where we need to set div as complete and change background color as if user inputted it correctly
            // numberOfPoints += 100
            e.target.classList.remove('notFound')
            e.target.classList.add('found')
            // setPoints(numberOfPoints)
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
                const hintText = document.querySelector('.hint')
                hintText.innerHTML = element.meanings[0].definitions[0].definition
            })
        })
    }
    
    // Set up game scoreboard
        //setPoints(numberOfPoints);
    // Game Type of Fill in the Blanks
        //setHTMLforFillInBlanks()
        //getWordFillInBlanks(currrentWord);
    // Game type of multiple choice

    // Game type Match Synonyms
})