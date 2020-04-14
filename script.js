const questions = [
  {
    questionText:
      "_____ was the record label responsible for the rise and increase in popularity of the salsa dance.",
    choices: [
      "Fania Records",
      "Famous Records",
      "Cuban Records",
      "Masucci Records"
    ],
    correctAnswer: "Fania Records"
  },
  {
    questionText: "The solo breaks during the performance are known as?",
    choices: ["solos", "shines", "spotlights", "breaks"],
    correctAnswer: "shines"
  },
  {
    questionText: "Who was dubbed the “Queen of Salsa”?",
    choices: ["Gloria Estefan", "Celia Cruz", "La India", "Jennifer lopez"],
    correctAnswer: "Celia Cruz"
  },
  {
    questionText:
      "Salsa is usually a lead-and-follow partnered dance, although solo forms like line dancing do exist. It’s called?",
    choices: ["Salsa Suelta", "Salsa Solo", "Salsa Uno", "Salsa libre"],
    correctAnswer: "Salsa Suelta"
  },
  {
    questionText: "The most traditional salsa dance style is?",
    choices: ["L.A", "Cali", "Cuban", "Puerto Rican"],
    correctAnswer: "Cuban"
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
  <div class="question-img">
    <img src="img/salsa_1.jpg" alt="salsa image 1">
    <img src="img/salsa_2.jpg" alt="salsa image 2">
    <img src="img/salsa_3.jpg" alt="salsa image 3">
    <img src="img/salsa_4.jpg" alt="salsa image 4">
  </div>
  <h3>Question ${currentQuestionIndex + 1} of ${totalQuestions}</h3>
  <h5 class="score">${correct} correct, ${incorrect} incorrect</h5>
  <hr>
  <p>${questions[currentQuestionIndex].questionText}</p>
  <form>
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
    `<div>${correct} of ${totalQuestions} correct</div> <div>&nbsp;&nbsp;${questionPercentage}%&nbsp;&nbsp;</div>
      <div>Thanks for playing.</div>`
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

    emptyContents();
    if (currentQuestionIndex === totalQuestions) {
      displayEndPage();
    } else {
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
      `<label><input type="radio" name="dance-type" value="${choice}" />
            ${choice}</label><br />`;
  });
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


