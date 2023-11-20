const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container px-4 text-center mb-20">
  <div class="row gx-5 gap-2 row-gap-2">
    <div class="col">
     <div class="p-3"> Sport </div>
    </div>
    <div class="col">
      <div class="p-3"> Animaux </div>
    </div>
  </div>
</div>
<div class="container px-4 text-center">
  <div class="row gx-5 gap-2 row-gap-2">
    <div class="col">
     <div class="p-3"> Jeux </div>
    </div>
    <div class="col">
      <div class="p-3"> Poulet </div>
    </div>
  </div>
</div>
  `;
};

export default HomePage;
