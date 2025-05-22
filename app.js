const question = [
  {
    question: "Which is the largest animal in the world?",
    answer: [
      { text: "Shark", correct: false},
      { text: "Blue whale", correct: true},
      { text: "Elephant", correct: false},
      { text: "Giraffe", correct: false},

    ]
  },

  {
    question: "Which is the smallest country in the world?",
    answer: [
      { text: "Vatican City", correct: true},
      { text: "Bhutan", correct: false},
      { text: "Nepal", correct: false},
      { text: "Giraffe", correct: false},

    ]
  },

  {
    question: "Which is the largest desert in the world?",
    answer: [
      { text: "Kalhari", correct: false},
      { text: "Gobi", correct: false},
      { text: "Sahara", correct: false},
      { text: "Antractica", correct: true},

    ]
  },

  {
    question: "Which is the smallest continent in the world?",
    answer: [
      { text: "Asia", correct: false},
      { text: "Australia", correct: true},
      { text: "Arctic", correct: false},
      { text: "Africa", correct: false},

    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQustionIndex = 0;
let score = 0;

function startQuiz(){
  currentQustionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next"
  showQuestions();
}

function showQuestions(){
  resetState();
  let currentQuestion = question[currentQustionIndex];
  let questionNo = currentQustionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer)
  });
}

function resetState(){
nextButton.style.display = "none";
while(answerButtons.firstChild){
  answerButtons.removeChild(answerButtons.firstChild);
}
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct=== "true";
  if(isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showscore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
  nextButton.innerHTML ="Play Again";
  nextButton.style.display = "block";
}



 function handleNextButton(){
  currentQustionIndex++;
  if(currentQustionIndex < question.length){
    showQuestions();
  }else{
    showscore();
  }
 }
nextButton.addEventListener("click", () => {
  if(currentQustionIndex < question.length){
handleNextButton();
  }else{
    startQuiz(); 
  }
});
startQuiz();
