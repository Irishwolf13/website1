function getWordMultipleChoice(myWord) {
    removeElementsFromDOM(gameInput)
    removeElementsFromDOM(listContainer)
    setPoints(numberOfPoints)
    listContainer.classList.remove('synonym-List')
    listContainer.classList.add('synonym-List-Multiple')
    // Sets up next word
    setUpNewWord()

    let newArray = ['myWord', 'myWord', 'myWord', 'myWord']
    let myNumber = Math.floor(Math.random() * newArray.length)
    console.log(myNumber)
    newArray[myNumber] = myWord




    // console.log(_currentAPIdefinitions)
    adjustMainWord(`${_currentAPIdefinitions[0]}`, 'Multiple')
// create button w/label
        for (let i = 0; i < 4; i++) {
        let button = document.createElement('button')
        button.innerText = newArray[i]
        button.addEventListener('click', (e) => {
            console.log('clicked')
        })
        listContainer.appendChild(button)
    }

}