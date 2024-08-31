window.addEventListener("load", start);

let guess;
let lastGuess;
let attempts = 0;
let showAttempts;
const resultList = document.querySelector("#guesses");

function start() {
  console.log("JS kører!");

  showAttempts = document.querySelector("#attempts-display");

  document.querySelector("#start-game-btn").addEventListener("click", startGame);
}

function startGame(event) {
  event.preventDefault();
  console.log("Spillet er i gang!");

  resultList.innerHTML = "";
  attempts = 0;
  updateAttemps();

  makeNewGuess();

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
    console.error("error happened when trying to update last guess");
    startGame();
  }
}

function guessHigher() {
  console.log("Guess higher pls");

  updateLastGuess(`Jeg gættede på ${lastGuess} - Jeg gættede for lavt 🤥`);
  makeNewGuess();
}

function guessLower() {
  console.log("Guess lower pls");

  updateLastGuess(`Jeg gættede på ${lastGuess} - Jeg gættede for højt 🤯`);
  makeNewGuess();
}

function gameWon() {
  console.log("Winner! - Let's start again");

  updateLastGuess(`Jeg gættede på ${lastGuess} - Jeg gættede korrekt! 🤩🤩`);

  removeEventListeners();
}

function outputAnswer(message) {
  resultList.insertAdjacentHTML("afterbegin", `<li>${message}</li>`);
}

function makeNewGuess() {
  guess = Math.floor(Math.random() * 100 + 1);
  lastGuess = guess;
  attempts++;
  updateAttemps();
  outputAnswer(`Jeg gætter på ${guess}`);
}

function updateAttemps() {
  showAttempts.textContent = `Forsøg: ${attempts}`
}

function removeEventListeners() {
  document.querySelector("#guess-higher-btn").removeEventListener("click", guessHigher);
  document.querySelector("#guess-lower-btn").removeEventListener("click", guessLower);
  document.querySelector("#correct-btn").removeEventListener("click", gameWon);
}
