export default class Card {
  constructor(data, selector, profileId, handleLikeCard, handleDeleteCard, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._profileId = profileId;
    this._selector = selector;
    this._handleLikeCard = handleLikeCard;
    this._handleDeleteCard = handleDeleteCard;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    return document.querySelector(this._selector).content.cloneNode(true);
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', (evt) => this._handleLikeCard(evt));
    this._buttonDelete.addEventListener('click', (evt) => this._handleDeleteCard(evt));
    this._elementImage.addEventListener('click', () => this._handleCardClick());
  }

  removeCard(evt) {
    evt.target.parentElement.remove();
  }

  toggleLike(evt, numberLike) {
    if (!evt.target.classList.contains('element__like-button_active')) {
      evt.target.classList.add('element__like-button_active');
    } else {
      evt.target.classList.remove('element__like-button_active');
    }
    this._elementLikeNumber.textContent = numberLike;
  }

  generate() {
    this._element = this._getElement();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementName = this._element.querySelector('.element__title');
    this._buttonLike = this._element.querySelector('.element__like-button');
    this._elementLikeNumber = this._element.querySelector('.element__like-number');
    this._buttonDelete = this._element.querySelector('.element__delete-button');
    this._like = this._likes.some(el => el._id == this._profileId);
    this._idMatch = this._ownerId === this._profileId;
    this._elementName.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementLikeNumber.textContent = this._likes.length;

    if (this._like === true) {
      this._buttonLike.classList.add('element__like-button_active');
    };
    if (!this._idMatch) {
      this._buttonDelete.disabled = true
    };
    this._setEventListeners();

    return this._element
  }
}
