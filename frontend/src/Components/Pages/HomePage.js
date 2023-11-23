import { clearPage, renderPageTitle } from '../../utils/render';
import {NavigateWithParameter} from '../Router/Navigate';


const HomePage = () => {
  clearPage();
  renderPageTitle('HomePage');
  renderHomePage();

  const form = document.getElementById('form');
if(form != null){
  form.addEventListener('submit',onFormSubmit) 
}

};


function renderHomePage() {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container text-center quizz-grid">
  <form id="form">
    <div class="row">
      <div class="col categorie col-6">
        <input type="checkbox" value="Sport" id="idSport" class="hiddenInput c-check"></input>
        <label for="idSport" class="c-label">Sport</label>
      </div>
      <div class="col categorie col-6">
        <input type="checkbox" value="Bug" id="idBug" class="hiddenInput c-check"></input>
        <label for="idBug" class="c-label">Bug</label>
      </div>
    </div>


    <div class="row">

      <div class="col categorie col-6">
        <input type="checkbox" value="Hunt" id="idHunt" class="hiddenInput c-check"></input>
        <label for="idHunt" class="c-label">Hunt</label>
      </div>
      <div class="col categorie col-6">
        <input type="checkbox" value="Hunt" id="idHunt" class="hiddenInput c-check"></input>
        <label for="idHunt" class="c-label">Hunt</label>
      </div>
      <div class="col categorie col-6">
        <input type="checkbox" value="Bald" id="idBald" class="hiddenInput c-check"></input>
        <label for="idBald" class="c-label">Bald</label>
      </div>

    </div>
    <button type="submit">Commencer la partie</button>
  </form>
</div>

<iframe width="420" height="315" style="padding-top: 120px;" src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>
  `;


};

function  onFormSubmit(e) {
e.preventDefault();
const sport = document.getElementById('idSport').checked;
const Bug = document.getElementById('idBug').checked;
  console.log("Sport = ",sport , "Bug = ",Bug);
  NavigateWithParameter("/question",{id :"nathan"})
}



export default HomePage;