import { closeByEscape } from "./utils.js";

export function openPopup(popUp) {
  popUp.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

export function closePopup(popUp) {
  popUp.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};
