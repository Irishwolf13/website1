function createMultipleButton() {
    const getNewWord = document.createElement('button')
    getNewWord.innerHTML = 'Definition Game'
    getNewWord.addEventListener('click', () => {
        removeElementsFromDOM(gameInput)
        removeElementsFromDOM(listContainer)
        setPoints(numberOfPoints)
        getWordMultipleChoice(currentWord)
    })
    optionGameType.appendChild(getNewWord)
}

function getWordMultipleChoice(myWord) {
    listContainer.classList.remove('synonym-List')
    listContainer.classList.add('synonym-List-Multiple')
    
    let selectionArray = Object.keys(_APIsynonyms)
    let selectionRandomNumber = Math.floor(Math.random() * selectionArray.length)
    let mySelection = selectionArray[selectionRandomNumber]
    let button = document.createElement('button')
    button.id = `${mySelection}`
    button.classList.add('multipleChoiceButton')
    button.innerHTML = (mySelection).toLocaleUpperCase()
    listContainer.appendChild(button)
    
    adjustMainWord(currentWord, 'Multiple Choice')
    
    // Sets up next word
    setUpNewWord()
}

createMultipleButton()