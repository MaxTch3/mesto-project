const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('.popup_type_profile');
const popupCloseButton = profilePopup.querySelector('.popup__close-button');
const formEditProfile = profilePopup.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_name_name-and-surname');
const jobInput = formEditProfile.querySelector('.popup__input_name_work');
const cardsContainer = document.querySelector('.elements');
const cardElement = cardsContainer.querySelector('#element').content;
const cardPopup = document.querySelector('.popup_type_card');
const buttonCloseCardPopup = cardPopup.querySelector('.popup__close-button');
const formAddCard = cardPopup.querySelector('.popup__form');
const imageNameInput = formAddCard.querySelector('.popup__input_name_image-title');
const imageUrlInput = formAddCard.querySelector('.popup__input_name_image-url');
const imagePopup = document.querySelector('.popup_type_image');
const viewerImage = imagePopup.querySelector('.popup__image');
const captionImage = imagePopup.querySelector('.popup__caption');
const buttonCloseImagePopup = imagePopup.querySelector('.popup__close-button');

function openPopup(popUp) {
  popUp.classList.add('popup_opened')
};

function closePopup(popUp) {
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

function modifyProfileData(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(profilePopup);
};

function createCard(name, url) {
  const element = cardElement.cloneNode(true)
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__title');
  const buttonLike = element.querySelector('.element__like-button');
  const buttonDelete = element.querySelector('.element__delete-button');
  elementName.textContent = name;
  elementImage.src = url;
  elementImage.alt = name;
  buttonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  buttonDelete.addEventListener('click', function (evt) {
    const cardToDelete = evt.target.parentElement;
    cardToDelete.remove();
  });
  elementImage.addEventListener('click', function (evt) {
    imagePopup.classList.toggle('popup_opened');
    viewerImage.src = elementImage.src;
    viewerImage.alt = elementName.textContent;
    captionImage.textContent = elementName.textContent
  });
  return element
};

function addCard(card) {
  cardsContainer.prepend(card);
};

function addCardFromForm(evt) {
  evt.preventDefault();
  const name = imageNameInput.value;
  const url = imageUrlInput.value;
  addCard(createCard(name, url));
  formAddCard.reset();
  closePopup(cardPopup);
};

function closePopupEventHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

profileEditButton.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(profilePopup)
});

popupCloseButton.addEventListener('click', function () {
  closePopup(profilePopup)
});

formEditProfile.addEventListener('submit', modifyProfileData);

profileAddButton.addEventListener('click', function () {
  openPopup(cardPopup)
});

buttonCloseCardPopup.addEventListener('click', function () {
  closePopup(cardPopup)
});

formAddCard.addEventListener('submit', addCardFromForm);

buttonCloseImagePopup.addEventListener('click', function () {
  closePopup(imagePopup)
});

profilePopup.addEventListener('mousedown', closePopupEventHandler);
cardPopup.addEventListener('mousedown', closePopupEventHandler);
imagePopup.addEventListener('mousedown', closePopupEventHandler);

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(profilePopup);
    closePopup(cardPopup);
    closePopup(imagePopup);
  }
})

initialCards.forEach((item) => {
  const newCard = createCard(item.name, item.link);
  addCard(newCard);
});

//-------------------------------

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Разрешены латинские буквы, кириллические буквы, знаки дефиса и пробелы ");
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();


