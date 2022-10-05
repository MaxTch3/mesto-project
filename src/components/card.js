import { cardElement, viewerImage, imagePopup, captionImage } from "../index.js";
import { deleteCard, dislikeCard, likeCard } from "./api.js";
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
      likeCard(cardId)
        .catch((err) => {
          console.log(err)
        });
      likeNumber++;
      elementLikeNumber.textContent = likeNumber;
    } else {
      dislikeCard(cardId)
        .catch((err) => {
          console.log(err)
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
      deleteCard(cardId)
        .catch((err) => {
          console.log(err)
        })
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

