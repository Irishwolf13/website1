function createMultipleButton() {
    const getNewWord = document.createElement('button')
    getNewWord.innerHTML = 'Multiple Choice'
    getNewWord.addEventListener('click', () => {
        removeElementsFromDOM(gameInput)
        removeElementsFromDOM(listContainer)
        getNewRandomNumber()
        setPoints(numberOfPoints)
        let div = document.createElement('div')
        //div.innerHTML = 'Frank'
        listContainer.appendChild(div)
        //myWordDisplay.innerHTML = 'Frank'
        gameDifficulty.innerHTML = 'Multiple Choice'
        getWordMultipleChoice(currrentWord)
    })
    newWordButtonHolder.appendChild(getNewWord)
}
createMultipleButton()

function getWordMultipleChoice(myWord) {
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
                            }
                        } 
                    })
                }
            })
        })
        listContainer.classList.remove('synonym-List')
        listContainer.classList.add('synonym-List-Multiple')
        
        let selectionArray = Object.keys(wordArray)
        let selectionRandomNumber = Math.floor(Math.random() * selectionArray.length)
        let mySelection = selectionArray[selectionRandomNumber]
        let button = document.createElement('button')
        button.id = `${mySelection}`
        button.classList.add('multipleChoiceButton')
        button.innerHTML = (mySelection).toLocaleUpperCase()
        listContainer.appendChild(button)
        adjustMainWord(currrentWord)
        gameDifficulty.innerHTML = 'Multiple Choice';
    })
}