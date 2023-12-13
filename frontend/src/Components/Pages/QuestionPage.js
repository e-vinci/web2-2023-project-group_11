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
const bestScore = 200;

let startGame = null;

let main = null;

let started = false;

let titleStartButton = 'Commencer';
let timerInterval = null;
let remainingTime;
let countdownElement = null;
let timeUp = false;
let questionRendered = false;
let streak = 0;
let lossStreak = 0;
let streakElement;
let streakBonusScore;
let endDiv;
let oneortwo = 1;
let malusScore;

// audio elements
const correctAudio = new Audio(CorrectAudio);            
const incorrectAudio1 = new Audio(IncorrectAudio1);
const timerAudio = new Audio(TimerAudio); 
const backgroundAudio = new Audio(BackgroundMusic);
const threeWinStreak = new Audio(ThreeWinningStreak);
const sixWinStreak = new Audio(SixWinningStreak);
const nineWinStreak = new Audio(NineWinningStreak);
const losingStreakAudio = new Audio(LosingStreak);
const timeOverAudio = new Audio(TimeOver);
const incorrectAudio2 = new Audio(IncorrectAudio2);

timerAudio.volume = 0.2;
losingStreakAudio.volume = 1;
incorrectAudio1.volume = 1;
correctAudio.volume = 0.1;
backgroundAudio.volume = 0.03;

function playBackgroundMusic() {
  backgroundAudio.loop = true; 
// Adjust the volume as needed
  backgroundAudio.play();
  backgroundAudio.playbackRate = 1.1;
}

const QuestionPage = () => {
  console.log("debut du quizz");
  clearPage();
  main = document.querySelector('main');

  startGame = document.createElement('button');
  startGame.className = "start-button";
  // ! si 'titleDiv is null, changer startGame.innerText = "Commencer";
  startGame.innerText = `${titleStartButton}`;

  main.appendChild(startGame);

  startGame.addEventListener('click', startQuizz);

}

