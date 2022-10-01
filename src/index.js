import './pages/index.css';
import createCard from './components/card.js'
import { modifyProfileData, addCardFromForm, addCard, resetForm } from "./components/utils.js";
import { openPopup, closePopup } from "./components/modal.js";
import enableValidation from "./components/validate.js";

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profilePopup = document.querySelector('.popup_type_profile');
const formEditProfile = profilePopup.querySelector('.popup__form');
export const nameInput = formEditProfile.querySelector('.popup__input_name_name-and-surname');
export const jobInput = formEditProfile.querySelector('.popup__input_name_work');
export const cardsContainer = document.querySelector('.elements');
export const cardElement = cardsContainer.querySelector('#element').content;
export const cardPopup = document.querySelector('.popup_type_card');
export const formAddCard = cardPopup.querySelector('.popup__form');
export const imageNameInput = formAddCard.querySelector('.popup__input_name_image-title');
export const imageUrlInput = formAddCard.querySelector('.popup__input_name_image-url');
export const imagePopup = document.querySelector('.popup_type_image');
export const viewerImage = imagePopup.querySelector('.popup__image');
export const captionImage = imagePopup.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');

function getUserInfo() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me', {
    method: 'GET',
    headers: {
      authorization: 'df96d3b0-3822-438d-a20e-f1a1a788e6cc'
    }
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      profileTitle.textContent = result.name;
      profileSubtitle.textContent = result.about;
    });
};

export function setUserInfo(name, job) {
  return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'df96d3b0-3822-438d-a20e-f1a1a788e6cc',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: job
    })
  });
}

getUserInfo();

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
});

profileEditButton.addEventListener('click', function () {
  resetForm(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(profilePopup)
});

formEditProfile.addEventListener('submit', modifyProfileData);

profileAddButton.addEventListener('click', function () {
  resetForm(cardPopup)
  openPopup(cardPopup)
});

formAddCard.addEventListener('submit', addCardFromForm);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

function getInitialCard() {
  return fetch('https://nomoreparties.co/v1/plus-cohort-15/cards', {
    method: 'GET',
    headers: {
      authorization: 'df96d3b0-3822-438d-a20e-f1a1a788e6cc'
    }
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      result.forEach((item) => {
        const newCard = createCard(item.name, item.link, item.likes.length);
        console.log(item.likes)
        addCard(newCard);
      });
    });
};

getInitialCard();

export function postNewCard(name, link) {
    return fetch('https://nomoreparties.co/v1/plus-cohort-15/cards', {
      method: 'POST',
      headers: {
        authorization: 'df96d3b0-3822-438d-a20e-f1a1a788e6cc',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
}
