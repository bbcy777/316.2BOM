const app = document.getElementById("app");
const guessContainer = document.getElementById("guesses");

const table = app.appendChild(document.createElement("table"));

for (let i = 0; i < 10; i++) {
  const tr = table.appendChild(document.createElement("tr"));
  for (let j = 1; j <= 10; j++) {
    const td = tr.appendChild(document.createElement("td"));
    td.setAttribute("id", "guess" + (i * 10 + j));
    td.textContent = i * 10 + j;
  }
}

const ans = Math.round(Math.random() * 100);
let count = 10;
guessContainer.textContent = count;

let guess;
setTimeout(() => {
  guess = Number(prompt("Guess a number between 1 and 100!"));
  check();
}, 500);

function check() {
  if (guess && guess <= 100 && guess >= 1 && count > 0 && guess !== ans) {
    const op = guess < ans ? "higher" : "lower";
    changeBG(guess, op);
    setTimeout(next, 500);
  } else {
    if (guess === ans) {
      changeBG(guess, null);
      alert("Nice job! You guessed correctly!");
    } else {
      alert(`The answer was ${ans}.`);
    }
  }
}

function next() {
  const op = guess < ans ? "higher" : "lower";
  guess = Number(
    prompt(`Try again, it's ${op} than ${guess}.
  You have ${count} guesses left!`)
  );

  count--;
  guessContainer.textContent = count;
  check();
}

function changeBG(num, op) {
  if (op === "higher") {
    for (let i = 1; i <= num; i++) {
      document.getElementById("guess" + i).style.backgroundColor = "red";
    }
  } else if (op === "lower") {
    for (let i = 100; i >= num; i--) {
      document.getElementById("guess" + i).style.backgroundColor = "red";
    }
  } else {
    document.getElementById("guess" + num).style.backgroundColor = "limegreen";
  }
}
