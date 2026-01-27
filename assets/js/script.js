let btns = document.querySelectorAll('.btn-group .btn');

for (let btn of btns) {
    btn.addEventListener('click', function () {

        if (this.getAttribute("data-action") === "start") {
            measureSpeed(start);
        } else {
            let typingAction = this.getAttribute("data-action");
            measureSpeed(typingAction);
        }
    });
};


function measureSpeed(action) {
    const typingArea = document.getElementById('typingArea');
    const textToType = document.getElementById('textToType').innerText;

    if (action === 'start') {
        typingArea.focus()
        returnResults(action);
     }
    else if (action === 'stop') { returnResults(action); }
    else if (action === 'retry') {
        returnResults(action)
        typingArea.value = '';
        typingArea.focus();
    }
}
// Global variable to store start time AI Suggestion

// and end time AI suggestion


// set text to type content N.B. new to me - with async function
async function setTextToType() {
    const textToTypeElement = document.getElementById('textToType');
    let levelText = document.getElementById('textlevel').value;
    let sentences = 0;
    if (levelText === 'easy') {
        sentences = 5;
}
    else if (levelText === 'medium') {
        sentences = 10;
    }
    else if (levelText === 'hard') {
        sentences = 15;
    }
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/loremipsum?sentences=${sentences}`);
        const data = await response.json();
        textToTypeElement.value = data.text;
    } catch (error) {
        console.error('Error fetching Lorem Ipsum:', error);
        textToTypeElement.value = 'Error loading text. Please try again.';
    }
}
// 
// Function to calculate and return results - needs to count the letters typed, monitor the time taken, and calculate WPM
function returnResults() {
    if (action === 'start'|| action === 'retry') {
        typingArea.value = '';
        startTime = new Date().getTime();
    } else if (action === 'stop') {
    

    let typedText = typingArea.value;
    let endTime = new Date().getTime();
    let timeTaken = (endTime - startTime) / 1000 / 60; // time in minutes}
    let wordsTyped = typedText.split(' ').length;
    let wpm = Math.round(wordsTyped / timeTaken);   
    }}
