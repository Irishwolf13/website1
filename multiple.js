function createMultipleButton() {
    const getNewWord = document.createElement('button')
    getNewWord.innerHTML = 'Multiple Choice'
    getNewWord.addEventListener('click', () => {
        removeElementsFromDOM(gameInput)
        removeElementsFromDOM(listContainer)
        getNewRandomNumber()
        setPoints(numberOfPoints)
        let div = document.createElement('div')
        div.innerHTML = 'Frank'
        listContainer.appendChild(div)
        myWordDisplay.innerHTML = 'Frank'
        gameDifficulty.innerHTML = 'Multiple Choice'
    })
    newWordButtonHolder.appendChild(getNewWord)
}
createMultipleButton()
