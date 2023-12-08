import { clearPage, renderPageTitle } from '../../utils/render';
import ArtImage from  '../../img/histoire.jpg'
import LitteratureImage from '../../img/litterature.jpg'
import GeographieImage from '../../img/geo.jpg'
import AstronomieImage  from '../../img/astronomie.jpg'
import MathematicsImage from '../../img/math.jpg'

const HomePage = () => {
  clearPage();
  renderPageTitle('HomePage');
  renderHomePage();
  const form = document.getElementById('form');
  if (form != null) {
    form.addEventListener('submit', onFormSubmit)
  }

};

function navigateToQuizzPage() {
  // Rediriger vers la page de quiz
  window.location.href = '/quizz';
}

function clickedCategorie(event){
  const clickedDiv = event.target;
  console.log(event);
  clickedDiv.classList.toggle("changedStyle");
}

function renderHomePage() {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container text-center quizz-grid">
  <form id="form">
    <div class="row row1 firstC-Row">
      <div class="col categorie col-6 Art" id="catButtonArt" style="background-image: url(${ArtImage});">
      <input type="checkbox" value=" " id="idArt" class="hiddenInput c-check">
        <label for="idArt" class="c-label"> </label>

      </div>
      <div class="col categorie col-6 Géographie" id="catButtonGeo" style="background-image: url(${GeographieImage});">
      <input type="checkbox" value=" " id="idGéographie" class="hiddenInput c-check">
      <label for="idGéographie" class="c-label"> </label>
     
      </div>
    </div>


    <div class="row">

      <div class="col categorie col-6" id="catButtonLit"style="background-image: url(${LitteratureImage});""> 
      <input type="checkbox" value=" " id="idLittérature" class="hiddenInput c-check">
        <label for="idLittérature" class="c-label"></input> </label>
      </div>

      <div class="col categorie col-6" id="catButtonMath"style="background-image: url(${MathematicsImage});">
      <input type="checkbox" value=" " id="idMathématique" class="hiddenInput c-check"></input>
        <label for="idTMathématique" class="c-label"> </label>
      </div>

      <div class="col categorie col-6" id="catButtonAstro" style="background-image: url(${AstronomieImage});">
      <input type="checkbox" value=" " id="idAstronomie" class="hiddenInput c-check">
      <label for="idAstronomie" class="c-label"> </label>
      </div>

    </div>
    <button type="submit" class = "startGame" id="readyButton">Commencer la partie</button>
  </form>
</div>

 `;

const startButton = document.getElementById('readyButton');
startButton.textContent = 'Valider les paramètres';
startButton.addEventListener('click', navigateToQuizzPage);
main.appendChild(startButton);


};

async function onFormSubmit(e) {
  e.preventDefault();

  const artDiv = document.getElementById('idArt').checked;
  const geoDiv = document.getElementById('idGéographie').checked;
  const litteratureDiv = document.getElementById('idLittérature').checked;
  const mathDiv = document.getElementById('idMathématique').checked;
  const astroDiv = document.getElementById('idAstronomie').checked;

  artDiv.addEventListener('click', clickedCategorie);
  geoDiv.addEventListener('click', clickedCategorie);
  mathDiv.addEventListener('click', clickedCategorie);
  astroDiv.addEventListener('click', clickedCategorie);
  litteratureDiv.addEventListener('click', clickedCategorie);

  document.querySelectorAll("col.categorie.col-6").forEach(div => div.addEventListener("click", clickedCategorie));

  clearPage();

  console.log("Art = ", artDiv, "Géographie = ", geoDiv, " Littérature = ", litteratureDiv, "Mathématique = ", mathDiv, "Astronomie = ", astroDiv);

  try {
    const response = await fetch('/api/quizz/20');

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const start = await response.json();

    return start;
  }

  catch (error) {
    console.error('Error:', error);
    throw error;
  }


}


export default HomePage;