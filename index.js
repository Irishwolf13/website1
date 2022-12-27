document.addEventListener('DOMContentLoaded', async () => {
    
    let currrentWord = 'Cold'
    const remoteUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

    // Gather up the Troops
    const listContainer = document.querySelector('.synonym-List')
    const titleBar = document.querySelector('.titlebar')

    function getRemoteWord(myWord) {
        fetch(`${remoteUrl}${myWord}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(response => response.json()) 
        .then(myWord => {
            //console.log(myWord)
            myWord.forEach(element => {
                element.meanings.forEach(element2 => {
                    if (element2.synonyms.length > 0) {
                        element2.synonyms.forEach(myItem => {
                            let li = document.createElement('li')
                            li.innerHTML = myItem
                            li.classList.add('list-Item')
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
    //getWordList();
    getRemoteWord(currrentWord);
})