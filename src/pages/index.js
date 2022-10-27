import './index.css';
import {
  avatarEditButton,
  avatarImage,
  avatarPopup,
  avatarUrlInput,
  captionImage,
  cardPopup,
  cardsContainer,
  cardSelector,
  formAddCard,
  formAvatarEdit,
  formEditProfile,
  imageNameInput,
  imageUrlInput,
  imagePopup,
  jobInput,
  nameInput,
  popups,
  profileAddButton,
  profileEditButton,
  profilePopup,
  profileSubtitle,
  profileTitle,
  settingsValidation,
  viewerImage
} from '../utils/constants.js';
import { renderLoading } from '../utils/utils.js'
import { openPopup, closePopup } from "../components/modal.js";
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: 'df96d3b0-3822-438d-a20e-f1a1a788e6cc',
    'Content-Type': 'application/json'
  }
}
);

const validationProfilePopup = new FormValidator(settingsValidation, profilePopup);
const validationCardPopup = new FormValidator(settingsValidation, cardPopup);
const validationAvatarPopup = new FormValidator(settingsValidation, avatarPopup);

let profileId = "";

function addCard(card) {
  cardsContainer.prepend(card);
}

export function addCardFromForm(evt) {
  evt.preventDefault();
  renderLoading(true, cardPopup)
  const name = imageNameInput.value;
  const url = imageUrlInput.value;
  api.postNewCard(name, url)
    .then((data) => {
      const newCard = new Card(
        data,
        cardSelector,
        profileId,
        handleLikeCard,
        handleDeleteCard,
        handleCardClick)
        .generate();
      addCard(newCard);
      closePopup(cardPopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, cardPopup)
    })
}

export function modifyProfileData(evt) {
  evt.preventDefault();
  renderLoading(true, profilePopup);
  api.setUserInfo(nameInput.value, jobInput.value)
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
}

export function patchAvatarFromForm(evt) {
  evt.preventDefault();
  renderLoading(true, avatarPopup)
  const avatarUrl = avatarUrlInput.value;
  api.patchAvatar(avatarUrl)
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

export function handleLikeCard(evt) {
  if (!evt.target.classList.contains('element__like-button_active')) {
    api.likeCard(this._cardId)
      .then((data) => {
        this.toggleLike(evt, data.likes.length);
      })
      .catch((err) => {
        console.log(err)
      });
  } else {
    api.dislikeCard(this._cardId)
      .then((data) => {
        this.toggleLike(evt, data.likes.length);
      })
      .catch((err) => {
        console.log(err)
      });
  }
}

export function handleDeleteCard(evt) {
  api.deleteCard(this._cardId)
    .then(() => {
      this.removeCard(evt)
    })
    .catch((err) => {
      console.log(err)
    })
}

export function handleCardClick() {
  viewerImage.src = this._link;
  viewerImage.alt = this._name;
  captionImage.textContent = this._name;
  openPopup(imagePopup);
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
  validationAvatarPopup.resetForm();
  openPopup(avatarPopup)
})

profileEditButton.addEventListener('click', function () {
  validationProfilePopup.resetForm();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(profilePopup)
});

profileAddButton.addEventListener('click', function () {
  validationCardPopup.resetForm();
  openPopup(cardPopup)
});

formEditProfile.addEventListener('submit', modifyProfileData);
formAddCard.addEventListener('submit', addCardFromForm);
formAvatarEdit.addEventListener('submit', patchAvatarFromForm);

validationProfilePopup.enableValidation();
validationCardPopup.enableValidation();
validationAvatarPopup.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCard()])
  .then(([userInfo, initialCard]) => {
    profileTitle.textContent = userInfo.name;
    profileSubtitle.textContent = userInfo.about;
    avatarImage.src = userInfo.avatar;
    profileId = userInfo._id;

    initialCard.reverse().forEach((item) => {
      const card = new Card(
        item,
        cardSelector,
        profileId,
        handleLikeCard,
        handleDeleteCard,
        handleCardClick)
        .generate();
      addCard(card);
    });
  })
  .catch((err) => {
    console.log(err);
  })
