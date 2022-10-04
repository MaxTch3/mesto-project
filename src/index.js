import './pages/index.css';
import createCard from './components/card.js'
import { modifyProfileData, addCardFromForm, addCard, resetForm, patchAvatarFromForm } from "./components/utils.js";
import { openPopup, closePopup } from "./components/modal.js";
import enableValidation from "./components/validate.js";
import { getInitialCard, getUserInfo } from './components/api.js';

export const avatarImage = document.querySelector('.profile__image');
const avatarEditButton = document.querySelector('.profile__avatar-button');
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
export const avatarPopup = document.querySelector('.popup_type_avatar');
const formAvatarEdit = avatarPopup.querySelector('.popup__form');
export const avatarUrlInput = formAvatarEdit.querySelector('.popup__input_name_avatar-url');
const popups = document.querySelectorAll('.popup');

let profileId = "";
let cardId = "";
let like;

getUserInfo()
  .then((result) => {
    console.log(result);
    profileTitle.textContent = result.name;
    profileSubtitle.textContent = result.about;
    avatarImage.src = result.avatar;
    profileId = result._id;
  })
  .catch((err) => {
    console.log(err);
  })

getInitialCard()
  .then((result) => {
    console.log(result);
    result.reverse().forEach((item) => {
      const idMatch = item.owner._id === profileId;
      like = item.likes.some(el => el._id == profileId);
      console.log(like);
      cardId = item._id;
      const newCard = createCard(item.name, item.link, item.likes.length, idMatch, cardId, like);
      addCard(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  })

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

avatarEditButton.addEventListener('click', function () {
  resetForm(avatarPopup);
  openPopup(avatarPopup)
})

profileEditButton.addEventListener('click', function () {
  resetForm(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(profilePopup)
});



profileAddButton.addEventListener('click', function () {
  resetForm(cardPopup)
  openPopup(cardPopup)
});

formEditProfile.addEventListener('submit', modifyProfileData);

formAddCard.addEventListener('submit', addCardFromForm);

formAvatarEdit.addEventListener('submit', patchAvatarFromForm);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

