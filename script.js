
const DiceEl = document.querySelector(".dice");
const btnNew = document.getElementById("btn--new");
const btnRoll = document.getElementById("btn--roll");
const btnHold = document.getElementById("btn--hold");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
let scores, currentScore, activePlayer, playing;
const animation = function (btn) {
  if (btn === "roll") {
    btnRoll.classList.add("animation-btn");
    setTimeout(() => {
      btnRoll.classList.remove("animation-btn");
    }, 600);
  } else if (btn === "hold") {
    btnHold.classList.add("animation-btn");
    setTimeout(() => {
      btnHold.classList.remove("animation-btn");
    }, 600);
  } else {
    btnNew.classList.add("animation-btn");
    setTimeout(() => {
      btnNew.classList.remove("animation-btn");
    }, 600);
  }
};
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0El.classList.add("active-player");
  player1El.classList.remove("active-player");
  player0El.classList.remove("winner");
  player1El.classList.remove("winner");
  DiceEl.classList.add("hidden");
  document.querySelector(".score--0").textContent = 0;
  document.querySelector(".score--1").textContent = 0;
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  animation("new");
};
init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`score--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("active-player");
  player1El.classList.toggle("active-player");
  document.getElementById(`score--${activePlayer}`).textContent = currentScore;
};

DiceEl.classList.add("hidden");

btnRoll.addEventListener("click", () => {
  if (playing) {
    animation("roll");
    const randomNUm = Math.trunc(Math.random() * 6) + 1;

    DiceEl.classList.remove("hidden");

    DiceEl.src = `./Images/dice-${randomNUm}.png`;

    if (randomNUm !== 1) {
      currentScore += randomNUm;
      document.getElementById(`score--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`.score--${activePlayer}`).textContent =
      scores[activePlayer];

    animation("hold");
  }

  if (scores[activePlayer] >= 100) {
    document.querySelector(`.player--${activePlayer}`).classList.add("winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("active-player");
    playing = false;
    DiceEl.classList.add("hidden");
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener("click", init);
