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

function togglePopUp(popUp) {
  popUp.classList.toggle('popup_opened')
};

const profilePopup = document.querySelector('.popup_type_profile');
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function () {
  togglePopUp(profilePopup)
});

const popupCloseButton = profilePopup.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', function () {
  togglePopUp(profilePopup)
});

const formElement = profilePopup.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const nameInput = formElement.querySelector('.popup__input_name_name-and-surname');
nameInput.value = profileTitle.textContent;
const profileSubtitle = document.querySelector('.profile__subtitle');
const jobInput = formElement.querySelector('.popup__input_name_work');
jobInput.value = profileSubtitle.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  togglePopUp(profilePopup);
}
formElement.addEventListener('submit', formSubmitHandler);

const elements = document.querySelector('.elements');

function createCard(name, url) {
  const element = elements.querySelector('#element').content.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__title');
  elementName.textContent = name;
  elementImage.src = url;
  elementImage.alt = name;

  const likeButton = element.querySelector('.element__like-button');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });

  const deleteButton = element.querySelector('.element__delete-button');
  deleteButton.addEventListener('click', function (evt) {
    const deleteCard = evt.target.parentElement;
    deleteCard.remove();
  });

  elementImage.addEventListener('click', function (evt) {
    const imagePopup = document.querySelector('.popup_type_image');
    imagePopup.classList.toggle('popup_opened');
    const viewerImage = imagePopup.querySelector('.popup__image');
    viewerImage.src = elementImage.src;
    viewerImage.alt = elementName.textContent;
    const caption = imagePopup.querySelector('.popup__caption');
    caption.textContent = elementName.textContent
  });
  return element
}

function addCard(card) {
  elements.prepend(card);
}

for (let i = 0; i < initialCards.length; i++) {
  const newCard = createCard(initialCards[i].name, initialCards[i].link);
  addCard(newCard);
}

const cardPopup = document.querySelector('.popup_type_card');
const formPopUpAddCard = cardPopup.querySelector('.popup__form');
const inputPopUp = cardPopup.querySelectorAll('.popup__input');

const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function () {
  togglePopUp(cardPopup)
});

const popupAddCardCloseButton = cardPopup.querySelector('.popup__close-button');
popupAddCardCloseButton.addEventListener('click', function () {
  togglePopUp(cardPopup)
});

const formAddElement = cardPopup.querySelector('.popup__form');

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const name = formAddElement.querySelector('.popup__input_name_image-title').value;
  const url = formAddElement.querySelector('.popup__input_name_image-url').value;
  addCard(createCard(name, url));
  formAddElement.querySelector('.popup__input_name_image-title').value = '';
  formAddElement.querySelector('.popup__input_name_image-url').value = '';
  togglePopUp(cardPopup);
}

formAddElement.addEventListener('submit', formAddSubmitHandler);

const imagePopup = document.querySelector('.popup_type_image');
const closeViewerButton = imagePopup.querySelector('.popup__close-button');
closeViewerButton.addEventListener('click', function () {
  togglePopUp(imagePopup)
});

