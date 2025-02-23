const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A8", "#33A8FF", "#FFC733", "#A833FF", "#33FFC7"];
let shuffledColors = [...colors, ...colors]; // Duplicate colors to create pairs
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let timer = 0;
let gameStarted = false;
let timerInterval;

// Shuffle colors
function shuffleColors() {
    shuffledColors = shuffledColors.sort(() => Math.random() - 0.5);
}

// Create game board
function createBoard() {
    const board = document.getElementById("gameBoard");
    board.innerHTML = ""; // Clear previous board
    shuffleColors();
    shuffledColors.forEach((color, index) => {
        const card = document.createElement("div");
        card.classList.add("card", "hidden");
        card.dataset.color = color;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);
        board.appendChild(card);
    });
}

// Flip card logic
function flipCard() {
    if (!gameStarted) {
        gameStarted = true;
        timerInterval = setInterval(() => {
            timer++;
            document.getElementById("timer").innerText = timer;
        }, 1000);
    }

    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.style.backgroundColor = this.dataset.color;
        this.classList.add("flipped");
        flippedCards.push(this);
    }

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 700);
    }
}

// Check for match
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.color === card2.dataset.color) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        score += 10;
        matchedPairs++;
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        setTimeout(() => {
            card1.style.backgroundColor = "#ddd";
            card2.style.backgroundColor = "#ddd";
        }, 500);
    }

    flippedCards = [];
    document.getElementById("score").innerText = score;

    if (matchedPairs === colors.length) {
        clearInterval(timerInterval);
        setTimeout(resetGame, 1200);
    }
}

// Reset game
function resetGame() {
    alert(`🎉 Game Over! Score: ${score}, Time: ${timer} sec`);
    matchedPairs = 0;
    score = 0;
    timer = 0;
    gameStarted = false;
    document.getElementById("score").innerText = score;
    document.getElementById("timer").innerText = timer;
    createBoard();
}

// Restart game button
document.getElementById("restartBtn").addEventListener("click", resetGame);

// Initialize game
createBoard();
