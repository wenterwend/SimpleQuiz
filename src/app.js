// app.js

const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-button');

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
    }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';
    feedbackElement.textContent = '';
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(answer));
        answersElement.appendChild(button);
    });
}

function selectAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correct) {
        feedbackElement.textContent = 'Correct!';
        updateScore();
    } else {
        feedbackElement.textContent = 'Wrong!';
    }
    nextButton.classList.remove('hidden');
}

function updateScore() {
    score++;
    scoreElement.textContent = `Score: ${score}`;
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

function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = 'Score: 0';
    nextButton.textContent = 'Next Question';
    nextButton.classList.add('hidden');
    showQuestion();
}

showQuestion();