function createMultipleButton() {
    const getNewWord = document.createElement('button')
    getNewWord.innerHTML = 'Multiple Choice'
    getNewWord.addEventListener('click', () => {
        removeElementsFromDOM(gameInput)
        removeElementsFromDOM(listContainer)
        setPoints(numberOfPoints)
        getWordMultipleChoice(currrentWord)
    })
    newWordButtonHolder.appendChild(getNewWord)
}
createMultipleButton()

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
    adjustMainWord(currrentWord, 'Multiple Choice')

    // Sets up next word
    setUpNewWord()
}