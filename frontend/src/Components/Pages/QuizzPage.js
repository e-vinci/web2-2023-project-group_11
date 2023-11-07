import Navigate from '../Router/Navigate';
import { clearPage,render } from '../../utils/render';


const QuizzPage = () => {
    clearPage();
    renderPageTitle('Quizz');
    renderQuizzPage();

  };

function renderQuizzPage() {
    const main = document.querySelector('main');
    main.innerHTML = 'Quizz Page';
  };

  export default AddMoviePage;