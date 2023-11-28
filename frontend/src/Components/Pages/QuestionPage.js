import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';

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
    renderQuestion(0);
  };

  startGame.addEventListener('click', startQuizz);

  function renderQuestion (id) {
    clearPage();
    main.innerHTML = 
    `
    <div class="titleDiv">
      <p> ${question.title} </p>
    <div>
    <container>
     <div>
       <p> ${question.answers}</p>
     <div>
     <div>
       <p> </p>
     <div>
     <div>
       <p> </p>
     <div>
    <container>
    `
  };
}

export default QuestionPage;