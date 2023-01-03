// Global Variables needed for hint word dashes
let gameType = ``
let wordHints = {}
let hintLetters = ''
let numberFound = 0

// This is for Synonym gamestyle
function createSynonymGame(myWord) {
    removeElementsFromDOM(listContainer)    // Clears DOM for the following appends
    removeElementsFromDOM(gameInput)        // Clears DOM for the following appends
    setPoints(numberOfPoints)  
    setDOMforFillInBlanks()
    listContainer.classList.remove('synonym-List-Multiple')
    listContainer.classList.add('synonym-List')

    Object.keys(_APIsynonyms).forEach(mySynonym => {
        let button = document.createElement('button')
        button.id = `${mySynonym}`;
        wordHints[mySynonym] = 1;
        button.classList.add('list-Item','notFound')
        button.innerHTML = '????'
        _APInumberOfSynonyms ++;
        button.addEventListener('click', (e) => {
            hintButtonClicked(e, mySynonym)
        })
        const hintText = document.querySelector('.hint')
        if (_currentDifficulty === 'easy') {
            hintText.innerHTML = "Each time you click on a box below you will get see the next letter in that word."
            // This code was causing too many Fetch requests.
            // button.addEventListener('mouseenter', (e) => {
            //     hintText.innerHTML = _currentAPIsynonyms[`${mySynonym}`]
            // })
            // button.addEventListener('mouseleave', () => {
            //     hintText.innerHTML = ""
            // })
        }
        if (_currentDifficulty === 'medium') {
            hintText.innerHTML = "Each time you click on a box below you will get see the next letter in that word.  Using this hint, will cut the value in half."
        }
        if (_currentDifficulty === 'hard') {
            button.style.visibility = 'hidden'
        }
        listContainer.appendChild(button)  
    })
    adjustMainWord(currentWord, `${numberFound} of ${_APInumberOfSynonyms} synonyms`) 
    setNavButtons()
    // Sets up next word
    setUpNewWord()
};

function setDOMforFillInBlanks() {
    listContainer.classList.add('synonym-List')
    listContainer.classList.remove('synonym-List-Multiple')
    let form = document.createElement("form")
    let input = document.createElement("input")
    input.setAttribute("type", "text")
    input.setAttribute("name", "name")
    input.setAttribute("value", "")
    input.setAttribute("placeholder", "Guess Synonym here")
    input.classList.add("input-text")
    form.appendChild(input)

    let submit = document.createElement("input")
    submit.setAttribute("type", "submit")
    submit.setAttribute("name", "submit")
    submit.setAttribute("value", "submit")
    submit.classList.add("submit")
    form.appendChild(submit)
    
    form.classList.add("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        foundWord(e)
        e.target.reset()
    })
    let p = document.createElement("p")
    p.classList.add("hint")
    gameInput.appendChild(form)
    gameInput.appendChild(p)
}

function foundWord(e) {
    let myLowerCase = (e.target.name.value).toLowerCase()
    if (wordHints[myLowerCase]) {
        let myDiv = document.querySelector(`#${myLowerCase}`)
        myDiv.classList.remove('notFound')
        myDiv.classList.add('found')
        myDiv.style.visibility = 'visible'
        myDiv.innerHTML = (myLowerCase).toUpperCase();
        if (wordHints[myLowerCase] == 1) {
            numberOfPoints += 100
            numberFound ++
        }else if(wordHints[myLowerCase] < myLowerCase.length) {
            numberFound ++
            if (_currentDifficulty === 'easy') {
                numberOfPoints += 100
            }else {
                numberOfPoints += 50
            }
        }
        gameDifficulty.innerHTML = `${numberFound} of ${_currentNumberOfSynonyms} Synonyms`
        wordHints[myLowerCase] = (myLowerCase.length +1);
        setPoints(numberOfPoints)
    }else {
        e.target.name.style.backgroundColor = "red"
        setTimeout(function(){
            e.target.name.style.backgroundColor = "white";
          }, 500);
    }
    
}
function hintButtonClicked(e, mySynonym) {
    hintLetters = (e.target.id.slice(0, wordHints[e.target.id]).toUpperCase())
    // Add Dashes for the number of letters
    for (let i = 0; i <= mySynonym.length -(wordHints[e.target.id]+1); i++) {
        hintLetters += ' -'
    }
    if (wordHints[e.target.id] == mySynonym.length) {
        e.target.classList.remove('notFound')
        e.target.classList.add('found')
        numberFound ++
        gameDifficulty.innerHTML = `${numberFound} of ${_currentNumberOfSynonyms} Synonyms`
    }
    wordHints[e.target.id] ++;
    // Sets Text in the Box to hangman version of the word
    e.target.innerHTML = hintLetters
}