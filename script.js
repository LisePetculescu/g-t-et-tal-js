window.addEventListener("load", start);

let secret;

const resultList = document.querySelector("#guesses");

function start() {
  console.log("JS kører!");

  createRandomNumber();
  document.querySelector("#guess").addEventListener("submit", getGuess);
}

function createRandomNumber() {
  secret = Math.floor(Math.random() * 100);

  console.log("the secret number is: " + secret);

  return secret;
}

function getGuess(event) {
  event.preventDefault();

  const form = event.target;

  const guess = form.guess.valueAsNumber;
  console.log("The guess is " + guess);

  const comp = compareNumbers(guess, secret);

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

function compareNumbers(guess, secret) {
  // -1 --> for lavt
  // 0 --> korrekt
  // 1 --> for højt

  // if (guess > secret) return 1
  // if (guess < secret) return -1
  // if (guess == secret) return 0

  return guess - secret;
}

function outputAnswer(message) {
  resultList.insertAdjacentHTML("afterbegin", `<li>${message}</li>`);
}
