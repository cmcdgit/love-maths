// wait for the dom to load before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    /**
     * Working solution for Enter button submit
     */
    // document.addEventListener('keydown', (event) => {
    //     if (event.key === 'Enter') {
    //       event.preventDefault(); // prevent default behavior
    //       checkAnswer(); // submit the form
    //     }
    //   });
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if(event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
})

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    // creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtraction") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "multiplication") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type: ${gameType}. Aborting!`
    }
}

/**
 * Checks answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    
    if(isCorrect) {
        // alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        // alert(`Awww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').textContent;

    if(operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if(operator === "-") {
        return [operand1 - operand2, "subtraction"];
    } else if(operator === "x") {
        return [operand1 * operand2, "multiplication"];
    } else if(operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

/**
 * Gets the current score from the DOM and increments it by one
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('score').innerText);
    document.getElementById('score').textContent = ++oldScore;  // TODO: check behaviour of oldScore++
}

/**
 * Gets the current tally of incorrects answers from the DOM and increments it by one
 */
function incrementWrongAnswer() {
    let oldWrongCount = parseInt(document.getElementById('incorrect').innerText);
    document.getElementById('incorrect').textContent = ++oldWrongCount;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 * operand2 : operand2 * operand1;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "/";
}
