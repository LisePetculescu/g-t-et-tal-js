window.addEventListener("load", start);

let guess;
let lastGuess;
let attempts = 0;
let showAttempts;
const resultList = document.querySelector("#guesses");
let startGameButton;

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

  if (comp < 0) {
    outputAnswer(`Du gættede på ${guess} - Det var for lavt`);
  }
  if (comp > 0) {
    outputAnswer(`Du gættede på ${guess} - Det var for højt`);
  }
  if (comp == 0) {
    outputAnswer(`Du gættede på ${guess} - Det er RIGTIGT! 😁`);
  }
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
