/* eslint-disable no-unused-vars */
import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';

const QuizzPage = () => {
  clearPage();
  renderPageTitle('Quizz');
  renderQuizzPage();
};

function renderQuizzPage() {
  const main = document.querySelector('main');
  main.innerHTML = 'quizz';
  
}

export default QuizzPage;
