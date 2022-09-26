
export function openPopup(popUp) {
  popUp.classList.add('popup_opened')
};

export function closePopup(popUp) {
  popUp.classList.remove('popup_opened');
  popUp.querySelector('.popup__form').reset();
  const inputElements = popUp.querySelectorAll('.popup__input');
  const errorElements = popUp.querySelectorAll('.popup__input-error');
  inputElements.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
  });
  errorElements.forEach((errorElement) => {
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  });
  popUp.querySelector('.popup__submit').disabled = true;
};

export function closePopupEventHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};
