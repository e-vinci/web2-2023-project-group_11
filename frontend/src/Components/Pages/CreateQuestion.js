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
}

export default CreateQuestion;