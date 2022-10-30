import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.viewerImage = this.selector.querySelector('.popup__image');
    this.captionImage = this.selector.querySelector('.popup__caption');
  }

  open(link, name) {
    this.viewerImage.src = link;
    this.viewerImage.alt = name;
    this.captionImage.textContent = name;
    super.open();
  }
}
