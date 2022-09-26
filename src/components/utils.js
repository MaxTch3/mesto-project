import { profileTitle, profileSubtitle, profilePopup, imageNameInput, imageUrlInput, formAddCard, cardPopup, cardsContainer, nameInput, jobInput } from "./index.js";
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


