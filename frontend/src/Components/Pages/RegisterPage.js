import { clearPage,renderPageTitle  } from '../../utils/render';


const RegisterPage = () => {
    clearPage();
    renderPageTitle('Register');
    renderRegisterPage();

  };

function renderRegisterPage() {
    const main = document.querySelector('main');
    main.innerHTML = `<h1 class="text-center">Inscrivez-vous pour tenter de vous trouver dans le tableau des meilleurs score !</h1>
    <div class="center-form"><form>
      <div class="form-group">
        <label for="emailRegister">Email address</label>
        <input type="email" class="form-control" id="emailRegister" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="usernameRegister">Username</label>
        <input type="text" class="form-control" id="emailRegister" aria-describedby="usernameHelp" placeholder="Enter username">
      </div>
      <div class="form-group">
        <label for="passwordRegister">Password</label>
        <input type="password" class="form-control" id="registerPassword" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">S'inscrire</button>
    </form></div>
  `;
};
  export default RegisterPage;