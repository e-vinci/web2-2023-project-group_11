const HomePage = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <div class="container px-4 text-center" >
  <div class="row gx-5 gap-2 row-gap-2">
    <div class="col">
     <div class="p-3">Custom column padding</div>
    </div>
    <div class="col">
      <div class="p-3">Custom column padding</div>
    </div>
  </div>
</div>
<div class="container px-4 text-center">
  <div class="row gx-5 gap-2 row-gap-2">
    <div class="col">
     <div class="p-3">Custom column padding</div>
    </div>
    <div class="col">
      <div class="p-3">Custom column padding</div>
    </div>
  </div>
</div>
  `;
};

export default HomePage;
