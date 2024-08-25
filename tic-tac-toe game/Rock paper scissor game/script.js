let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#userPoint");
const comScorePara = document.querySelector("#comPoint");

const showWinner = (userWin, userChoice, comChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You Win! Your ${userChoice} beats ${comChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    comScorePara.innerText = compScore;
    msg.innerText = `You lose. ${comChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
}

const getComChoice = () => {
  const options = ["rock", "paper", "scissor"];
  const randIdx = (Math.floor(Math.random() * 3));
  return options[randIdx];
}

const drawGame = () => {
  msg.innerText = "Game is Drawn, play again!"
  msg.style.backgroundColor = "#081b31";
}

const playGame = (userChoice) => {
  const comChoice = getComChoice();
   
  if (userChoice === comChoice) {
    drawGame();
  }else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = comChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = comChoice === "scissor" ? false : true;
    } else {
      userWin = comChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, comChoice);
  }
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});