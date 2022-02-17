import throttle from 'lodash.throttle';

const formData = {};
const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', handleSubmit);
refs.form.addEventListener('input', throttle(inputDataFill, 500));

checkLocalStorageForData();

function handleSubmit(e) {
  e.preventDefault();

  const formDataFromElem = e.currentTarget.elements;

  if (!refs.form.email.value || !refs.form.message.value) {
    return alert('You have to fill in all fields!');
  }

  console.log(formDataFromElem);

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function inputDataFill(e) {
  formData.email = refs.form.email.value;
  formData.message = refs.form.message.value;

  formData[e.target.name] = e.target.value;

  const formInputJSON = JSON.stringify(formData);

  localStorage.setItem(STORAGE_KEY, formInputJSON);
}

function checkLocalStorageForData() {
  const dataStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (dataStorage) {
    refs.form.email.value = dataStorage.email;
    refs.form.message.value = dataStorage.message;
  }
}
