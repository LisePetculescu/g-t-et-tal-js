window.addEventListener("load", start);

let guess;
const resultList = document.querySelector("#guesses");
let lastGuess;
let lastReponse;
let lastGuessText;

function start() {
  console.log("JS kører!");

  document.querySelector("#start-game-btn").addEventListener("click", startGame);
}

function startGame(event) {
  event.preventDefault();
  console.log("Spillet er i gang!");

  resultList.innerHTML = "";

  makeNewGuess();

  document.querySelector("#guess-higher-btn").addEventListener("click", getResponse);
  document.querySelector("#guess-lower-btn").addEventListener("click", getResponse);
  document.querySelector("#correct-btn").addEventListener("click", getResponse);
}

function getResponse(event) {
  event.preventDefault();

  const btn = event.target.id;
  console.log("Button pressed: " + btn);

  if (btn === "guess-higher-btn") {
    guessHigher();
  }
  if (btn === "guess-lower-btn") {
    guessLower();
  }
  if (btn === "correct-btn") {
    gameWon();
  }
}

function guessHigher() {
  console.log("Guess higher pls");

  lastGuessText = resultList.querySelector("li:first-child");

  if (lastGuessText) {
    lastGuessText.textContent = `Jeg gættede på ${lastGuess} - Jeg gættede for lavt 🤥`;
    makeNewGuess();
  } else {
    console.error("hihi somethinhg went wrong when you pressed 'gæt højere' ");
    startGame();
  }
}

function guessLower() {
  console.log("Guess lower pls");

  lastGuessText = resultList.querySelector("li:first-child");

  if (lastGuessText) {
    lastGuessText.textContent = `Jeg gættede på ${lastGuess} - Jeg gættede for højt 🤯`;
    makeNewGuess();
  } else {
    console.error("hihi somethinhg went wrong when you pressed 'gæt lavere' ");
    startGame();
  }
}

function gameWon() {
  console.log("Winner! - Let's start again");

  lastGuessText = resultList.querySelector("li:first-child");

  if (lastGuessText) {
    lastGuessText.textContent = `Jeg gættede på ${lastGuess} - Jeg gættede korrekt! 🤩🤩`;
  } else {
    console.error("hihi somethinhg went wrong when you pressed 'Korrekt' ");
  }
}

function outputAnswer(message) {
  resultList.insertAdjacentHTML("afterbegin", `<li>${message}</li>`);
}

function makeNewGuess() {
  guess = Math.floor(Math.random() * 100 + 1);
  lastGuess = guess;
  outputAnswer(`Jeg gætter på ${guess}`);
}
