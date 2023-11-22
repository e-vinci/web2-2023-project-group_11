
const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container text-center quizz-grid">
   <div class="row">

     <div class="col Sport col-6">
     Sport
     </div>
     <div class="col Boug col-6">
     Boug
     </div>

   <div class="row">

    <div class="col Hunt col-6">
    Hunt
    </div>
    <div class="col True">
    True
    </div>
    <div class="col Bald">
    Bald
    </div>

  </div>
  </div>
</div>

<iframe width="420" height="315" style ="padding-top: 120px;"
src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>
  `;
};

export default HomePage;