import { profileTitle, profileSubtitle, profilePopup, imageNameInput, imageUrlInput, formAddCard, cardPopup, cardsContainer, nameInput, jobInput } from "../index.js";
import { closePopup } from "./modal.js";
import createCard from "./card.js";

export function modifyProfileData(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(profilePopup);
};

export function addCard(card) {
  cardsContainer.prepend(card);
};

export function addCardFromForm(evt) {
  evt.preventDefault();
  const name = imageNameInput.value;
  const url = imageUrlInput.value;
  addCard(createCard(name, url));
  formAddCard.reset();
  closePopup(cardPopup);
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
