import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
import anime from 'animejs';
import { start } from '@popperjs/core';

let questionId;

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

const QuestionPage = () => {
  clearPage();
  renderPageTitle('Question');
  renderQuestionPage();
};

if (!questionId) {
  Navigate('/home');
}

function renderQuestionPage() {

  const main = document.querySelector('main');

  const banniere = document.createElement('div');
  banniere.className = "banner"
  banniere.innerHTML

  const textElement = document.createElement('span');
  textElement.className = "text-element";

  const startGame = document.createElement('button');
  startGame.className = "start-button";
  startGame.innerText = "Commencer";

  const questionDiv = document.createElement("div");
  questionDiv.className = "question-div";

  const titleDiv = document.createElement('div');
  titleDiv.className = "question-container";

  const answer1Div = document.createElement('div');
  answer1Div.className = "answer1-container";

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

  const startQuizz = () => {
    startGame.removeEventListener('click', startQuizz);
    renderQuestion(1);
  };

  startGame.addEventListener('click', startQuizz);

  async function fetchQuestion(id) {
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
    });
  }
  
  async function renderQuestion(id) {
    // suppression de la question précédente
    clearPage();

    try {
      //en attente de la recherche
      const question = await fetchQuestion(id);
  
      //itération de l'array de réponses de la question et concaténation dans la variable answersHTML
      const answersHTML = question.answers.map((answer, index) => {
        return `<button class="answer-button" id="answer${index + 1}">${index + 1}. ${answer}</button>`;
      }).join('');
  

      //ajout de la variable dans le main
      main.innerHTML = `
        <div class="titleDiv">
          <p>${question.title}</p>
        </div>
        <container>
          ${answersHTML}
        </container>
      `;

      //itération des differentes réponses avec un event au click
      question.answers.forEach((answer, index) => {
        const answerButton = document.getElementById(`answer${index + 1}`);
        answerButton.addEventListener('click', () => answerClick(id, index + 1));
      });

    } catch (error) {
      // si question pas trouvée
      console.error('Render de la question échoué', error);
    }
  }

  function handleAnswerClick(questionId, selectedAnswerIndex) {
    if(question){
      console.log(`Question ${questionId} : Réponse choisie : ${selectedAnswerIndex}`);
    }
    else {
      console.error('Question innexistante');
    }
    if(questions[questionId].answers[selectedAnswerIndex].isCorrect){
      console.log('truc');
    }
    
  }
}

/*
FETCH AVEC API

async function fetchQuestion(id) {
  try {
    const response = await fetch(`YOUR_API_ENDPOINT/questions/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch question. Status: ${response.status}`);
    }
    const question = await response.json();
    return question;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
}

*/ 

export default QuestionPage;
