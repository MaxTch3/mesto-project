import Popup from './Popup';
export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._viewerImage = this._popup.querySelector('.popup__image');
    this._captionImage = this._popup.querySelector('.popup__caption')
  }
  open(link, name) {
    this._viewerImage.src = link;
    this._viewerImage.alt = name;
    this._captionImage.textContent = name;
    super.open();
  };
}


