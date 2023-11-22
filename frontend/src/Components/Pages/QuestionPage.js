import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
import anime from 'animejs';
import { start } from '@popperjs/core';

let questionId;

const questions = [{ id: 1, 
  question: 'Quelle couleur est le ciel ?',
 answers: [{ text: "bleu", isCorrect: true }, 
 { 
  text: "vert",
  isCorrect: false }, { text: "rouge", isCorrect: false }, 
 { text: "orange", isCorrect: false }] },];

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

  const titleQuestion = document.createElement('h1');
  titleQuestion.className = "question-title";

  titleQuestion.appendChild(textElement);
  titleDiv.appendChild(titleQuestion);
  questionDiv.appendChild(titleDiv);
  banniere.appendChild(questionDiv);
  main.appendChild(banniere);

  main.innerHTML = '<canvas />';

  const startQuizz = () => {
    startGame.removeEventListener('click', startQuizz);
    for (const question in questions) {

    }
  }

  startGame.addEventListener('click', startQuizz);
}

export default QuestionPage;
