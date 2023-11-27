import { clearPage, renderPageTitle } from '../../utils/render';

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
      <div class="col categorie col-6 Sport">
      <input type="checkbox" value="Sport" id="idSport" class="hiddenInput c-check">
        <label for="idSport" class="c-label">
          Sport
        </label>

      </div>
      <div class="col categorie col-6 Bug">
      <input type="checkbox" value="Bug" id="idBug" class="hiddenInput c-check">
        <label for="idBug" class="c-label"> Bug
        </label>
      </div>
    </div>


    <div class="row">

      <div class="col categorie col-6">
      <input type="checkbox" value="Hunt" id="idHunt" class="hiddenInput c-check">
        <label for="idHunt" class="c-label"></input>Hunt</label>
      </div>
      <div class="col categorie col-6">
      <input type="checkbox" value="True" id="idTrue" class="hiddenInput c-check"></input>
        <label for="idTrue" class="c-label">True</label>
      </div>
      <div class="col categorie col-6">
      <input type="checkbox" value="Bald" id="idBald" class="hiddenInput c-check">
      <label for="idBald" class="c-label">Bald</label>
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