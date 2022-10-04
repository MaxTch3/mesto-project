import { profileTitle, profileSubtitle, profilePopup, imageNameInput, imageUrlInput, formAddCard, cardPopup, cardsContainer, nameInput, jobInput, avatarPopup, avatarUrlInput, avatarImage } from "../index.js";
import { closePopup } from "./modal.js";
import createCard from "./card.js";
import { patchAvatar, postNewCard, setUserInfo } from "./api.js";

export function addCard(card) {
  cardsContainer.prepend(card);
};

export function resetForm(popup) {
  popup.querySelector('.popup__form').reset();
  const inputElements = popup.querySelectorAll('.popup__input');
  const errorElements = popup.querySelectorAll('.popup__input-error');
  inputElements.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
  });
  errorElements.forEach((errorElement) => {
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
  });
  popup.querySelector('.popup__submit').disabled = true;
}

export function renderLoading(isLoading, form) {
  const submitButton = form.querySelector('.popup__submit');
  if (isLoading) {
    submitButton.classList.add('popup__submit_loading')
  } else {
    submitButton.classList.remove('popup__submit_loading')
  };
}

export function modifyProfileData(evt) {
  evt.preventDefault();
  renderLoading(true, profilePopup);
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  setUserInfo(nameInput.value, jobInput.value)
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, profilePopup)
    })
  closePopup(profilePopup);
};

export function addCardFromForm(evt) {
  evt.preventDefault();
  renderLoading(true, cardPopup)
  const name = imageNameInput.value;
  const url = imageUrlInput.value;
  const likeNumber = 0;
  const idMatch = true;
  const cardId = 0;
  const like = false;
  addCard(createCard(name, url, likeNumber, idMatch, cardId, like));
  postNewCard(name, url)
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, cardPopup)
    })
  formAddCard.reset();
  closePopup(cardPopup);
};

export function patchAvatarFromForm(evt) {
  evt.preventDefault();
  renderLoading(true, avatarPopup)
  const avatarUrl = avatarUrlInput.value;
  patchAvatar(avatarUrl)
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, avatarPopup)
    });
  avatarImage.src = avatarUrl;
  closePopup(avatarPopup);
}
