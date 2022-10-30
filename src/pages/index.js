import './index.css';
import {
  avatarEditButton,
  avatarImage,
  avatarPopupSelector,
  avatarUrlInput,
  captionImage,
  cardPopupSelector,
  cardsContainer,
  cardSelector,
  formAddCard,
  formAvatarEdit,
  formEditProfile,
  imageNameInput,
  imageUrlInput,
  imagePopupSelector,
  jobInput,
  nameInput,
  popups,
  profileAddButton,
  profileEditButton,
  profilePopupSelector,
  profileSubtitle,
  profileTitle,
  settingsValidation,
  viewerImage
} from '../utils/constants.js';
import {renderLoading} from '../utils/utils.js'
import {openPopup, closePopup} from "../components/modal.js";
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";

const api = new Api({
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
    headers: {
      authorization: 'df96d3b0-3822-438d-a20e-f1a1a788e6cc',
      'Content-Type': 'application/json'
    }
  }
);

const validationProfilePopup = new FormValidator(settingsValidation, profilePopupSelector);
const validationCardPopup = new FormValidator(settingsValidation, cardPopupSelector);
const validationAvatarPopup = new FormValidator(settingsValidation, avatarPopupSelector);

const cardPopup = new PopupWithForm(cardPopupSelector, addCardFromForm);
const profilePopup = new PopupWithForm(profilePopupSelector, modifyProfileData);
const avatarPopup = new PopupWithForm(avatarPopupSelector, patchAvatarFromForm);
const imagePopup = new PopupWithImage(imagePopupSelector);

cardPopup.setEventListeners();
profilePopup.setEventListeners();
avatarPopup.setEventListeners();
imagePopup.setEventListeners();

let profileId = "";
let cardsSection = null;

export function addCardFromForm(evt) {
  evt.preventDefault();
  renderLoading(true, cardPopupSelector)
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
      cardsSection.addItem(newCard);
      cardPopup.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, cardPopupSelector)
    })
}

export function modifyProfileData(evt) {
  evt.preventDefault();
  renderLoading(true, profilePopupSelector);
  api.setUserInfo(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileSubtitle.textContent = jobInput.value;
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, profilePopupSelector)
    })
}

export function patchAvatarFromForm(evt) {
  evt.preventDefault();
  renderLoading(true, avatarPopupSelector)
  const avatarUrl = avatarUrlInput.value;
  api.patchAvatar(avatarUrl)
    .then(() => {
      avatarImage.src = avatarUrl;
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      renderLoading(false, avatarPopupSelector)
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
  // viewerImage.src = this._link;
  // viewerImage.alt = this._name;
  // captionImage.textContent = this._name;
  imagePopup.open(this._link, this._name);
}

// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup);
//     }
//   })
// });

avatarEditButton.addEventListener('click', function () {
  validationAvatarPopup.resetForm();
  avatarPopup.open();
})

profileEditButton.addEventListener('click', function () {
  validationProfilePopup.resetForm();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  profilePopup.open();
});

profileAddButton.addEventListener('click', function () {
  validationCardPopup.resetForm();
  cardPopup.open();
});

// formEditProfile.addEventListener('submit', modifyProfileData);
// formAddCard.addEventListener('submit', addCardFromForm);
// formAvatarEdit.addEventListener('submit', patchAvatarFromForm);

validationProfilePopup.enableValidation();
validationCardPopup.enableValidation();
validationAvatarPopup.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCard()])
  .then(([userInfo, initialCard]) => {
    profileTitle.textContent = userInfo.name;
    profileSubtitle.textContent = userInfo.about;
    avatarImage.src = userInfo.avatar;
    profileId = userInfo._id;
    cardsSection = new Section({
      items: initialCard.reverse(),
      renderer: function (item) {
        const card = new Card(
          item,
          cardSelector,
          profileId,
          handleLikeCard,
          handleDeleteCard,
          handleCardClick)
          .generate();
        cardsContainer.prepend(card);
      }
    }, cardsContainer);
    cardsSection.render();
  })
  .catch((err) => {
    console.log(err);
  })
