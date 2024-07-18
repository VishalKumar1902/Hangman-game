const wordsByCategory = {
  animals: [
    "tiger",
    "lion",
    "cat",
    "dog",
    "zebra",
    "elephant",
    "penguin",
    "giraffe",
    "camel",
  ],
  countries: ["india", "nepal", "japan", "china", "france", "canada"],
  fruits: ["apple", "pear", "orange", "banana", "kiwi"],
};

let chosenWord = "";
let guessedLetters = [];
let wrongGuesses = 0;

//function to start a game

function startGame() {
  // getting the value selected by user
  const categorySelect = document.getElementById("category");
  const selectedCategory = categorySelect.value;

  // getting the whole array of that category
  const words = wordsByCategory[selectedCategory];

  // selecting one random word from the array
  chosenWord = words[Math.floor(Math.random() * words.length)];
  console.log(chosenWord);

  // once word is choosen hide the category section and show game container
  const categorySelection = document.getElementById("category-selection");
  const gameContainer = document.getElementById("game");

  categorySelection.style.display = "none";

  gameContainer.style.display = "block";

  // reset the game
  guessedLetters = [];
  wrongGuesses = 0;
  updateHangmanImage();

  displayWord();
  displayLetters();
  updateGameStatus();
  document.getElementById("restart-button").style.display = "none";
}

function displayWord() {
  // first get the element where we want to show word
  const wordDisplay = document.getElementById("word-display");

  // then functionality to show word
  wordDisplay.innerHTML = chosenWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function displayLetters() {
  // first get the element where you want to append letters
  const lettersButtonsContainer = document.getElementById("letter-buttons");
  lettersButtonsContainer.innerHTML = "";
  // functionality to append letters
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (let letter of alphabet) {
    const alphabetBtn = document.createElement("button");
    alphabetBtn.textContent = letter;
    alphabetBtn.addEventListener("click", () => handleGuess(letter));

    lettersButtonsContainer.appendChild(alphabetBtn);
  }
}

function handleGuess(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);

    if (!chosenWord.includes(letter)) {
      wrongGuesses++;
      updateHangmanImage();
    }
    displayWord();
    updateGameStatus();
    if (isGameOver()) {
      showGameResult();
    }
  }
}

function updateHangmanImage() {
  // get the image tag to change its src according to the wrongGuesses
  const hangmanImg = document.getElementById("hangman-img");

  hangmanImg.src = `images/hangman_${wrongGuesses}.png`;
}
function updateGameStatus() {
  // get the game-status div
  const gameStatus = document.getElementById("game-status");

  gameStatus.textContent = `wrong guesses: ${wrongGuesses}/6`;
}

function isGameOver() {
  return wrongGuesses >= 6 || isGameWon();
}
function isGameWon() {
  return chosenWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
}

function showGameResult() {
  // get the game-status div
  const gameStatus = document.getElementById("game-status");

  if (isGameWon()) {
    gameStatus.textContent = "You won! 🎉";
  } else {
    gameStatus.textContent = `Game over! 😞 The word was: ${chosenWord}`;
  }

  // Disable letter buttons after game ends
  const lettersButtons = document.querySelectorAll("#letter-buttons button");
  lettersButtons.forEach((button) => (button.disabled = true));

  // show restart button
  const restartButton = document.getElementById("restart-button");
  restartButton.style.display = "block";
}

// restart game function
function restartGame() {
  const categorySelection = document.getElementById("category-selection");
  const gameContainer = document.getElementById("game");
  categorySelection.style.display = "block";
  gameContainer.style.display = "none";
}
