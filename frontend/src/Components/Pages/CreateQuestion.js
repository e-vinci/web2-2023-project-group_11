/*
import { getAuthenticatedUser } from '../../utils/auths';
import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';

const AddQuestionPage = () => {
  clearPage();
  renderPageTitle('Add a question to a quizz');
  renderAddQuestionForm();
};

function renderAddQuestionForm() {
  const main = document.querySelector('main');
  const form = document.createElement('form');
  form.className = 'p-5';
  const nQuestion = document.createElement('input');
  nQuestion.type = 'text';
  nQuestion.id = 'title';
  nQuestion.placeholder = 'New question';
  nQuestion.required = true;
  nQuestion.className = 'form-control mb-3';

  const proposal1 = document.createElement('input');
  proposal1.type = 'text';
  proposal1.id = 'content';
  proposal1.required = true;
  proposal1.placeholder = 'Proposal n°1 of your question';
  proposal1.className = 'form-control mb-3';

  const proposal2 = document.createElement('input');
  proposal2.type = 'text';
  proposal2.id = 'content';
  proposal2.required = true;
  proposal2.placeholder = 'Proposal n°2 of your question';
  proposal2.className = 'form-control mb-3';
  
  const proposal3 = document.createElement('input');
  proposal3.type = 'text';
  proposal3.id = 'content';
  proposal3.required = true;
  proposal3.placeholder = 'Proposal n°3 of your question';
  proposal3.className = 'form-control mb-3';
  
  const proposal4 = document.createElement('input');
  proposal4.type = 'text';
  proposal4.id = 'content';
  proposal4.required = true;
  proposal4.placeholder = 'Content of your question';
  proposal4.className = 'form-control mb-3';

  
  const goodAnswer = document.createElement('input');
  proposal1.type = 'text';
  proposal1.id = 'content';
  proposal1.required = true;
  proposal1.placeholder = 'Content of your question';
  proposal1.className = 'form-control mb-3';

  const submit = document.createElement('input');
  submit.value = 'Add question to a category';
  submit.type = 'submit';
  submit.className = 'btn btn-danger';
  form.appendChild(nQuestion);
  form.appendChild(content);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', onAddQuestion);
}

async function onAddQuestion(e) {
  e.preventDefault();

  const nQuestion = document.querySelector('#nQuestion').value;
  const category = document.querySelector('#category').value;
  const content = document.querySelector('#content').value;

  const authenticatedUser = getAuthenticatedUser();

  const options = {
    method: 'POST',
    body: JSON.stringify({
      nQuestion,
      content,
      category,
    }),
    headers: {
      'Content-Type': 'application/json',

      Authorization: authenticatedUser.token,
    },
  };

  const response = await fetch('/api/question', options);

  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

  const newQuestion = await response.json();

  console.log('New question added : ', newQuestion);

  Navigate('/');
}

export default AddQuestionPage;

*/

import Navigate from '../Router/Navigate';
import { addOneMovie } from '../../models/movies';

const AddMoviePage = () => {
  const addMoviePage = `
<div class="text-center">
  <h3>Movies</h3>

  <p>Here you can find all movies</p>

  <form class="px-5">
            <div class="mb-3">
              <label for="title">Enter title</label>
              <input
                class="form-control"
                type="text"
                name="title"
                id="title"
                required
              />
            </div>
            <div class="mb-3">
              <label for="duration">Enter duration (minutes)</label>
              <input
                class="form-control"
                type="number"
                name="duration"
                id="duration"
                required
              />
            </div>
            <div class="mb-3">
              <label for="budget">Enter budget (million)</label>
              <input
                class="form-control"
                type="number"
                name="budget"
                id="budget"
                required
              />
            </div>
            <div class="mb-3">
              <label for="link">Enter link</label>
              <input
                class="form-control"
                type="url"
                name="link"
                id="link"
                required
              />
            </div>
            <input type="submit" class="btn btn-primary" value="Add Moovie" />
    </form>  
</div>`;

  const main = document.querySelector('main');
  main.innerHTML = addMoviePage;

  const myForm = document.querySelector('form');
  const question = document.querySelector('#question');
  const proposal1 = document.querySelector('#proposal1');
  const proposal2 = document.querySelector('#proposal2');
  const proposal3 = document.querySelector('#proposal3');
  const proposal4 = document.querySelector('#proposal4');
  const answer = document.querySelector('#answer');


  const  = document.querySelector('#duration');
  const duration = document.querySelector('#duration');
  const duration = document.querySelector('#duration');
  const duration = document.querySelector('#duration');
  const budget = document.querySelector('#budget');
  const link = document.querySelector('#link');

  myForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const questionToBeCreated = {
      question: question.value,
      proposition1 : proposition1.value,
      proposition2 : proposition2.value,
      proposition3 : proposition3.value,
      proposition4 : proposition4.value,
      answer: answer.value,
    };

    await addOneQuestion(questionToBeCreated);
    Navigate('/question');
  });
};

export default addOneQuestion;