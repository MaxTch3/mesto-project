import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(selector, submitFormCallback) {
    super(selector);
    this.submitFormCallback = submitFormCallback;
    this.popupForm = this.selector.querySelector('.popup__form');
  }

  _getInputValues() {
    const formData = new FormData(this.popupForm);
    return Object.fromEntries(formData);
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupForm.addEventListener('submit', this.submitFormCallback);
  }

  close() {
    super.close();
    this.popupForm.reset();
  }
}
