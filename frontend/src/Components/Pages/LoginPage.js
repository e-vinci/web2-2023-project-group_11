import { clearPage,renderPageTitle  } from '../../utils/render';


const LoginPage = () => {
    clearPage();
    renderPageTitle('Register');
    renderLoginPage();

  };

function renderLoginPage() {
    const main = document.querySelector('main');
    main.innerHTML = `<h1 class="text-center">Connectez vous pour enregistrer votre score !</h1>
    <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="loginPassword">Password</label>
      <input type="password" class="form-control" id="loginPassword" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary">Se connecter</button>
  </form>`;
  };

  export default LoginPage;