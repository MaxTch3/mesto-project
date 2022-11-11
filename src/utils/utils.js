export function renderLoading(isLoading, form) {
  const submitButton = form.querySelector('.popup__submit');
  if (isLoading) {
    submitButton.classList.add('popup__submit_loading')
  } else {
    submitButton.classList.remove('popup__submit_loading')
  };
}
