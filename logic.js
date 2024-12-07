
let levels = [
    {
        word: "programming",
        clue: "A concept in computer science"
    },
    {
        word: "algorithm",
        clue: "A set of instructions to solve a problem"
    },
    {
        word: "variable",
        clue: "A container to store a value"
    },
    {
        word: "function",
        clue: "A block of code that performs a task"
    },
    {
        word: "objectoriented",
        clue: "A programming paradigm that uses objects and classes"
    },
    {
        word: "typescript",
        clue: "A superset of JavaScript that adds static typing"
    },
    {
        word: "react",
        clue: "A JavaScript library for building user interfaces"
    },
    {
        word: "angular",
        clue: "A JavaScript framework for building single-page applications"
    },
    {
        word: "vue",
        clue: "A progressive JavaScript framework for building user interfaces"
    },
    {
        word: "nodejs",
        clue: "An open-source, cross-platform runtime environment for executing JavaScript code"
    },
    {
        word: "mongodb",
        clue: "A document-oriented database with a flexible schema"
    },
    {
        word: "javascript",
        clue: "A high-level, interpreted programming language"
    }
        // Add more levels here...

];

    // HTML elements
    let wordElement = document.getElementById("word");
    let livesElement = document.getElementById("lives");
    let scoreElement = document.getElementById("score");
    let clueElement = document.getElementById("clue");
    let guessElement = document.getElementById("guess");
    let wrongLettersElement = document.getElementById("wrong-letters");

    let guessedLetters = [];
    let correctLetters = [];

    let word;
    let lives;
    let score =0;
    let clue;
    
    let currentLevel = 0;
    // Initialize game
    updateGame();
    function updateGame() {

        word = levels[currentLevel].word;
        lives = word.length;
        score;
        clue = levels[currentLevel].clue;
   

    wordElement.textContent = "_ ".repeat(word.length);
    livesElement.textContent = `Lives: ${lives}`;
    scoreElement.textContent = `Score: ${score}`;
    clueElement.textContent = `Clue: ${clue}`;
    }

     // Add event listener to guess input field
     guessElement.addEventListener("input", (e) => {
        guessLetter(e.target.value.toLowerCase());
        e.target.value = "";
    });

    // Function to handle user input
    function guessLetter(letter) {
        // Check if letter is already guessed
        if (guessedLetters.includes(letter)) {
            Toastify({
                text: "You already guessed this letter!",
                duration: 3000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #FF0000, #ffc93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
            return;
        }
    
        guessedLetters.push(letter);
    
        // Check if letter is in the word
        if (word.includes(letter)) {
            // Add all occurrences of the letter to correct letters array
            for (let i = 0; i < word.length; i++) {
                if (word[i] === letter) {
                    correctLetters[i] = letter;
                }
            }
            // Update word display
            updateWordDisplay();
        
        } else {
            // Subtract life and add letter to wrong letters array
            lives--;
            wrongLettersElement.textContent = `Wrong letters: ${guessedLetters.filter(l => !word.includes(l)).join(", ")}`;
        }
    
        // Update lives display
        livesElement.textContent = `Lives: ${lives}`;
    
        // Check if user won or lost
        if (lives === 0) {
            setTimeout(() => { 
            Toastify({
                text: "Sorry, you ran out of lives",
                duration: 1400,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #FF0000, #ffc93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
            
            YouLost();
            }, 100);
        } 
    }

    function updateWordDisplay() {
        wordElement.textContent = word.split("").map((char, index) => {
            let correctChar = correctLetters[index] || "_";
            return correctChar;
        }).join(" ");
        console.log("Updated word display:", wordElement.textContent); // Debug log
        // Check if user won
        if (!wordElement.textContent.includes("_")) {
            setTimeout(() => {
            
            Toastify({
                text: "Congratulations, you won!",
                duration: 1400,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right, #03d09b, #96d93d)",
                },
                onClick: function(){} // Callback after click
              }).showToast();
            YouWon();
            }, 150);
        }
    }
    // Function to display "You Won!" message
    function YouWon() {
        currentLevel++;
        score += 1;
        console.log(score)
         guessedLetters = [];
         correctLetters = [];
         wrongLettersElement.textContent = `Wrong letters: `;

        // Check if you have reached the end of the levels array
    if (currentLevel >= levels.length) {
        currentLevel = 0; // Loop back to the first level
    }

        updateGame();
    }
    function YouLost() {
        currentLevel++;
         guessedLetters = [];
         correctLetters = [];
         wrongLettersElement.textContent = `Wrong letters: `;

        updateGame();
    }
