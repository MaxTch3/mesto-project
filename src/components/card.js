import { cardElement, viewerImage, imagePopup, captionImage } from "./index.js";

export default function createCard(name, url) {
  const element = cardElement.cloneNode(true)
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__title');
  const buttonLike = element.querySelector('.element__like-button');
  const buttonDelete = element.querySelector('.element__delete-button');
  elementName.textContent = name;
  elementImage.src = url;
  elementImage.alt = name;
  buttonLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
  });
  buttonDelete.addEventListener('click', function (evt) {
    const cardToDelete = evt.target.parentElement;
    cardToDelete.remove();
  });
  elementImage.addEventListener('click', function (evt) {
    imagePopup.classList.toggle('popup_opened');
    viewerImage.src = elementImage.src;
    viewerImage.alt = elementName.textContent;
    captionImage.textContent = elementName.textContent
  });
  return element
};

