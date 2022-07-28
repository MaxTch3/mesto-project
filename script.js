const popUp = document.querySelector('.popup');

// функция открытия/закрытия PopUp окна
function togglePopUp() {
  popUp.classList.toggle('popup_opened')
};

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
    const viewerPopUp = document.querySelector('.popup_opacity_photo-viewer');//Исправить название класса!!!
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

//----------------------------------------------------------
//Форма добавления карточки
//----------------------------------------------------------
//Копируем popUp
const popUpAddCard = popUp.cloneNode(true);
//Изменяем имя формы
const formPopUpAddCard = popUpAddCard.querySelector('.popup__form');
formPopUpAddCard.name = 'add-form';
//Заменяем заголовок карточки
const titlePopUpAddCard = popUpAddCard.querySelector('.popup__title');
titlePopUpAddCard.textContent = 'Новое место';
//Заменяем классы полей ввода
const inputPopUp = popUpAddCard.querySelectorAll('.popup__input');
inputPopUp[0].classList = 'popup__input popup__input_name_image-title';
inputPopUp[0].name = 'image-name';
inputPopUp[0].value = '';
inputPopUp[0].placeholder = 'Название';
inputPopUp[1].classList = 'popup__input popup__input_name_image-url';
inputPopUp[1].name = 'image-url';
inputPopUp[1].value = '';
inputPopUp[1].placeholder = 'Ссылка на картинку';

// изменяем имя на кнопке
const addButton = popUpAddCard.querySelector('.popup__submit');
addButton.textContent = 'Создать';
// Добавляем форму в разметку
popUp.after(popUpAddCard);

function togglePopUpAddCard() {
  popUpAddCard.classList.toggle('popup_opened')
};

const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', togglePopUpAddCard);

const popupAddCardCloseButton = popUpAddCard.querySelector('.popup__close-button');
popupAddCardCloseButton.addEventListener('click', togglePopUpAddCard);

//Добавляем возможность добавлять карточки
const formAddElement = popUpAddCard.querySelector('.popup__form');

function formAddSubmitHandler(evt) {
  evt.preventDefault();
  let name = formAddElement.querySelector('.popup__input_name_image-title').value;
  let url = formAddElement.querySelector('.popup__input_name_image-url').value;
  addCard(createCard(name, url));
  formAddElement.querySelector('.popup__input_name_image-title').value = '';
  formAddElement.querySelector('.popup__input_name_image-url').value = '';
  togglePopUpAddCard();
}

formAddElement.addEventListener('submit', formAddSubmitHandler);

//Подключаем форму просмотра

const viewerPopUp = document.querySelector('.popup_opacity_photo-viewer');
const closeViewerButton = viewerPopUp.querySelector('.popup__close-button');
closeViewerButton.addEventListener('click', function (evt) {
  viewerPopUp.classList.remove('popup_opened');
});

