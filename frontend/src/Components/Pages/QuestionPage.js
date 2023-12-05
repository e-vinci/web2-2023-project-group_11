/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
// eslint-disable-next-line no-unused-vars
import { clearPage, renderPageTitle } from '../../utils/render';
// eslint-disable-next-line spaced-comment
//import Navigate from '../Router/Navigate';
// eslint-disable-next-line spaced-comment
//import anime from 'animejs';
// eslint-disable-next-line spaced-comment
//import { start } from '@popperjs/core';


const questions = [
  {
    id: 0,
    title: 'Quelle couleur est le ciel ?',
    answers: [
      { text: "bleu", isCorrect: true },
      { text: "vert", isCorrect: false },
      { text: "rouge", isCorrect: false },
      { text: "orange", isCorrect: false }
    ]
  },
];

let questionsArray = null;

let currentQuestionIndex = 0;

let score = 0;

let startGame = null;

let main = null;

const QuestionPage = () => {
  console.log("debut du quizz");
  clearPage();
  main = document.querySelector('main');

  startGame = document.createElement('button');
  startGame.className = "start-button";
  startGame.innerText = "Commencer";
  
  main.appendChild(startGame);

  startGame.addEventListener('click', startQuizz);

}

async function fetchQuestions() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/quizz`
     /* method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categorie: ['Géographie', 'Art'],
      }), */
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Tableau de 20 questions:', data);
    // Process the data here
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
  return [];
}

async function startQuizz() {
  console.log("début du quizz");
  startGame.removeEventListener('click', startQuizz);
  questionsArray = await fetchQuestions();
  renderNextQuestion();
  console.log()
}

async function renderQuestion(question) {
  
  // suppression de la question précédente
  clearPage();
  console.log("render de la question");
  try {
    // eslint-disable-next-line spaced-comment
    //en attente de la recherche
    //const question = await fetchQuestion(id);

    // index de la bonne réponse
    const correctAnswerIndex = question.answers.findIndex(answer => answer.isCorrect);

    //itération de l'array de réponses de la question et concaténation dans la variable answersHTML
    const answersHTML = question.answers.map((answer, index) => {
      const buttonId = `answer${question.id}_${index + 1}`;
      return `<button class="answer-button" id="${buttonId}">${index + 1}. ${answer.text}</button>`;
    }).join('');



    //ajout de la variable dans le main
    main.innerHTML = `
      <div class="titleDiv">
        <p>${question.question}</p>
      </div>
      <container>
        ${answersHTML}
      </container>
    `;

    //itération des differentes réponses avec un event au click
    question.answers.forEach((answer, index) => {
      const answerButton = document.getElementById(`answer${index + 1}`);
      answerButton.addEventListener('click', () => handleAnswerClick(question.id, correctAnswerIndex, index + 1));
    });
  } catch (error) {
    // si question pas trouvée
    console.error('Render de la question échoué', error);
  }

  /* function renderQuestionPage() {
  
    const banniere = document.createElement('div');
    banniere.className = "banner"
    
  
    const textElement = document.createElement('span');
    textElement.className = "text-element";
  
    //const startGame = document.createElement('button');
    //startGame.className = "start-button";
   // startGame.innerText = "Commencer";
  
    const questionDiv = document.createElement("div");
    questionDiv.className = "question-div";
  
    const titleDiv = document.createElement('div');
    titleDiv.className = "question-container";
  
    const answer1Div = document.createElement('div');
    answer1Div.className = "answer1-container";
    //answer1Div.id = 
  
    const answer2Div = document.createElement('div');
    answer2Div.className = "answer2-container";
  
    const answer3Div = document.createElement('div');
    answer3Div.className = "answer3-container";
  
    const answer4Div = document.createElement('div');
    answer4Div.className = "answer4-container";
  
    const titleQuestion = document.createElement('h1');
    titleQuestion.className = "question-title";
  
    titleQuestion.appendChild(textElement);
    titleDiv.appendChild(titleQuestion);
    questionDiv.appendChild(titleDiv);
    banniere.appendChild(questionDiv);
    main.appendChild(banniere);
    main.appendChild(answer1Div);
    main.appendChild(answer2Div);
    main.appendChild(answer3Div);
    main.appendChild(answer4Div);
    main.innerHTML = '<canvas />';
   
  }*/

}

function renderNextQuestion() {
  console.log("envoie de la question");
  if (currentQuestionIndex < questionsArray.length) {
    const nextQuestion = questionsArray[currentQuestionIndex];
    currentQuestionIndex+=1;
    renderQuestion(nextQuestion);
    return;
  }
  console.log('No more questions.');
   // endQuizz();
}

function handleAnswerClick(questionid, correctAnswerIndex, selectedAnswerIndex) {
  console.log("réponse choisie");
  if (selectedAnswerIndex) {
    console.log(`Question ${correctAnswerIndex} : Réponse choisie : ${selectedAnswerIndex}`);
  }
  else {
    console.error('Pas de réponse choisie');
  }
  if (correctAnswerIndex === selectedAnswerIndex) {
    document.getElementById(`answer${questionid}_${correctAnswerIndex}`).style.backgroundColor = 'green';
    score += 10;
  }
  else {
    document.getElementById(`answer${questionid}_${selectedAnswerIndex}`).style.backgroundColor = 'red';
  }
  for (let i = 1; i <= 4; i+=1) {
    if (i !== correctAnswerIndex) {
      document.getElementById(`answer${questionid}_${i}`).style.backgroundColor = 'red';
    }
    else if (i === correctAnswerIndex) {
      document.getElementById(`answer${questionid}_${i}`).style.backgroundColor = 'green';
    }
  }
  renderNextQuestion();
}


/* async function fetchQuestion(id) {
 return new Promise((resolve, reject) => {
   // délai pour trouver la question
   setTimeout(() => {
     const question = questions.find(q => q.id === id);
     if (question) {
       resolve(question);
     } else {
       reject(new Error('Question non existante'));
     }
   }, 500);
 }); */

//const answersHTML = questions[questionId].answers.map((answer, index) => {
// const isCorrect = index === correctAnswerIndex;
// const buttonClass = isCorrect ? 'correct-answer' : 'incorrect-answer';
// return `<button class="answer-button ${buttonClass}" data-index="${index}">${index + 1}. ${answer.text}</button>`;
//}).join('');

// Append the HTML to your container
// (Assuming you have a container element with id 'answers-container')
//document.getElementById('answers-container').innerHTML = answersHTML;




export default QuestionPage;