export default class FormValidator {
  constructor(settings, element) {
    this._element = element;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputErrorSelector = settings.inputErrorSelector;

    this._formElement = element.querySelector(settings.formSelector);
    this._inputElements = element.querySelectorAll(settings.inputSelector);
    this._errorElements = element.querySelectorAll(settings.inputErrorSelector);
    this._buttonElement = element.querySelector(settings.submitButtonSelector);
    this._inputList = Array.from(element.querySelectorAll(settings.inputSelector));
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  resetForm() {
    this._formElement.reset();
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._buttonElement.disabled = true;
  }
}
