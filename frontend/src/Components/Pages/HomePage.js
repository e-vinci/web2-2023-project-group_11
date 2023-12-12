import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';
import ArtImage from '../../img/9b9629cfd3d1e41c1866605b0dce0d4f.jpg'
import LitteratureImage from '../../img/great-literature-scaled.jpg'
import GeographieImage from '../../img/d9241ee4e7f0e89c54704904eac8b230.jpg'
import AstronomieImage from '../../img/69f71c1df7fde8069e91a52903ab9659.jpg'
import MathematicsImage from '../../img/b543ba9e98d55c4341a7f5e1a34101dc.jpg'
import TriviaImage from '../../img/istockphoto-1267191865-612x612.jpg'

const HomePage = () => {
  clearPage();
  renderPageTitle('HomePage');
  renderHomePage();

  const form = document.getElementById('form');
  if (form != null) {
    form.addEventListener('submit', onFormSubmit)
  }

};


function renderHomePage() {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container text-center quizz-grid">
  <form id="form">
    <div class="row d-flex align-items-center justify-content-center row1 firstC-Row">
    <span class="hpWelcome">Vous pouvez selectionnez plusieurs cactegories!</span>
      
      <div class="col categorie col-6 Art" style="background-image: url(${ArtImage});">
      <input type="checkbox" value="Art" id="idArt" class="hiddenInput c-check">
        <label for="idArt" class="c-label">Art</label>
      </div>
    
      <div class="col categorie col-6 Géographie" style="background-image: url(${GeographieImage});">
      <input type="checkbox" value="Géographie" id="idGéographie" class="hiddenInput c-check">
      <label for="idGéographie" class="c-label">Géographie</label>
      </div>
      
      <div class="col categorie col-6 Trivia" style="background-image: url(${TriviaImage});">
      <input type="checkbox" value="Trivia" id="idTrivia" class="hiddenInput c-check">
        <label for="idTrivia" class="c-label">Trivia</label>
      </div>
    </div>


    <div class="row d-flex align-items-center justify-content-center">
      <div class="col categorie col-6" style="background-image: url(${LitteratureImage});">
      <input type="checkbox" value="Littérature" id="idLittérature" class="hiddenInput c-check">
        </input><label for="idLittérature" class="c-label">Littérature</label>
      </div>

      <div class="col categorie col-6" style="background-image: url(${MathematicsImage});">
      <input type="checkbox" value="Mathématique" id="idMathématique" class="hiddenInput c-check"></input>
        <label for="idMathématique" class="c-label">Mathématique</label>
      </div>

      <div class="col categorie col-6" style="background-image: url(${AstronomieImage});">
      <input type="checkbox" value="Astronomie" id="idAstronomie" class="hiddenInput c-check">
      <label for="idAstronomie" class="c-label">Astronomie</label>
      </div>
      <div class="d-flex align-items-center justify-content-center" style="height: 25px;">
      <button type="submit" class = "p-2 m-2  startGame">Commencer la partie</button>
    </div>
    </div>
  </form>
</div>

 `;
};



function getParameters() {
  const queryParams = new URLSearchParams(window.location.search);
  console.log("URLLLLL ", queryParams);
  const parameterValues = [];

  queryParams.forEach((value) => {
    parameterValues.push(value);
    console.log("CHAQUE  PPARR", value);
  });

  return parameterValues;
}


/* function updateForm(parameters) {
  document.getElementById('idArt').checked = parameters.Art === 'true';
  document.getElementById('idGéographie').checked = parameters['Géographie'] === 'true';
  document.getElementById('idLittérature').checked = parameters['Littérature'] === 'true';
  document.getElementById('idMathématique').checked = parameters['Mathématique'] === 'true';
  document.getElementById('idAstronomie').checked = parameters.Astronomie === 'true';
}


function initializeFormFromURL() {
  const parameters = getParameters();
  updateForm(parameters);
}

*/

const parameters = getParameters();
console.log('URL Parameters:', parameters);

async function onFormSubmit(e) {
  e.preventDefault();

  const Art = document.getElementById('idArt').checked;
  const Géographie = document.getElementById('idGéographie').checked;
  const Littérature = document.getElementById('idLittérature').checked;
  const Mathématique = document.getElementById('idMathématique').checked;
  const Astronomie = document.getElementById('idAstronomie').checked;
  const Trivia = document.getElementById('idTrivia').checked;
  
  clearPage();

  console.log("Art = ", Art, "Géographie = ", Géographie, " Littérature = ", Littérature, "Mathématique = ", Mathématique, "Astronomie = ", Astronomie,"Trivia = ",Trivia);

  // les multiples parametres du site
  const categories = [];
  if (Art) categories.push('Art');
  if (Géographie) categories.push('Géographie');
  if (Littérature) categories.push('Littérature');
  if (Mathématique) categories.push('Mathématique');
  if (Astronomie) categories.push('Astronomie');
  if (Trivia) categories.push('Trivia');

  const categoriesString = categories.join(',');

  // ecrit l'url du site
  const queryParams = new URLSearchParams();
  queryParams.append('categorie', categoriesString);

  console.log("Selected categories: ", categoriesString);

  Navigate("/quizz");
  const currentUrl = window.location.href.split('?')[0];
  const newUrl = `${currentUrl}?${queryParams.toString()}`;

  console.log("Current URL", currentUrl);

  console.log('New URL with parameters:', newUrl);

  window.location.href = newUrl;

}

/* function getParameters() {
    const queryParams = new URLSearchParams(window.location.search);
    const parameters = {};
  
    for (const [key, value] of queryParams.entries()) {
      parameters[key] = value;
    }
  
    return parameters;
  }
  function updateForm(parameters) {
    // Assuming your checkboxes have the following IDs
    document.getElementById('idArt').checked = parameters['Art'] === 'true';
    document.getElementById('idGéographie').checked = parameters['Géographie'] === 'true';
    document.getElementById('idLittérature').checked = parameters['Littérature'] === 'true';
    document.getElementById('idMathématique').checked = parameters['Mathématique'] === 'true';
    document.getElementById('idAstronomie').checked = parameters['Astronomie'] === 'true';
  }
  
  // Call this function when your page loads to initialize the form based on URL parameters
  function initializeFormFromURL() {
    const parameters = getParameters();
    updateForm(parameters);
  }
  
  // Example usage in someone else's code
  const parameters = getParameters();
  console.log('URL Parameters:', parameters);
  // You can now use the parameters in their code as needed. */






/*
Si je veux direct aller sur le lien 
const queryParams = new URLSearchParams();
queryParams.set('Art', Art.toString());
queryParams.set('Géographie', Géographie.toString());
queryParams.set('Littérature', Littérature.toString());
queryParams.set('Mathématique', Mathématique.toString());
queryParams.set('Astronomie', Astronomie.toString());

const currentUrl = window.location.href.split('?')[0]; 
const newUrl = `${currentUrl}?${queryParams.toString()}`;

console.log('New URL with parameters:', newUrl);

window.location.href = newUrl;

clearPage();
*/


export { HomePage, getParameters };
