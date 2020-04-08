const questions = [
  {
    questionText: "Whats your name?",
    choices: ["John", "Jane", "ughg"],
    correctAnswer: "John"
  },
  {
    questionText: "Whats your name?",
    choices: ["John", "Jane", "ughg"],
    correctAnswer: "John"
  },
  {
    questionText: "Whats your name?",
    choices: ["John", "Jane", "ughg"],
    correctAnswer: "John"
  }
];

let currentQuestionIndex = 0;
let currentQuestion = questions[currentQuestionIndex];
let correct = 0;
let incorrect = 0;
let totalQuestions = questions.length();
let questionPercentage = 0;

function displayQuestion(question) {
  // write code to display the question
  let html = `<div>
  <p> Question ${currentQuestionIndex + 1} of ${totalQuestions}</p>
  <p>${correct} correct, ${incorrect} incorrect</p>
  <p>${question.questionText}</p>
  <form>
    <input type=radio value=${question.choices[0]} />
  </form>
  </div>`;

  $("div").html(html);
  $(".submit-question").on("click", function() {
    onAnswerSubmit();
  });
}

function displayEndPage() {
  //do total right percentage calculation
  questionPercentage = correct / totalQuestions;
  //show a div
  //get the percentage right div with jquery and change value
  $("#start-new-quiz").on("click", function() {
    hideAllPages();
    resetQuizValues();
    showStartPage();
  });
}

function onAnswerSubmit() {
  // write code to check if the user submitted answer is the correct answer
  let userAnswer = $("#choice").val();
  let currentQuestion = questions[currentQuestionIndex];
  if (userAnswer == currentQuestion.correctAnswer) {
    // do something
    // update correct scores
    correct = correct + 1;
    // update correct value with jquery

    // show correct badge with jquery
  } else {
    // do something else
    incorrect = incorrect - 1;

    // update incorrect value with jquery

    // show incorrect badge with jquery and correct answer
  }
  currentQuestionIndex = currentQuestionIndex + 1;

  //hide submit question, show next button

  $("#next-button").on("click", function() {
    if (currentQuestionIndex === totalQuestions) {
      displayEndPage();
    } else {
      displayQuestion();
    }
  });
}

function startQuiz() {
  currentQuestion = questions[currentQuestionIndex];
  displayQuestion(currentQuestion);
}

function hideAllPages() {}

function resetQuizValues() {
  currentQuestionIndex = 0;
  correct = 0;
  incorrect = 0;
  questionPercentage = 0;
}

function showStartPage() {
  $(".start-button-div").show();

  $("#start-button").on("click", function() {
    hideAllPages();
    startQuiz();
  });
}

$(showStartPage);

//html on page

//start page
//<h1>Salsa Dance Quiz</h1>
//end page
{
  /* 
<h2>Salsa Dance Quiz</h2>
<p>4 of 5 correct</p>
<p>80%</p>
<p>Thanks for playing</p>
<button>Start a new Quiz</button> 
*/
}
