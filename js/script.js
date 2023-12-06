$(document).ready(function () {
  const target = $('#target');
  const scoreDisplay = $('#score');
  const timerDisplay = $('#timer');
  const startButton = $('#startButton');
  const resultElement = $('#result');
  const playArea = $('#playArea');

  const soundEffects1 = [
    new Audio('../sounds/clap1.mp3'),
    new Audio('../sounds/clap2.mp3'),
    new Audio('../sounds/clap3.mp3'),
    new Audio('../sounds/clap4.mp3'),
    new Audio('../sounds/clap5.mp3'),
  ];

  const soundEffects2 = [
    new Audio('../sounds/No.mp3'),
    new Audio('../sounds/Ow.mp3'),
    new Audio('../sounds/Stop.mp3'),
    new Audio('../sounds/Stawp4.mp3'),
  ];

  let score = 0;
  let timeLeft = 30;
  let gameInterval;

  function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.text(`Score: ${score}`);
    timerDisplay.text(`Time: ${timeLeft}`);
    resultElement.hide();

    // Disable the start button during the game
    startButton.prop('disabled', true);

    // Show the target
    target.show();

    // Start the game loop
    updateGame();
    gameInterval = setInterval(updateTime, 1000);
  }

  function updateGame() {
    moveTarget();
  }

  function moveTarget() {
    const maxX = playArea.width() - target.width();
    const maxY = playArea.height() - target.height();

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    const randomSize = Math.floor(Math.random() * 50) + 20;

    target.css({
      width: `${randomSize}px`,
      height: `${randomSize}px`,
      left: `${randomX}px`,
      top: `${randomY}px`,
    });
  }

  function playRandomSound(sounds) {
    const randomIndex = Math.floor(Math.random() * sounds.length);
    sounds[randomIndex].play();
  }

  function updateTime() {
    timeLeft--;

    if (timeLeft <= 0) {
      endGame();
    } else {
      timerDisplay.text(`Time: ${timeLeft}`);
    }
  }

  function endGame() {
    clearInterval(gameInterval);
    startButton.prop('disabled', false);
    resultElement.text(`Game over! Your score is ${score}.`).show();
    target.hide(); // Hide the target when the game ends
  }

  target.on('click', function () {
    // Change target image to 'hit.png' for a split second
    target.css('background-image', 'url("../imgs/hit.png")');
    setTimeout(() => {
      // Move the target and reset the image to the original after a delay
      moveTarget();
      target.css('background-image', 'url("../imgs/face.png")');
    }, 500); // Adjust the delay as needed

    // Play a random sound from both arrays
    playRandomSound(soundEffects1);
    playRandomSound(soundEffects2);

    // Increase the score when the target is clicked
    score++;
    scoreDisplay.text(`Score: ${score}`);
  });

  startButton.on('click', startGame);

  // Initial setup
  target.hide(); // Hide the target initially
});
