import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this.viewerImage = this._popup.querySelector('.popup__image');
    this.captionImage = this._popup.querySelector('.popup__caption');
  }

  open(link, name) {
    this.viewerImage.src = link;
    this.viewerImage.alt = name;
    this.captionImage.textContent = name;
    super.open();
  }
}
