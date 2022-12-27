document.addEventListener('DOMContentLoaded', async () => {
    
    let currrentWord = 'Cold'
    const remoteUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"
    let gameType = `Fill in the Blanks`
    let gameScore = `100`;

    // Gather up the Troops
    const listContainer = document.querySelector('.synonym-List')
    const titleBar = document.querySelector('.titlebar')
    const gameTypeTitle = document.querySelector('.difficulty')
    const gamePointScore = document.querySelector('.score')

    function getWordFillInBlanks(myWord) {
        fetch(`${remoteUrl}${myWord}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(response => response.json()) 
        .then(myWord => {
            myWord.forEach(element => {
                element.meanings.forEach(myMeanings => {
                    if (myMeanings.synonyms.length > 0) {
                        myMeanings.synonyms.forEach(mySynonym => {
                            let li = document.createElement('li')
                            li.innerHTML = '????'
                            li.classList.add('list-Item','notFound')
                            li.id = `anser ${mySynonym}`;
                            let span = document.createElement('span')
                            span.classList.add('toolTip')
                            span.innerHTML = 'Click for hint!'
                            li.appendChild(span)
                            listContainer.appendChild(li)
                        })
                    }
                })
            })
            
            // This should eventually get the word from the dictionary and make it the current word
            let newWord = currrentWord
            adjustMainWord(newWord)
        })
    };

    function adjustMainWord() {
        titleBar.innerHTML = currrentWord
    }

    function setGameType() {
        gameTypeTitle.innerHTML = gameType;
    }

    function setPoints() {
        gamePointScore.innerHTML = gameScore;
    }
    //getWordList();
    setGameType();
    setPoints();
    getWordFillInBlanks(currrentWord);
})