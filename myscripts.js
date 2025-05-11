function getComputerChoice() {
  const options = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex];
}

// console.log(getComputerChoice());

function getHumanChoice() {
  let input = prompt("Make your choice!! (R, P or S)").toUpperCase();

  if (input === "R") {
    input = "Rock";
  } else if (input === "P") {
    input = "Paper";
  } else if (input === "S") {
    input = "Scissors";
  } else {
    alert("Invalid Choice!!");
    return "Invalid Choice!!";
  }
  return input;
}

// console.log(getHumanChoice());

function getRoundWinner(humanChoice, computerChoice) {
  if (
    (humanChoice === "Rock" && computerChoice === "Scissors") ||
    (humanChoice === "Paper" && computerChoice === "Rock") ||
    (humanChoice === "Scissors" && computerChoice === "Paper")
  ) {
    return "Human";
  } else if (
    (computerChoice === "Rock" && humanChoice === "Scissors") ||
    (computerChoice === "Paper" && humanChoice === "Rock") ||
    (computerChoice === "Scissors" && humanChoice === "Paper")
  ) {
    return "Computer";
  } else if (humanChoice === computerChoice) {
    return "Tie";
  } else {
    return "Computer";
  }
}

// console.log("winnder is: " + getRoundWinner("Paper", "Rock"));

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  for (let roundNumber = 1; ; roundNumber++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();

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

    if (humanScore === 3) return "You Win!!";
    if (computerScore === 3) return "You Lose!!";
  }
}

console.log(`[Game Result: ${playGame()}]`);
