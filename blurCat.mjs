import axios from "axios";

const API_KEY =
  "live_JMdj3gAkMUtsP3c8U9AKTwDUW86Qfalm0Eyrfy7IAGctoAhp1UjvmMbrWMuinQKq";
axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;

const img = document.getElementById("image");

(async function play() {
  const res = await axios("/images/search?has_breeds=1");
  const cat = await res.data[0];
  const name = cat.breeds[0].name;
  const alt_name = cat.breeds[0].alt_names;
  const names = name.toUpperCase + " " + alt_name.toUpperCase;

  img.setAttribute("src", cat.url);
  img.style.filter = `blur(50px)`;

  img.addEventListener("load", () => setTimeout(start, 3000));

  function start() {
    let count = 0;
    let guess = prompt("What breed of cat is this?");

    if (!guess) return;

    function eventLoopConsiderations() {
      if (
        count < 10 &&
        (!guess || guess.length < 3 || !names.indexOf(guess.toUpperCase))
      ) {
        guess = prompt(`Try again, it's not ${guess}.
  You have ${10 - count} guesses left!`);
        count++;
        img.style.filter = `blur(${50 - 5 * count}px)`;

        if (guess !== "") setTimeout(eventLoopConsiderations, 500);
      } else {
        if (guess.length >= 3 && names.indexOf(guess.toUpperCase)) {
          alert(
            `Nice job! You guessed correctly! The answer was ${name}${
              alt_name ? ", also known as " + alt_name : ""
            }.`
          );
        } else {
          alert(
            `Not quite. The answer was ${name}${
              alt_name ? ", also known as " + alt_name : ""
            }.`
          );
        }
      }
    }

    eventLoopConsiderations();
  }
})();
