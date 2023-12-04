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


function renderHomePage() {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container text-center quizz-grid">
  <form id="form">
    <div class="row firstC-Row">
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
    <button type="submit" class = "startGame">Commencer la partie</button>
  </form>
</div>

<iframe width="560" height="315" class="hiddenInputVid" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=QvoTMIl4jzmecRu3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
 `;


};

async function onFormSubmit(e) {
  e.preventDefault();

  const Sport = document.getElementById('idSport').checked;
  const Bug = document.getElementById('idBug').checked;
  const Hunt = document.getElementById('idHunt').checked;
  const True = document.getElementById('idTrue').checked;
  const Bald = document.getElementById('idBald').checked;

  clearPage();

  console.log("Sport = ", Sport, "Bug = ", Bug, " Hunt = ", Hunt, "Bald = ", Bald, "True = ", True);

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