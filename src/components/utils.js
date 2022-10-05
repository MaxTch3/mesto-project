export const avatarImage = document.querySelector('.profile__image');
export const avatarEditButton = document.querySelector('.profile__avatar-button');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const profilePopup = document.querySelector('.popup_type_profile');
export const formEditProfile = profilePopup.querySelector('.popup__form');
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
export const formAvatarEdit = avatarPopup.querySelector('.popup__form');
export const avatarUrlInput = formAvatarEdit.querySelector('.popup__input_name_avatar-url');
export const popups = document.querySelectorAll('.popup');

export function renderLoading(isLoading, form) {
  const submitButton = form.querySelector('.popup__submit');
  if (isLoading) {
    submitButton.classList.add('popup__submit_loading')
  } else {
    submitButton.classList.remove('popup__submit_loading')
  };
}
