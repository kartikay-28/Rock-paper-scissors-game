const choices = document.querySelectorAll('.choice');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const roundCountEl = document.getElementById('round-count');
const roundResultEl = document.getElementById('round-result');
const finalResultEl = document.getElementById('final-result');
const playAgainBtn = document.getElementById('play-again');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');

let playerScore = 0;
let computerScore = 0;
let round = 1;
const totalRounds = 5;
let waiting = false;

const emojiMap = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};

choices.forEach(button => {
  button.addEventListener('click', () => {
    if (round <= totalRounds && !waiting) {
      waiting = true;

      const playerChoice = button.dataset.choice;
      const computerChoice = getComputerChoice();

      playerChoiceEl.textContent = emojiMap[playerChoice];
      computerChoiceEl.textContent = emojiMap[computerChoice];

      const result = determineWinner(playerChoice, computerChoice);
      updateScore(result);
      displayRoundMessage(result, playerChoice, computerChoice);

      // Countdown logic
      let countdown = 5;
      const countdownInterval = setInterval(() => {
        if (countdown > 0) {
          roundResultEl.textContent = `Next round starting in ${countdown}...`;
          countdown--;
        }
      }, 1000);

      // After 5 seconds, move to next round or end
      setTimeout(() => {
        clearInterval(countdownInterval);

        if (round === totalRounds) {
          showFinalResult();
          playAgainBtn.style.display = 'inline-block';
        } else {
          round++;
          roundCountEl.textContent = round;
          roundResultEl.textContent = `Round ${round}/${totalRounds} — Make your choice!`;
          resetRoundChoices();
        }

        waiting = false;
      }, 5000);
    }
  });
});
playAgainBtn.style.display = 'none'; // Hide play again button initially

playAgainBtn.addEventListener('click', resetGame);

function getComputerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  return options[Math.floor(Math.random() * options.length)];
}

function determineWinner(player, computer) {
  if (player === computer) return 'tie';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) return 'win';
  return 'lose';
}

function updateScore(result) {
  if (result === 'win') playerScore++;
  else if (result === 'lose') computerScore++;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
}

function displayRoundMessage(result, player, computer) {
  let msg = `You chose ${emojiMap[player]}, Computer chose ${emojiMap[computer]}. `;
  msg += result === 'win' ? 'You win this round!'
       : result === 'lose' ? 'Computer wins this round!'
       : "It's a tie!";
  roundResultEl.textContent = msg;
}

function showFinalResult() {
  if (playerScore > computerScore) {
    finalResultEl.textContent = "🎉 Congratulations! You Won The Game!";
  } else if (computerScore > playerScore) {
    finalResultEl.textContent = "💻 Game Over! Computer Wins The Game!";
  } else {
    finalResultEl.textContent = "⚖️ It's a Tie Game! Try Again!";
  }
}

function resetRoundChoices() {
  playerChoiceEl.textContent = '?';
  computerChoiceEl.textContent = '?';
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  round = 1;
  waiting = false;

  playerScoreEl.textContent = '0';
  computerScoreEl.textContent = '0';
  roundCountEl.textContent = '1';
  roundResultEl.textContent = 'Make your choice!';
  finalResultEl.textContent = '';
  resetRoundChoices();
  playAgainBtn.style.display = 'none';
}
