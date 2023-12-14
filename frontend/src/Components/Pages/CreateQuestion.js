/* eslint-disable no-unused-vars */
import clearPage from '../../utils/render';
/* eslint-disable spaced-comment */
const CreateQuestion = () => {
    clearPage();
   
    const form = document.createElement('form');
    form.id = 'questionForm';

  const createInput = (labelText, inputId, inputName, isCheckbox = false) => {
    const label = document.createElement('label');
    label.textContent = labelText;

    const input = isCheckbox ? document.createElement('input') : document.createElement('textarea');
    input.type = isCheckbox ? 'checkbox' : 'text';
    input.id = inputId;
    input.name = inputName;

    form.appendChild(label);
    form.appendChild(input);
 };

 createInput('Question Text:', 'questionText', 'questionText');
 createInput('Answer 1:', 'answer1', 'answer1');
 createInput('Is Correct?', 'isCorrect1', 'isCorrect1', true);
 createInput('Answer 2:', 'answer2', 'answer2');
 createInput('Is Correct?', 'isCorrect2', 'isCorrect2', true);
 createInput('Answer 3:', 'answer3', 'answer3');
 createInput('Is Correct?', 'isCorrect3', 'isCorrect3', true);
 createInput('Answer 4:', 'answer4', 'answer4');
 createInput('Is Correct?', 'isCorrect4', 'isCorrect4', true);

 const submitButton = document.createElement('button');
 submitButton.textContent = 'Submit';
 submitButton.type = 'button';
 //submitButton.addEventListener('click', submitForm); à faire la methode

 form.appendChild(submitButton);

 document.body.appendChild(form);
}

/*const submitForm = () => {
}*/

export default CreateQuestion;