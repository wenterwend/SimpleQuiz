// app.js

const loginContainer = document.getElementById('login-container');
const quizContainer = document.getElementById('quiz-container');
const leaderboardContainer = document.getElementById('leaderboard-container');
const usernameInput = document.getElementById('username');
const loginButton = document.getElementById('login-button');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const nextButton = document.getElementById('next-button');
const leaderboardElement = document.getElementById('leaderboard');
const continueButton = document.getElementById('continue-button');

const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5", "6"],
        correct: "4"
    },
    {
        question: "Identify the image",
        answers: ["Mr. June", "Mr. Yarnall", "Skibidi Toilet", "George Washington"],
        correct: "Skibidi Toilet",
        image: "../images/skibidi.png" // Add the path to the image
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let questionAnswered = false;
let username = '';
let leaderboard = [];

loginButton.addEventListener('click', () => {
    username = usernameInput.value;
    if (username) {
        loginContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        showQuestion();
    }
});

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';
    feedbackElement.textContent = '';
    questionAnswered = false;

    if (currentQuestion.image) {
        const img = document.createElement('img');
        img.src = currentQuestion.image;
        img.alt = currentQuestion.question;
        questionElement.appendChild(img);
    }

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(answer));
        answersElement.appendChild(button);
    });
    startTimer();
}

function selectAnswer(answer) {
    if (questionAnswered) return;
    questionAnswered = true;
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct) {
        feedbackElement.textContent = 'Correct!';
        updateScore();
    } else {
        feedbackElement.textContent = 'Wrong!';
    }
    nextButton.classList.remove('hidden');
    clearInterval(timer);
    updateLeaderboard();
}

function updateScore() {
    score++;
    scoreElement.textContent = `Score: ${score}`;
}

function startTimer() {
    timeLeft = 10;
    timerElement.textContent = `Time left: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            feedbackElement.textContent = 'Time\'s up!';
            nextButton.classList.remove('hidden');
            questionAnswered = true;
            updateLeaderboard();
        }
    }, 1000);
}

function updateLeaderboard() {
    leaderboard.push({ username, score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboardElement.innerHTML = leaderboard.map(entry => `<div>${entry.username}: ${entry.score}</div>`).join('');
    quizContainer.classList.add('hidden');
    leaderboardContainer.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
    if (nextButton.textContent === 'Restart Quiz') {
        resetGame();
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
            nextButton.classList.add('hidden');
        } else {
            questionElement.textContent = 'Quiz Completed!';
            answersElement.innerHTML = '';
            feedbackElement.textContent = '';
            nextButton.textContent = 'Restart Quiz';
            nextButton.classList.remove('hidden');
        }
    }
});

continueButton.addEventListener('click', () => {
    leaderboardContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    nextButton.classList.add('hidden');
    showQuestion();
});

function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = 'Score: 0';
    nextButton.textContent = 'Next Question';
    nextButton.classList.add('hidden');
    showQuestion();
}

showQuestion();