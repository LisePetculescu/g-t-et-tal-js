window.addEventListener("load", start);

let guess;
let lastGuess;
let attempts = 0;
let showAttempts;
let showAttemptsMessage;
const resultList = document.querySelector("#guesses");
let startGameButton;
let min = 1;
let max = 100;

function start() {
  console.log("JS kører!");

  showAttempts = document.querySelector("#attempts-display");
  showAttemptsMessage = document.querySelector("#attempts-message");

  startGameButton = document.querySelector("#start-game-btn");
  startGameButton.addEventListener("click", startGame);
}

function startGame(event) {
  event.preventDefault();
  console.log("Spillet er i gang!");

  startGameButton.textContent = "Start spillet";
  showAttemptsMessage.textContent = "";

  resultList.innerHTML = "";

  attempts = 0;
  min = 1;
  max = 100;
  updateAttemps();

  makeNewGuess();

  addEventListeners()



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
  const comment = getCommentForAttempts(attempts);

  updateLastGuess(`Jeg gættede på ${lastGuess} - Jeg gættede korrekt! 🤩🤩`);

  showAttemptsMessage.textContent = `Antal forsøg: ${attempts} - ${comment}`;

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

function getCommentForAttempts(attempts) {
  if (attempts === 3) {
    return "Fantastisk! 🎉";
  } else if (attempts === 5) {
    return "Godt gået! 👍";
  } else if (attempts === 7) {
    return "Meh... 😐";
  } else if (attempts > 7) {
    return "Det kunne have været bedre. 😔";
  } else {
    return "";
  }
}

function removeEventListeners() {
  const guessHigherBtn = document.querySelector("#guess-higher-btn");
  const guessLowerBtn = document.querySelector("#guess-lower-btn");
  const correctBtn = document.querySelector("#correct-btn");

  guessHigherBtn.removeEventListener("click", guessHigher);
  guessLowerBtn.removeEventListener("click", guessLower);
  correctBtn.removeEventListener("click", gameWon);


  guessHigherBtn.classList.add("disabled-button");
  guessLowerBtn.classList.add("disabled-button");
  correctBtn.classList.add("disabled-button");
}

function addEventListeners() {
  const guessHigherBtn = document.querySelector("#guess-higher-btn");
  const guessLowerBtn = document.querySelector("#guess-lower-btn");
  const correctBtn = document.querySelector("#correct-btn");

  guessHigherBtn.addEventListener("click", guessHigher);
  guessLowerBtn.addEventListener("click", guessLower);
  correctBtn.addEventListener("click", gameWon);


  guessHigherBtn.classList.remove("disabled-button");
  guessLowerBtn.classList.remove("disabled-button");
  correctBtn.classList.remove("disabled-button");
}
