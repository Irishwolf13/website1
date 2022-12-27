let currrentWord = 'boring'
const remoteUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

// Gather up the Troops
const listContainer = document.querySelector('.synonim-List')

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
                        listContainer.appendChild(li)
                    })
                    //console.log(element2.synonyms)
                }
            })
        })
    })
};

function getWordList() {
    const fs = require('fs')
    const rawData = fs.readFileSync("english.txt", 'utf-8')
    let dataArray = rawData.split("\n");  
    currrentWord = dataArray[13285]
}

//getWordList();
getRemoteWord(currrentWord);