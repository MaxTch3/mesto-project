const popUp = document.querySelector('.popup');

// функция открытия/закрытия PopUp окна
function togglePopUp() {
  popUp.classList.toggle('popup_opened')
}

// кнопка Редактирования профиля - вызываем окно PopUp
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', togglePopUp);

// кнопка Закрытия формы в PopUp - закрываем форму PopUp
const popupCloseButton = popUp.querySelector('.popup__close-button');
popupCloseButton.addEventListener('click', togglePopUp);


const formElement = popUp.querySelector('.popup__form');

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
  togglePopUp();
}
formElement.addEventListener('submit', formSubmitHandler);

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

const elements = document.querySelector('.elements');
const elementsList = [];

for (let i = 0; i < initialCards.length; i++) {
  const element = elements.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__title');
  elementImage.src = initialCards[i].link;
  elementName.textContent = initialCards[i].name;
  elementsList[i] = element;
}
//Освобождаемся от элементов в разметке
elements.innerHTML = '';

//Записываем новые значения element в elements
for (let i = 0; i < elementsList.length; i++) {
  elements.append(elementsList[i]);
}
