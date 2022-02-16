import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  feedback_form_state: { email: '', message: '' },
};

refs.form.addEventListener('submit', handleSubmit);
refs.form.addEventListener('input', throttle(inputDataRecord, 500));

checkLocalStorageForData();

function inputDataRecord(e) {
  refs.feedback_form_state[e.target.name] = e.target.value;

  const formInputJSON = JSON.stringify(refs.feedback_form_state);

  localStorage.setItem('feedback_form_state', formInputJSON);
}

function checkLocalStorageForData() {
  const dataStorage = JSON.parse(localStorage.getItem('feedback_form_state'));

  if (dataStorage) {
    refs.form.email.value = dataStorage.email;
    refs.form.message.value = dataStorage.message;
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const formData = e.currentTarget.elements;

  console.log(formData);

  e.currentTarget.reset();
  localStorage.removeItem('feedback_form_state');
}
