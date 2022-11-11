import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, submitFormCallback) {
    super(popup);
    this.submitFormCallback = submitFormCallback;
    this.popupForm = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const formData = new FormData(this.popupForm);
    return Object.fromEntries(formData);
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener('submit', (evt) => this.submitFormCallback(evt, this._getInputValues()));
  }

  close() {
    super.close();
    this.popupForm.reset();
  }
}
