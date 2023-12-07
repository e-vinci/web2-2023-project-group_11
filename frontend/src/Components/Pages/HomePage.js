import { clearPage, renderPageTitle } from '../../utils/render';
import ArtImage from  '../../img/bochicchio 04.png'
import LitteratureImage from '../../img/great-literature-scaled.jpg'
import GeographieImage from '../../img/carte-du-monde-voyage-geographie-autocollant.jpg'
import AstronomieImage  from '../../img/spacex-crew-dragon-1-1024x682-1.jpg'
import MathematicsImage from '../../img/math-background-jbcyizvw0ckuvcro.jpg'

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


function renderHomePage() {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container text-center quizz-grid">
  <form id="form">
    <div class="row row1 firstC-Row">
      <div class="col categorie col-6 Art" style="background-image: url(${ArtImage});">
      <input type="checkbox" value="Art" id="idArt" class="hiddenInput c-check">
        <label for="idArt" class="c-label">Art</label>

      </div>
      <div class="col categorie col-6 Géographie" style="background-image: url(${GeographieImage});">
      <input type="checkbox" value="Géographie" id="idGéographie" class="hiddenInput c-check">
      <label for="idGéographie" class="c-label">Géographie</label>
     
      </div>
    </div>


    <div class="row">

      <div class="col categorie col-6" style="background-image: url(${LitteratureImage});">
      <input type="checkbox" value="Littérature" id="idLittérature" class="hiddenInput c-check">
        <label for="idLittérature" class="c-label"></input>Littérature</label>
      </div>

      <div class="col categorie col-6" style="background-image: url(${MathematicsImage});">
      <input type="checkbox" value="Mathématique" id="idMathématique" class="hiddenInput c-check"></input>
        <label for="idTMathématique" class="c-label">Mathématique</label>
      </div>

      <div class="col categorie col-6" style="background-image: url(${AstronomieImage});">
      <input type="checkbox" value="Astronomie" id="idAstronomie" class="hiddenInput c-check">
      <label for="idAstronomie" class="c-label">Astronomie</label>
      </div>

    </div>
    <button type="submit" class = "startGame" id="readyButton">Commencer la partie</button>
  </form>
</div>

 `;

const startButton = document.getElementById('readyButton');
startButton.textContent = 'Prêt';
startButton.addEventListener('click', navigateToQuizzPage);
main.appendChild(startButton);


};

async function onFormSubmit(e) {
  e.preventDefault();

  const Art = document.getElementById('idArt').checked;
  const Géographie = document.getElementById('idGéographie').checked;
  const Littérature = document.getElementById('idLittérature').checked;
  const Mathématique = document.getElementById('idMathématique').checked;
  const Astronomie = document.getElementById('idAstronomie').checked;

  clearPage();

  console.log("Art = ", Art, "Géographie = ", Géographie, " Littérature = ", Littérature, "Mathématique = ", Mathématique, "Astronomie = ", Astronomie);

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