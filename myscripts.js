function setupHumanChoiceEvent() {
  const humanOptions = document.querySelector(".human-options");

  humanOptions.addEventListener("click", (e) => {
    const choice = ["rock", "paper", "scissors"].find((val) =>
      e.target.classList.contains(val)
    );
    if (choice) {
      const customEvent = new CustomEvent("humanChoice", {
        detail: choice,
        bubbles: true,
      });

      humanOptions.dispatchEvent(customEvent);
    }
  });
}

function setupModeSwitchEvent() {
  const mode = document.querySelector(".mode");

  mode.addEventListener("click", (e) => {
    const choice = ["normal", "hell"].find((val) =>
      e.target.classList.contains(val)
    );
    if (choice) {
      const customEvent = new CustomEvent("mode", {
        detail: choice,
        bubbles: true,
      });

      mode.dispatchEvent(customEvent);
    }
  });
}

function getHumanChoice() {
  return new Promise((resolve) => {
    const handler = (e) => {
      if (e.detail) {
        resolve(e.detail);
        document.body.removeEventListener("humanChoice", handler);
      }
    };

    // 一開始先運行這行 上面是在宣告handler變數
    // 這裡必須使用named function的原因是 沒有名字的話 這串會無限套娃寫不出來
    document.body.addEventListener("humanChoice", handler);
  });
}

function getMode() {
  return new Promise((resolve) => {
    const handler = (e) => {
      if (e.detail) {
        resolve(e.detail);
        document.body.removeEventListener("mode", handler);
      }
    };
    document.body.addEventListener("mode", handler);
  });
}

function getComputerNormalChoice() {
  const options = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex];
}

function getRoundWinner(humanChoice, computerChoice) {
  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    return "Human";
  } else if (
    (computerChoice === "rock" && humanChoice === "scissors") ||
    (computerChoice === "paper" && humanChoice === "rock") ||
    (computerChoice === "scissors" && humanChoice === "paper")
  ) {
    return "Computer";
  } else if (humanChoice === computerChoice) {
    return "Tie";
  } else {
    return "Computer";
  }
}

const divRoundNumber = document.querySelector(".round-number");
const divHumanChoice = document.querySelector(".human .choice");
const divComputerChoice = document.querySelector(".computer .choice");
const divHumanScore = document.querySelector(".human .score");
const divComputerScore = document.querySelector(".computer .score");
const divGameResult = document.querySelector(".game-result");
const divHeader = document.querySelector(".header");
const divFooter = document.querySelector(".footer");
const divSpaceLeft = document.querySelector(".space-left");
const divSpaceRight = document.querySelector(".space-right");
const divBody = document.querySelector("body");

async function playGame() {
  let mode = await getMode();
  divSpaceLeft.textContent = "";
  divSpaceRight.textContent = "";
  let humanScore = 0;
  let computerScore = 0;

  for (let roundNumber = 1; ; roundNumber++) {
    const humanSelection = await getHumanChoice();

    function getComputerHellChoice() {
      if (humanSelection === "rock") return "paper";
      if (humanSelection === "paper") return "scissors";
      if (humanSelection === "scissors") return "rock";
    }

    let computerSelection = "";

    if (mode === "normal") {
      computerSelection = getComputerNormalChoice();
    }
    if (mode === "hell") {
      computerSelection = getComputerHellChoice();
    }

    const roundWinner = getRoundWinner(humanSelection, computerSelection);

    if (roundWinner === "Human") {
      humanScore += 1;
    } else if (roundWinner === "Computer") {
      computerScore += 1;
    } else if (roundWinner === "Tie") {
      // do nothing
    } else {
      computerScore += 1;
    }

    function switchOptionToEmoji(option) {
      if (option === "rock") return "✊";
      else if (option === "paper") return "🖐️";
      else if (option === "scissors") return "✌️";
    }

    divRoundNumber.textContent = `ROUND ${roundNumber}`;
    divHumanChoice.textContent = switchOptionToEmoji(humanSelection);
    divComputerChoice.textContent = switchOptionToEmoji(computerSelection);
    divHumanScore.textContent = humanScore;
    divComputerScore.textContent = computerScore;

    function reset() {
      roundNumber = 0;
      humanScore = 0;
      computerScore = 0;
      divRoundNumber.textContent = "ROUND 1";
      divHumanScore.textContent = "0";
      divComputerScore.textContent = "0";
      divHumanChoice.textContent = "";
      divComputerChoice.textContent = "";
      divGameResult.textContent = "";
      divSpaceLeft.textContent = "";
      divSpaceRight.textContent = "";
      divHeader.removeAttribute("style");
      divFooter.removeAttribute("style");
      divBody.removeAttribute("style");
    }

    function showGameResultEffect(result) {
      if (result === "win") {
        divGameResult.textContent = "YOU WIN!!";
        divHeader.setAttribute("style", "background-color: #2fb936");
        divFooter.setAttribute("style", "background-color: #2fb936");
      } else if (result === "lose") {
        divGameResult.textContent = "YOU LOSE!!";
        divHeader.setAttribute("style", "background-color: #e24944");
        divFooter.setAttribute("style", "background-color: #e24944");
        divBody.setAttribute("style", "background-color:rgba(10, 10, 10, 0.8)");
      }
      divSpaceLeft.textContent = "👉";
      divSpaceRight.textContent = "👈";
    }

    if (humanScore === 3) {
      showGameResultEffect("win");
      mode = await getMode();
      reset();
    } else if (computerScore === 3) {
      showGameResultEffect("lose");
      mode = await getMode();
      reset();
    }
  }
}

setupModeSwitchEvent();
setupHumanChoiceEvent();
playGame();
