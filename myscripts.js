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


async function playGame() {
  let mode = await getMode();
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

    console.log(`-Round ${roundNumber}-`);
    console.log(`Winner: <${roundWinner}>`);
    console.log("Computer: " + computerSelection);
    console.log("Human: " + humanSelection);
    console.log(
      "Computer score: " + computerScore + "    " + "Human score: " + humanScore
    );

    function reset(){
      roundNumber = 0;
      humanScore = 0;
      computerScore = 0;
    }

    if (humanScore === 3) {
      console.log("You Win!!");
      mode = await getMode();
      reset();
    }
    if (computerScore === 3) {
      console.log("You Lose!!");
      mode = await getMode();
      reset();
    }
  }
}

setupModeSwitchEvent();
setupHumanChoiceEvent();
playGame();
