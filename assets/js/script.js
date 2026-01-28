// Sample texts organized by difficulty level
const sampleTexts = {
    1: [ // Easy
        "The quick brown fox jumps over the lazy dog.",
        "Hello world. This is a typing test.",
        "Practice makes perfect. Keep typing steadily."
    ],
    2: [ // Medium
        "JavaScript is a versatile programming language used for web development and creates interactive user experiences.",
        "The ability to type quickly and accurately is an important skill in today's digital world.",
        "TypeScript extends JavaScript by adding static type definitions for better code quality and developer experience."
    ],
    3: [ // Hard
        "Algorithmic complexity analysis involves understanding Big O notation, time complexity, and space complexity to optimize software performance.",
        "Asynchronous programming with callbacks, promises, and async/await syntax enables non-blocking operations in JavaScript applications.",
        "Implementing design patterns such as singleton, factory, observer, and strategy patterns improves code maintainability and scalability."
    ]
};

// Get the difficulty selector and sample text display
const difficultySelect = document.getElementById('inputGroupSelect01');
const sampleTextarea = document.getElementById('sample-text');

// Store the original text for comparison
let originalSampleText = '';

// Function to get a random text from the selected difficulty level
function getRandomSampleText(difficulty) {
    const texts = sampleTexts[difficulty];
    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
}

// Function to update sample text when difficulty changes
function updateSampleText() {
    const selectedDifficulty = difficultySelect.value;
    const newText = getRandomSampleText(selectedDifficulty);
    originalSampleText = newText;
    sampleTextarea.textContent = newText;
}

// Function to highlight words in sample text based on user input
function highlightWords() {
    const typedText = typingArea.value;
    
    const sampleWords = getWords(originalSampleText);
    const typedWords = getWords(typedText);
    
    // Create highlighted HTML
    let highlightedHTML = '';
    
    sampleWords.forEach((word, index) => {
        if (index < typedWords.length) {
            // User has typed this word position
            if (word === typedWords[index]) {
                // Correct word
                highlightedHTML += `<span class="word-correct">${word}</span> `;
            } else {
                // Incorrect word
                highlightedHTML += `<span class="word-incorrect">${word}</span> `;
            }
        } else {
            // Word not yet typed
            highlightedHTML += word + ' ';
        }
    });
    
    // Update sample text display with highlighted words
    sampleTextarea.innerHTML = highlightedHTML.trim();
}

// Timer variables
let startTime = 0;
let endTime = 0;
let timerInterval = null;

// Get button and result elements
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const retryButton = document.getElementById('retry');
const typingArea = document.getElementById('typingArea');
const timeDisplay = document.querySelector('.time');
const levelDisplay = document.querySelector('.level');

// Function to start the typing test
function startTest() {
    // Record start time
    startTime = Date.now();
    
    // Enable typing area and clear it
    typingArea.disabled = false;
    typingArea.value = '';
    typingArea.focus();
    
    // Update button states
    startButton.disabled = true;
    stopButton.disabled = false;
    
    // Start live timer display
    timerInterval = setInterval(updateLiveTimer, 100);
    
    // Display current difficulty level
    const difficulty = difficultySelect.value;
    const difficultyText = difficultySelect.options[difficultySelect.selectedIndex].text;
    levelDisplay.textContent = difficultyText;
    
    // Add real-time word checking
    typingArea.addEventListener('input', highlightWords);
}

// Function to update the live timer while typing
function updateLiveTimer() {
    const currentTime = Date.now();
    const elapsedSeconds = ((currentTime - startTime) / 1000).toFixed(2);
    timeDisplay.textContent = elapsedSeconds;
}

// Get WPM result element
const wpmResultDisplay = document.querySelector('.wpmResult');

// Function to split text into words
function getWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0);
}

// Function to calculate correctly typed words
function calculateCorrectWords(sampleText, typedText) {
    const sampleWords = getWords(sampleText);
    const typedWords = getWords(typedText);
    
    let correctWords = 0;
    
    // Count words that match exactly
    for (let i = 0; i < Math.min(sampleWords.length, typedWords.length); i++) {
        if (sampleWords[i] === typedWords[i]) {
            correctWords++;
        }
    }
    
    return correctWords;
}

// Function to calculate WPM (Words Per Minute)
function calculateWPM(correctWords, timeInSeconds) {
    if (timeInSeconds === 0) return 0;
    
    const minutes = timeInSeconds / 60;
    const wpm = correctWords / minutes;
    
    return Math.round(wpm);
}

// Function to display WPM results
function displayWPMResults() {
    const typedText = typingArea.value;
    const timeInSeconds = parseFloat(timeDisplay.textContent);
    
    // Calculate correct words using original sample text
    const correctWords = calculateCorrectWords(originalSampleText, typedText);
    
    // Calculate WPM
    const wpm = calculateWPM(correctWords, timeInSeconds);
    
    // Display WPM result
    wpmResultDisplay.textContent = wpm;
}

// Function to stop the typing test
function stopTest() {
    // Record end time
    endTime = Date.now();
    
    // Calculate elapsed time in seconds
    const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);
    
    // Display the final time
    timeDisplay.textContent = elapsedTime;
    
    // Stop the live timer
    clearInterval(timerInterval);
    
    // Disable typing area
    typingArea.disabled = true;
    
    // Display WPM results
    displayWPMResults();
    
    // Remove input event listener
    typingArea.removeEventListener('input', highlightWords);
    
    // Update button states
    stopButton.disabled = true;
    retryButton.disabled = false;
}

// Function to retry the test
function retryTest() {
    // Reset timer variables
    startTime = 0;
    endTime = 0;
    clearInterval(timerInterval);
    
    // Reset displays
    timeDisplay.textContent = '';
    levelDisplay.textContent = '';
    wpmResultDisplay.textContent = '';
    
    // Clear typing area
    typingArea.value = '';
    typingArea.disabled = true;
    
    // Remove input event listener if it exists
    typingArea.removeEventListener('input', highlightWords);
    
    // Reset button states
    startButton.disabled = false;
    stopButton.disabled = true;
    retryButton.disabled = false;
    
    // Get new sample text
    updateSampleText();
}

// Function to initialize the test on page load
function initializeTest() {
    // Disable typing area initially
    typingArea.disabled = true;
    stopButton.disabled = true;
    
    // Clear results
    timeDisplay.textContent = '';
    levelDisplay.textContent = '';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateSampleText();
    initializeTest();
});

// Add event listeners to buttons
startButton.addEventListener('click', startTest);
stopButton.addEventListener('click', stopTest);
retryButton.addEventListener('click', retryTest);

// Event listener for difficulty selection change
difficultySelect.addEventListener('change', updateSampleText);

