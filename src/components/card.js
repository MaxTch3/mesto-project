import { cardElement, viewerImage, imagePopup, captionImage } from "../index.js";
import { openPopup } from "./modal.js";

export default function createCard(name, url, likeNumber, idMatch, cardId, like) {
  const element = cardElement.cloneNode(true)
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__title');
  const buttonLike = element.querySelector('.element__like-button');
  const elementLikeNumber = element.querySelector('.element__like-number');
  const buttonDelete = element.querySelector('.element__delete-button');
  elementName.textContent = name;
  elementImage.src = url;
  elementImage.alt = name;
  elementLikeNumber.textContent = likeNumber;
  if (like === true) {
    buttonLike.classList.add('element__like-button_active');
  };
  buttonLike.addEventListener('click', function (evt) {
    if (!buttonLike.classList.contains('element__like-button_active')) {
      fetch(`https://nomoreparties.co/v1/plus-cohort-15/cards/likes/${cardId}`,
        {
          method: 'PUT',
          headers: {
            authorization: 'df96d3b0-3822-438d-a20e-f1a1a788e6cc'
          }
        });
      likeNumber++;
      elementLikeNumber.textContent = likeNumber;
    } else {
      fetch(`https://nomoreparties.co/v1/plus-cohort-15/cards/likes/${cardId}`,
        {
          method: 'DELETE',
          headers: {
            authorization: 'df96d3b0-3822-438d-a20e-f1a1a788e6cc'
          }
        });
      likeNumber--;
      elementLikeNumber.textContent = likeNumber;
    }
    evt.target.classList.toggle('element__like-button_active');
  });
  if (!idMatch) {
    buttonDelete.disabled = true
  } else {
    buttonDelete.addEventListener('click', function (evt) {
      const cardToDelete = evt.target.parentElement;
      cardToDelete.remove();
      fetch(`https://nomoreparties.co/v1/plus-cohort-15/cards/${cardId}`,
        {
          method: 'DELETE',
          headers: {
            authorization: 'df96d3b0-3822-438d-a20e-f1a1a788e6cc'
          }
        });
    });
  }

  elementImage.addEventListener('click', function () {
    openPopup(imagePopup);
    viewerImage.src = elementImage.src;
    viewerImage.alt = elementName.textContent;
    captionImage.textContent = elementName.textContent
  });
  return element
};

