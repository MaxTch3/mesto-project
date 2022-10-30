export const avatarImage = document.querySelector('.profile__image');
export const avatarEditButton = document.querySelector('.profile__avatar-button');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profilePopupSelector = document.querySelector('.popup_type_profile');
export const formEditProfile = profilePopupSelector.querySelector('.popup__form');
export const nameInput = formEditProfile.querySelector('.popup__input_name_name-and-surname');
export const jobInput = formEditProfile.querySelector('.popup__input_name_work');
export const cardsContainer = document.querySelector('.elements');
export const cardElement = cardsContainer.querySelector('#element').content;
export const cardPopupSelector = document.querySelector('.popup_type_card');
export const formAddCard = cardPopupSelector.querySelector('.popup__form');
export const imageNameInput = formAddCard.querySelector('.popup__input_name_image-title');
export const imageUrlInput = formAddCard.querySelector('.popup__input_name_image-url');
export const imagePopupSelector = document.querySelector('.popup_type_image');
export const viewerImage = imagePopupSelector.querySelector('.popup__image');
export const captionImage = imagePopupSelector.querySelector('.popup__caption');
export const avatarPopupSelector = document.querySelector('.popup_type_avatar');
export const formAvatarEdit = avatarPopupSelector.querySelector('.popup__form');
export const avatarUrlInput = formAvatarEdit.querySelector('.popup__input_name_avatar-url');
export const popups = document.querySelectorAll('.popup');
export const cardSelector = '#element'

export const settingsValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
  inputErrorSelector: '.popup__input-error',
};
