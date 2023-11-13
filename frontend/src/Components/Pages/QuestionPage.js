import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
import anime from 'animejs';
import { start } from '@popperjs/core';

let questionId;

const QuestionPage = () => {
  clearPage();
  renderPageTitle('Question');
  renderQuestionPage();
};

if(!questionId){
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
  
}

export default QuestionPage;
