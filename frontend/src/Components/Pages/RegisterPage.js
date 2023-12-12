import { setAuthenticatedUser } from '../../utils/auth';
import { clearPage,renderPageTitle  } from '../../utils/render';
import Navbar from '../Navbar/Navbar';
import {Navigate} from "../Router/Navigate";

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
        <label for="usernameRegister">Username</label>
        <input type="text" class="form-control" id="usernameRegister" aria-describedby="usernameHelp" placeholder="Enter username">
      </div>
      <div class="form-group w-50 p-3">
        <label for="passwordRegister">Password</label>
        <input type="password" class="form-control" id="registerPassword" placeholder="Password" minlength="8">
        <small id="passwordHelp" class="form-text text-muted">We'll never share your password with anyone else.</small>
      </div>
      <div class="form-group p-3"><button type="submit" class="btn btn-primary" value="Register">S'inscrire</button></div>
    </form></div>
  `;
  // eslint-disable-next-line no-unused-vars
  const form = main.querySelector('form');
  form.addEventListener('submit', onRegister);
}

async function onRegister(e) {
  e.preventDefault();

  const username = document.querySelector('#usernameRegister').value;
  const password = document.querySelector('#registerPassword').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/auths/register`, options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const authenticatedUser = await response.json();

  console.log('Newly registered & authenticated user : ', authenticatedUser);

  setAuthenticatedUser(authenticatedUser);

  Navbar();

  Navigate('/');
}
  export default RegisterPage;