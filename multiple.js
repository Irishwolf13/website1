function createMultipleButton() {
    const getNewWord = document.createElement('button')
    getNewWord.innerHTML = 'Multiple Choice'
    getNewWord.addEventListener('click', () => {
        //console.log(_APIword)
        getSynonyms(_APIword)
        removeElementsFromDOM(gameInput)
        removeElementsFromDOM(listContainer)
        getNewRandomNumber()
        setPoints(numberOfPoints)
        let div = document.createElement('div')
        listContainer.appendChild(div)
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
                        if (!mySynonym.includes(" ")) {  // Skip words with spaces
                            if (wordArray[mySynonym] === undefined) {  // Word hasn't already been added.
                                wordArray[mySynonym] = true;
                            }
                        } 
                    })
                }
            })
        })
        listContainer.classList.remove('synonym-List')
        listContainer.classList.add('synonym-List-Multiple')
        console.log('iran')
        let selectionArray = Object.keys(wordArray)
        let selectionRandomNumber = Math.floor(Math.random() * selectionArray.length)
        let mySelection = selectionArray[selectionRandomNumber]
        let button = document.createElement('button')
        button.id = `${mySelection}`
        button.classList.add('multipleChoiceButton')
        button.innerHTML = (mySelection).toLocaleUpperCase()
        listContainer.appendChild(button)
        adjustMainWord(currrentWord, 'Multiple Choice')
    })
}