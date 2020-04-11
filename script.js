const questions = [
  {
    questionText: "Whats your name?",
    choices: ["John", "Jane", "ughg"],
    correctAnswer: "John"
  },
  {
    questionText: "Whats your name?",
    choices: ["John", "Rennie", "ughg"],
    correctAnswer: "John"
  },
  {
    questionText: "Whats your name?",
    choices: ["John", "Scott", "ughg"],
    correctAnswer: "John"
  }
];

let currentQuestionIndex = 0;
let correct = 0;
let incorrect = 0;
let totalQuestions = questions.length;
let questionPercentage = 0;
let choiceId = "";

function displayQuestion() {
  hideAllPages();
  hideAllButtons();
  $(".question-screen").show();
  let questionHtml = `
  <p>Question ${currentQuestionIndex + 1} of ${totalQuestions}</p>
  <p class="score">${correct} correct, ${incorrect} incorrect</p>
  <p>${questions[currentQuestionIndex].questionText}</p>
  <form action="">
  ${showMultipleChoiceOptions()}
  </form>  
  `;

  $(".question-info").html(questionHtml);
  $("#submit-answer").show();
  $("#submit-answer").on("click", function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    onAnswerSubmit();
  });
}

function displayEndPage() {
  //do total right percentage calculation
  questionPercentage = Math.floor((correct / totalQuestions) * 100);
  //show a div
  //get the percentage right div with jquery and change value
  hideAllPages();
  hideAllButtons();
  $(".start-end-screen").show();
  $(".start-end-info").html(
    `<h2>Salsa Dance Quiz</h2>
    <p>${correct} of ${totalQuestions} correct</p>
    <p>${questionPercentage}%</p>
    <p>Thanks for playing</p>`
  );

  $("#start-new-quiz").show();
  $("#start-new-quiz").on("click", function() {
    event.preventDefault();
    event.stopImmediatePropagation();
    resetQuizValues();
    showStartPage();
  });
}

function onAnswerSubmit() {
  // write code to check if the user submitted answer is the correct answer
  let userAnswer = $("input[name='dance-type']:checked").val();
  if (userAnswer == questions[currentQuestionIndex].correctAnswer) {
    correct = correct + 1;
    // update correct value with jquery
    $(".score").html(`${correct} correct, ${incorrect} incorrect`);
    // show correct badge with jquery
    $(".feedback").html(`<span class="correct">Correct</span>`);
  } else {
    // do something else
    incorrect = incorrect + 1;
    $(".score").html(`${correct} correct, ${incorrect} incorrect`);

    // show incorrect badge with jquery and correct answer
    $(".feedback").html(`<span class="incorrect">Incorrect</span>`);
    $(".correct-answer").html(
      `Correct answer: ${questions[currentQuestionIndex].correctAnswer}`
    );
  }

  //hide submit question, show next button
  hideAllButtons();
  $("#next").show();
  $("#next").on("click", function(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    currentQuestionIndex = currentQuestionIndex + 1;
    console.log("next loop", currentQuestionIndex);
    if (currentQuestionIndex === totalQuestions) {
      emptyContents();
      displayEndPage();
    } else {
      emptyContents();
      displayQuestion();
    }
  });
}

function startQuiz() {
  displayQuestion();
}

function hideAllPages() {
  $(".start-end-screen").hide();
  $(".question-screen").hide();
}

function hideAllButtons() {
  $("#start-quiz").hide();
  $("#start-new-quiz").hide();
  $("#new-quiz").hide();
  $("#submit-answer").hide();
  $("#next").hide();
}
function emptyContents() {
  $(".feedback").html(``);
  $(".correct-answer").html(``);
  $(".start-end-info").html("");
}

function resetQuizValues() {
  currentQuestionIndex = 0;
  correct = 0;
  incorrect = 0;
  questionPercentage = 0;
}
function showMultipleChoiceOptions() {
  let inputElement = "";
  questions[currentQuestionIndex].choices.forEach(choice => {
    inputElement =
      inputElement +
      `<label><input type="radio" name="dance-type" value=${choice} />
            ${choice}</label><br />`;
  });
  console.log("multiple choice loop", currentQuestionIndex);
  return inputElement;
}

function showStartPage() {
  hideAllPages();
  hideAllButtons();
  emptyContents();
  $(".start-end-screen").show();
  $("#start-quiz").show();
  $("#start-quiz").on("click", function() {
    event.preventDefault();
    event.stopImmediatePropagation();
    startQuiz();
  });
}

$(showStartPage);

// id=
// start-quiz
// new-quiz
// submit-answer
// next

// class=
// .start-end-screen
// .question-screen
// .feedback
// .correct
// .incorrect