async function fetchQuestions() {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/quizz/20?categorie=Géographie,Art,Trivia`
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
  started=true;
  titleStartButton = `Continuer`
  renderNextQuestion();
  console.log()
}

async function renderQuestion(question) {
  
  // suppression de la question précédente
  clearPage();
  console.log("render de la question");
  try {

     const answersHTML = `
  <button class="answer-button" id="answer${question.id}_0">${question.answers[0].text}</button>
  <button class="answer-button" id="answer${question.id}_1">${question.answers[1].text}</button>
  <button class="answer-button" id="answer${question.id}_2">${question.answers[2].text}</button>
  <button class="answer-button" id="answer${question.id}_3">${question.answers[3].text}</button>
`;

   // Création du conteneur
    const answersContainer = document.createElement('div');
    answersContainer.className = 'answers-container';

     // Ajout des boutons au conteneur
     answersContainer.innerHTML = answersHTML;

    // index de la bonne réponse
    const correctAnswerIndex = question.answers.findIndex(answer => answer.isCorrect);
    console.log(`BONNE REPONSE : ${question.answers[correctAnswerIndex].text}`);

    //ajout de la variable dans le main
    main.innerHTML = `
       <div class="score" id="score2">
         <p> ${score} </p>
       </div>
      <div class="titleDiv">
        <p>${question.question}</p>
      </div>
      <container>
        ${answersHTML}
      </container>
    `;

    for (let i = -1; i <= 2; i+=1) {
      const answerButton = document.getElementById(`answer${question.id}_${i+1}`);
      answerButton.addEventListener('click', () => handleAnswerClick(question.id, correctAnswerIndex, i+1));
    }
  } catch (error) {
    // si question pas trouvée
    console.error('Render de la question échoué', error);
  }

}

function renderNextQuestion() {
  console.log();
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
  console.log(`réponse choisie : ${selectedAnswerIndex} bonne réponse : ${correctAnswerIndex}`);
  console.log(`Question ${correctAnswerIndex} : Réponse choisie : ${selectedAnswerIndex}`);

  if (correctAnswerIndex === selectedAnswerIndex) {
    score += 10;
    console.log('bonne réponse!');
    // Animation pour le score
    const scoreElement = document.getElementById('score2');
    scoreElement.classList.add('right');
    scoreElement.innerHTML = `<span class="score-change">+10</span>`;
  }
  else {
    console.log('mauvaise reponse');
    console.log('streak = 0');
    console.log(lossStreak);
    //streak = 0;

    resetStreak(true);
    lossStreak+=1;

    if(score>=0.1){
      malusScore = Math.ceil(score * 0.15);;
      score -= malusScore;
      const scoreElement = document.getElementById('score2');
      scoreElement.classList.add('wrong');
      scoreElement.innerHTML = `<span class="score-change">-${malusScore}</span>`;
    }  
    const answerButton = document.getElementById(`answer${questionid}_${selectedAnswerIndex}`);
    answerButton.classList.add('wrong-reply');
    console.log(`CLASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS LISTTT`);
    
    
    /*const answerButton = document.getElementById(`answer${questionid}_${selectedAnswerIndex}`)
    answerButton.classList.add('wrong-reply');
    const scoreElement = document.getElementById('score2');
    scoreElement.classList.add('wrong');
    scoreElement.innerHTML = `<span class="score-change">-5</span>`;
    //document.getElementById(`answer${questionid}_${selectedAnswerIndex}`).style.backgroundColor = 'red';
  }

  for (let i = 0; i <= 3; i+=1) {
    const answerButton = document.getElementById(`answer${questionid}_${i}`)
    if (i !== correctAnswerIndex) {
      answerButton.classList.add('wrong-answer');
      console.log(answerButton.classList);
    }
    else if (i === correctAnswerIndex) {
      answerButton.classList.add('correct-answer');
      console.log(answerButton.classList);
    }
  }
  setTimeout(() => {
    resetAnswerStyles();
    renderNextQuestion();
    // Call the function to render the next question here
  }, 2000); // Adjust the delay time as needed
}

function resetAnswerStyles() {
  const scoreDiv = document.getElementById("score2");
  scoreDiv.classList.remove('pulse3');
  const answerButtons = document.querySelectorAll('.answer-button');
  answerButtons.forEach(button => {
    button.classList.remove('correct-answer', 'wrong-answer', 'wrong-reply');
  });
}

function endQuizz(){
    clearPage();

    endDiv = document.createElement('div');
    endDiv.className = 'end';
    endDiv.innerText = `Fin de la partie\n Score : ${score}`;
    document.body.appendChild(endDiv);

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


// RENDERQUESTIONOLDCODE

 /* const buttonId = `answer${question.id}_${index + 1}`;
      const answerButton = `<button class="answer-button" id="${buttonId}">${index + 1}. ${answer.text}</button>`;
      answerButton.addEventListener('click', () => handleAnswerClick(question.id, correctAnswerIndex, index + 1));
      return answerButton; */ 

      //itération de l'array de réponses de la question et concaténation dans la variable answersHTML
   /* const answersHTML = question.answers.map((answer, index) => {
  
      const buttonId = `answer${question.id}_${index + 1}`;
  
      // création d'un bouton
      const answerButton = document.createElement('button');
      answerButton.className = 'answer-button';
      answerButton.id = buttonId;
      answerButton.innerHTML = `${index + 1}. ${answer.text}`;
  
      console.log(`question id : ${question.id}`);
      console.log('Correct answer index:', correctAnswerIndex);
      console.log('Selected answer index:', index + 1);
   
      // ajout d'un gestionnaire d'événements au bouton
      answerButton.addEventListener('click', () => console.log('Button clicked!'));
      answerButton.addEventListener('click', () => handleAnswerClick(question.id, correctAnswerIndex, index + 1));
      

      // retourne l'élément DOM sous forme de chaîne
       return answerButton.outerHTML;
    }).join('');  */

  //itération des differentes réponses avec un event au click
  /*question.answers.forEach((answer, index) => {
    const answerButton = document.getElementById(`answer${index + 1}`);
    console.log(`answerbutton :${answerButton}`);
    answerButton.addEventListener('click', () => handleAnswerClick(question.id, correctAnswerIndex, index + 1));
  });*/



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


  /*
  <div class="bestScore">
         <p> Meilleur score </p>
         <p> ${bestScore} </p>
       </div>
       */

export default QuestionPage;