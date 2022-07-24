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



function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    togglePopUp();
}
formElement.addEventListener('submit', formSubmitHandler);
