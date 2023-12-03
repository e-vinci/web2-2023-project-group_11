import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
import anime from 'animejs';
import { start } from '@popperjs/core';


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

export default QuestionPage;