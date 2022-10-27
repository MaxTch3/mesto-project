export default class FormValidator {
  constructor(settings, element) {
    this._element = element;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputErrorSelector = settings.inputErrorSelector;
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _isValid(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  enableValidation() {
    const formList = Array.from(this._element.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  };

  resetForm() {
    this._element.querySelector(this._formSelector).reset();
    const inputElements = this._element.querySelectorAll(this._inputSelector);
    const errorElements = this._element.querySelectorAll(this._inputErrorSelector);
    inputElements.forEach((inputElement) => {
      inputElement.classList.remove(this._inputErrorClass);
    });
    errorElements.forEach((errorElement) => {
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    });
    this._element.querySelector(this._submitButtonSelector).disabled = true;
  }
}
