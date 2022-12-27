let currrentWord = 'frank'

const remoteUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/"

function getRemoteWord(myWord) {
    fetch(`${remoteUrl}${myWord}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .then(response => response.json()) 
    .then(myWord => console.log(myWord))
}

function getWordList() {
    const fs = require('fs')
    const rawData = fs.readFileSync("english.txt", 'utf-8')
    let dataArray = rawData.split("\n");  
    currrentWord = dataArray[13285]
}

//getWordList();
getRemoteWord(currrentWord);