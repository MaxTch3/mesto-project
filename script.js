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

const popUpEditProfile = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function () {
  togglePopUp(popUpEditProfile)
});

const popupCloseButton = popUpEditProfile.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', function () {
  togglePopUp(popUpEditProfile)
});

const formElement = popUpEditProfile.querySelector('.popup__form');
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
  togglePopUp(popUpEditProfile);
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
    const viewerPopUp = document.querySelector('.popup_opacity_photo-viewer');
    viewerPopUp.classList.toggle('popup_opened');
    const viewerImage = viewerPopUp.querySelector('.popup__image');
    viewerImage.src = elementImage.src;
    viewerImage.alt = elementName.textContent;
    const caption = viewerPopUp.querySelector('.popup__caption');
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

const popUpAddCard = popUpEditProfile.cloneNode(true);
const formPopUpAddCard = popUpAddCard.querySelector('.popup__form');
formPopUpAddCard.name = 'add-form';
const titlePopUpAddCard = popUpAddCard.querySelector('.popup__title');
titlePopUpAddCard.textContent = 'Новое место';
const inputPopUp = popUpAddCard.querySelectorAll('.popup__input');
inputPopUp[0].classList = 'popup__input popup__input_name_image-title';
inputPopUp[0].name = 'image-name';
inputPopUp[0].value = '';
inputPopUp[0].placeholder = 'Название';
inputPopUp[1].classList = 'popup__input popup__input_name_image-url';
inputPopUp[1].name = 'image-url';
inputPopUp[1].value = '';
inputPopUp[1].placeholder = 'Ссылка на картинку';
const addButton = popUpAddCard.querySelector('.popup__submit');
addButton.textContent = 'Создать';
popUpEditProfile.after(popUpAddCard);

const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function () {
  togglePopUp(popUpAddCard)
});

const popupAddCardCloseButton = popUpAddCard.querySelector('.popup__close-button');
popupAddCardCloseButton.addEventListener('click', function () {
  togglePopUp(popUpAddCard)
});

const formAddElement = popUpAddCard.querySelector('.popup__form');

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  const name = formAddElement.querySelector('.popup__input_name_image-title').value;
  const url = formAddElement.querySelector('.popup__input_name_image-url').value;
  addCard(createCard(name, url));
  formAddElement.querySelector('.popup__input_name_image-title').value = '';
  formAddElement.querySelector('.popup__input_name_image-url').value = '';
  togglePopUp(popUpAddCard);
}

formAddElement.addEventListener('submit', formAddSubmitHandler);

const viewerPopUp = document.querySelector('.popup_opacity_photo-viewer');
const closeViewerButton = viewerPopUp.querySelector('.popup__close-button');
closeViewerButton.addEventListener('click', function () {
  togglePopUp(viewerPopUp)
});

