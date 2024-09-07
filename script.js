window.addEventListener("load", start);

let guess;
let lastGuess;
let attempts = 0;
let showAttempts;
const resultList = document.querySelector("#guesses");
let startGameButton;
let min = 1;
let max = 100;

function start() {
  console.log("JS kører!");

  showAttempts = document.querySelector("#attempts-display");

  startGameButton = document.querySelector("#start-game-btn");
  startGameButton.addEventListener("click", startGame);
}

function startGame(event) {
  event.preventDefault();
  console.log("Spillet er i gang!");

  startGameButton.textContent = "Start spillet";

  resultList.innerHTML = "";
  attempts = 0;
  min = 1;
  max = 100;
  updateAttemps();

  makeNewGuess(); // Make the initial guess

  removeEventListeners();

  document.querySelector("#guess-higher-btn").addEventListener("click", guessHigher);
  document.querySelector("#guess-lower-btn").addEventListener("click", guessLower);
  document.querySelector("#correct-btn").addEventListener("click", gameWon);
}

function getLastGuessElement() {
  return resultList.querySelector("li:first-child");
}

function updateLastGuess(message) {
  const lastGuessElement = getLastGuessElement();

  if (lastGuessElement) {
    lastGuessElement.textContent = message;
  } else {
    console.error("Error happened when trying to update last guess");
    startGame();
  }
}

function guessHigher() {
  console.log("Guess higher pls");

  updateLastGuess(`Jeg gættede på ${lastGuess} - Jeg gættede for lavt 🤥`);
  min = guess + 1; 
  makeNewGuess();
}

function guessLower() {
  console.log("Guess lower pls");

  updateLastGuess(`Jeg gættede på ${lastGuess} - Jeg gættede for højt 🤯`);
  max = guess - 1;
  makeNewGuess();
}

function gameWon() {
  console.log("Winner! - Let's start again");

  updateLastGuess(`Jeg gættede på ${lastGuess} - Jeg gættede korrekt! 🤩🤩`);

  removeEventListeners();

  startGameButton.textContent = "Start spillet forfra";
}

function outputAnswer(message) {
  resultList.insertAdjacentHTML("afterbegin", `<li>${message}</li>`);
}

function makeNewGuess() {
  if (min <= max) {
    guess = Math.floor((max + min) / 2);
    lastGuess = guess;
    attempts++;
    updateAttemps();
    outputAnswer(`Jeg gætter på ${guess}`);
  } else {
    updateLastGuess(`Jeg gættede på ${lastGuess} - Der er ikke flere gæt 😶`);
    startGameButton.textContent = "Start spillet forfra";
    removeEventListeners();
    console.error("The search range is invalid.");
  }
}

function updateAttemps() {
  showAttempts.textContent = `Forsøg: ${attempts}`;
}

function removeEventListeners() {
  document.querySelector("#guess-higher-btn").removeEventListener("click", guessHigher);
  document.querySelector("#guess-lower-btn").removeEventListener("click", guessLower);
  document.querySelector("#correct-btn").removeEventListener("click", gameWon);
}
