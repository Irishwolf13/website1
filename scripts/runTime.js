startButton.addEventListener('click', () => {
    // Going to need to check Options then create an If/Else statement
    createBlanksButton()
    startButton.remove(); // This is only a placeholder so it deletes itself.
})
optionStartButton.addEventListener('click', () => {
    hideShowOptions()
    console.log('optionStartButton clicked')
})