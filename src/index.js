import './pages/index.css';
import { createCard, removeCard, toggleLike } from './components/card.js'
import { avatarEditButton, avatarImage, avatarPopup, avatarUrlInput, cardPopup, cardsContainer, formAddCard, formAvatarEdit, formEditProfile, imageNameInput, imageUrlInput, jobInput, nameInput, popups, profileAddButton, profileEditButton, profilePopup, profileSubtitle, profileTitle, renderLoading } from "./components/utils.js";
import { openPopup, closePopup } from "./components/modal.js";
import enableValidation from "./components/validate.js";
import { deleteCard, dislikeCard, getInitialCard, getUserInfo, likeCard, patchAvatar, postNewCard, setUserInfo } from './components/api.js';

let profileId = "";

function addCard(card) {
  cardsContainer.prepend(card);
};

export function addCardFromForm(evt) {
  evt.preventDefault();
  renderLoading(true, cardPopup)
  const name = imageNameInput.value;
  const url = imageUrlInput.value;
  postNewCard(name, url)
    .then((data) => {
      addCard(createCard(profileId, data));
      closePopup(cardPopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, cardPopup)
    })
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

export function modifyProfileData(evt) {
  evt.preventDefault();
  renderLoading(true, profilePopup);
  setUserInfo(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileSubtitle.textContent = jobInput.value;
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, profilePopup)
    })
};

export function patchAvatarFromForm(evt) {
  evt.preventDefault();
  renderLoading(true, avatarPopup)
  const avatarUrl = avatarUrlInput.value;
  patchAvatar(avatarUrl)
    .then(() => {
      avatarImage.src = avatarUrl;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, avatarPopup)
    });
}

export function handleLikeCard(evt, cardId, elementLikeNumber) {
  if (!evt.target.classList.contains('element__like-button_active')) {
    likeCard(cardId)
      .then((data) => {
        toggleLike(evt, data.likes.length, elementLikeNumber);
      })
      .catch((err) => {
        console.log(err)
      });
  } else {
    dislikeCard(cardId)
      .then((data) => {
        toggleLike(evt, data.likes.length, elementLikeNumber);
      })
      .catch((err) => {
        console.log(err)
      });
  }
};

export function handleDeleteCard(evt, cardId) {
  deleteCard(cardId)
    .then(() => {
      removeCard(evt)
    })
    .catch((err) => {
      console.log(err)
    })
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })
});

avatarEditButton.addEventListener('click', function () {
  resetForm(avatarPopup);
  openPopup(avatarPopup)
})

profileEditButton.addEventListener('click', function () {
  resetForm(profilePopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(profilePopup)
});

profileAddButton.addEventListener('click', function () {
  resetForm(cardPopup)
  openPopup(cardPopup)
});

formEditProfile.addEventListener('submit', modifyProfileData);

formAddCard.addEventListener('submit', addCardFromForm);

formAvatarEdit.addEventListener('submit', patchAvatarFromForm);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

getUserInfo()
  .then((result) => {
    profileTitle.textContent = result.name;
    profileSubtitle.textContent = result.about;
    avatarImage.src = result.avatar;
    profileId = result._id;
  })
  .catch((err) => {
    console.log(err);
  })

getInitialCard()
  .then((result) => {
    result.reverse().forEach((item) => {
      const newCard = createCard(profileId, item);
      addCard(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  })
