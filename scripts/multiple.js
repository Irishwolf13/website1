function getWordMultipleChoice(myWord) {
    audioButton.style.visibility = 'hidden'
    removeElementsFromDOM(gameInput)
    removeElementsFromDOM(listContainer)
    setPoints(numberOfPoints)
    listContainer.classList.remove('synonym-List')
    listContainer.classList.add('synonym-List-Multiple')
    // Sets up next word
    setUpNewWord()
    let newArray = []

    for (let i = 0; i < _multipleCount; i++) {
        let largeNumber = Math.floor(Math.random() * (myArrayOfWords.length - 1))
        let largeWord = myArrayOfWords[largeNumber]
        while (largeWord === myWord) {
            largeNumber = Math.floor(Math.random() * (myArrayOfWords.length - 1))
            largeWord = myArrayOfWords[largeNumber]
        }
        newArray[i] = largeWord
    }
    let myNumber = Math.floor(Math.random() * newArray.length)
    newArray[myNumber] = myWord

    adjustMainWord(`${_currentAPIdefinitions[0]}`, 'Definition')
        for (let i = 0; i < _multipleCount; i++) {
        let button = document.createElement('button')
        button.className = "button-definitions"
        button.innerText = newArray[i]
        button.id = newArray[i]
        button.addEventListener('click', (e) => {
           if (e.target.innerText === myWord) {
            numberOfPoints = numberOfPoints + 100
            setPoints(numberOfPoints)
            e.target.style.background = "palegreen"
            myWord = ''
            setTimeout(function(){
                getWordMultipleChoice(currentWord)
              }, 250);
           } else {
            if (myWord !== '') {
                let clickedButton = document.getElementById(myWord)
                myWord = ''
                e.target.style.background = "salmon"
                setTimeout(function(){
                    e.target.style.background = "white";
                    clickedButton.style.background = "palegreen"
                  }, 500);
                }
            }
        })
        listContainer.appendChild(button)
    }
    setNavButtons()
}