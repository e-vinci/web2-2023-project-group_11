import { clearPage, renderPageTitle } from '../../utils/render';

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
