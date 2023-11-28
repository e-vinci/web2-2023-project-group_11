<<<<<<< HEAD
/* eslint-disable no-unused-vars */
import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
=======
import anime from 'animejs';
import { clearPage, renderPageTitle } from '../../utils/render';


>>>>>>> 25f217654bbca95aecbf29b1fd60ed3cf0480810

const QuizzPage = () => {
  clearPage();
  renderPageTitle('Quizz');
  renderQuizzPage();
};

function renderQuizzPage() {
  const main = document.querySelector('main');
<<<<<<< HEAD
  main.innerHTML = 'quizz';
  
=======

  main.innerHTML = `<div class="animTest">
  <div class="p-5 anime-test-1">
  <input type="button" value="Bouton cliquer" />
  </div>
  <div class="p-5 anime-test-2">
  <input type="button" value="Bouton cliquer" />
  </div>
  <div class="p-5 anime-test-2">
  <input type="button" value="Bouton cliquer" />
  </div>
 </div>
 `;

 anime({
  targets: [".anime-test-1",".anime-test-2"],
  translateX: 70,
  translateY: 170,
  delay: anime.stagger(200) // increase delay by 100ms for each elements.
});

>>>>>>> 25f217654bbca95aecbf29b1fd60ed3cf0480810
}

export default QuizzPage;
