import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
import anime from 'animejs';

const QuizzPage = () => {
  clearPage();
  renderPageTitle('Quizz');
  renderQuizzPage();
};

function renderQuizzPage() {
  const main = document.querySelector('main');
  main.innerHTML = '<canvas />';
  
}

export default QuizzPage;
