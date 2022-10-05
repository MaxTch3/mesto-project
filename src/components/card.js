import { handleLikeCard, handleDeleteCard } from "../index.js";
import { openPopup } from "./modal.js";
import { cardElement, viewerImage, imagePopup, captionImage } from "./utils.js";

export function createCard(profileId, item) {
  const element = cardElement.cloneNode(true)
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__title');
  const buttonLike = element.querySelector('.element__like-button');
  const elementLikeNumber = element.querySelector('.element__like-number');
  const buttonDelete = element.querySelector('.element__delete-button');
  const like = item.likes.some(el => el._id == profileId);
  const cardId = item._id;
  const idMatch = item.owner._id === profileId;

  elementName.textContent = item.name;
  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementLikeNumber.textContent = item.likes.length;

  if (like === true) {
    buttonLike.classList.add('element__like-button_active');
  };

  buttonLike.addEventListener('click', function (evt) {
    handleLikeCard(evt, cardId, elementLikeNumber)
  });

  if (!idMatch) {
    buttonDelete.disabled = true
  } else {
    buttonDelete.addEventListener('click', function (evt) {
      handleDeleteCard(evt, cardId);
    });
  }

  elementImage.addEventListener('click', function () {
    viewerImage.src = elementImage.src;
    viewerImage.alt = elementName.textContent;
    captionImage.textContent = elementName.textContent;
    openPopup(imagePopup);
  });
  return element
};

export function toggleLike(evt, numberLike, elementLikeNumber) {
  if (!evt.target.classList.contains('element__like-button_active')) {
    evt.target.classList.add('element__like-button_active');
  } else {
    evt.target.classList.remove('element__like-button_active');
  }
  elementLikeNumber.textContent = numberLike;
}

export function removeCard(evt) {
  const cardToDelete = evt.target.parentElement;
  cardToDelete.remove();
}

