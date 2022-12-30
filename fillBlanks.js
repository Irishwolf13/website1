// Global Variables needed for hint word dashes
let gameType = ``
let wordHints = {};
let hintLetters = ''

function createBlanksButton() {
    const getNewWord = document.createElement('button')
    getNewWord.innerHTML = 'Fill in the Blanks'
    getNewWord.addEventListener('click', () => {
        removeElementsFromDOM(gameInput) // Clears DOM
        setPoints(numberOfPoints)
        adjustMainWord(currrentWord, 'Fill in the Blanks')
        setHTMLforFillInBlanks()
        getWordFillInBlanks(currrentWord)
        let myhint = document.querySelector('.hint')
        myhint.innerHTML = "Click on a Box to get a hint!"
    })
    newWordButtonHolder.appendChild(getNewWord)
}
createBlanksButton()

// This is for fill in the blank gamestyle
function getWordFillInBlanks(myWord) {
    removeElementsFromDOM(listContainer) // Clears DOM for the following appends
    Object.keys(_APIsynonyms).forEach(mySynonym => {
        let button = document.createElement('button')
        button.id = `${mySynonym}`;
        wordHints[mySynonym] = 1;
        button.classList.add('list-Item','notFound')
        button.innerHTML = '????'
        button.addEventListener('click', (e) => {
            hintButtonClicked(e, mySynonym)
        })
        // Appened the whole deal to the DOM
        listContainer.appendChild(button)
    })
    // Sets up next word
    setUpNewWord()
};

function setHTMLforFillInBlanks() {
    listContainer.classList.add('synonym-List')
    listContainer.classList.remove('synonym-List-Multiple')
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
    gameInput.appendChild(form)
    gameInput.appendChild(p)
}

function foundWord(e) {
    //console.log(wordHints)
    let myLowerCase = (e.target.name.value).toLowerCase()
    if (wordHints[myLowerCase]) {
        let myDiv = document.querySelector(`#${myLowerCase}`)
        myDiv.classList.remove('notFound')
        myDiv.classList.add('found')
        myDiv.innerHTML = (myLowerCase).toUpperCase();
        wordHints[myLowerCase] = (myLowerCase.length +1);
        numberOfPoints += 100
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

// function dealWithElements(element, myArray) {
//     element.meanings.forEach(myMeanings => {
//         if (myMeanings.synonyms.length > 0) {
//             myMeanings.synonyms.forEach(mySynonym => { 
//                 if (!mySynonym.includes(" ")) { // Skip words with spaces
//                     if (myArray[mySynonym] === undefined) {  // Word hasn't already been added.
//                         myArray[mySynonym] = true;

//                         let button = document.createElement('button')
//                         button.id = `${mySynonym}`;
//                         wordHints[mySynonym] = 1;
//                         button.classList.add('list-Item','notFound')
//                         button.innerHTML = '????'
//                         button.addEventListener('click', (e) => {
//                             hintButtonClicked(e, mySynonym)
//                         })
//                         // Appened the whole deal to the DOM
//                         listContainer.appendChild(button)
//                     }
//                 } 
//             })
//         }
//     })
// }