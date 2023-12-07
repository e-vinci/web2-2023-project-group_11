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
      <div class="form-group w-50 p-3">
        <label for="emailRegister">Email address</label>
        <input type="email" class="form-control" id="emailRegister" aria-describedby="emailHelp" placeholder="Enter email">
      </div>
      <div class="form-group w-50 p-3">
        <label for="usernameRegister">Username</label>
        <input type="text" class="form-control" id="emailRegister" aria-describedby="usernameHelp" placeholder="Enter username">
      </div>
      <div class="form-group w-50 p-3">
        <label for="passwordRegister">Password</label>
        <input type="password" class="form-control" id="registerPassword" placeholder="Password">
        <small id="emailHelp" class="form-text text-muted">We'll never share your password with anyone else.</small>
      </div>
      <div class="form-group p-3"><button type="submit" class="btn btn-primary" value="Register">S'inscrire</button></div>
    </form></div>
  `;
  // eslint-disable-next-line no-unused-vars
  const form = main.querySelector('form')
};
  export default RegisterPage;