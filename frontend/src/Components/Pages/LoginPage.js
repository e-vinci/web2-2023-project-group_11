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
    <div class="form-group w-50 p-3">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" class="form-control" id="input_email_login" aria-describedby="emailHelp" placeholder="Enter email">
    </div>
    <div class="form-group w-50 p-3">
      <label for="loginPassword">Password</label>
      <input type="password" class="form-control" id="input_password_login" placeholder="Password">
      <small id="pswHelp" class="form-text text-muted">We'll never share your password with anyone else.</small>
    </div>
    <div class="form-group p-3"><button type="submit" class="btn btn-primary " >Se connecter</button>
    </div>
  </form>`;
  };

  export default LoginPage;