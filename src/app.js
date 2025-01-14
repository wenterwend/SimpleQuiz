// app.js

const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Jupiter"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const question = questions[currentQuestionIndex];
    
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        <ul id="options-list"></ul>
    `;
    
    const optionsList = document.getElementById("options-list");
    question.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.addEventListener("click", () => selectOption(option));
        optionsList.appendChild(li);
    });
}

function selectOption(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        displayScore();
    }
}

function displayScore() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `<h2>Your score: ${score} out of ${questions.length}</h2>`;
}

document.addEventListener("DOMContentLoaded", displayQuestion);