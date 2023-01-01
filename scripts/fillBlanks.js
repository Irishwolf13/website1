// Global Variables needed for hint word dashes
let gameType = ``
let wordHints = {};
let hintLetters = ''

// This is for fill in the blank gamestyle
function createSynonymGame(myWord) {
    removeElementsFromDOM(listContainer)    // Clears DOM for the following appends
    removeElementsFromDOM(gameInput)        // Clears DOM for the following appends
    setPoints(numberOfPoints)
    adjustMainWord(currentWord, 'Fill in the Blanks')
    setDOMforFillInBlanks()
    let myhint = document.querySelector('.hint')
    myhint.innerHTML = "Hover over box for definitions, Click box for hints"
    listContainer.classList.remove('synonym-List-Multiple')
    listContainer.classList.add('synonym-List')

    Object.keys(_APIsynonyms).forEach(mySynonym => {
        let button = document.createElement('button')
        button.id = `${mySynonym}`;
        wordHints[mySynonym] = 1;
        button.classList.add('list-Item','notFound')
        button.innerHTML = '????'
        button.addEventListener('click', (e) => {
            hintButtonClicked(e, mySynonym)
        })
        button.addEventListener('mouseenter', (e) => {
            // This fetch is to get the definition of the synonym and display it in the 'hint' section
            // *************** Needs a check for a failed request ******************************************
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
        })
        listContainer.appendChild(button)
        button.addEventListener('mouseleave', () => {
            myhint.innerHTML = ""
        })
    })
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
    p.innerHTML = "Click on a Box to get a hint!"
    gameInput.appendChild(form)
    gameInput.appendChild(p)
}

function foundWord(e) {
    let myLowerCase = (e.target.name.value).toLowerCase()
    if (wordHints[myLowerCase]) {
        let myDiv = document.querySelector(`#${myLowerCase}`)
        myDiv.classList.remove('notFound')
        myDiv.classList.add('found')
        myDiv.innerHTML = (myLowerCase).toUpperCase();
        if (wordHints[myLowerCase] == 1) {
            numberOfPoints += 100
        }else if(wordHints[myLowerCase] < myLowerCase.length) {
            numberOfPoints += 50
        }else {
            console.log(wordHints[myLowerCase])
            console.log('my length', myLowerCase.length)
        }
        wordHints[myLowerCase] = (myLowerCase.length +1);
        setPoints(numberOfPoints)
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
    }
    wordHints[e.target.id] ++;
    // Sets Text in the Box to hangman version of the word
    e.target.innerHTML = hintLetters
}