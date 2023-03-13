export default class FormValidator {
    constructor(config, popup) {
      this._form = popup
      this._config = config
      this._buttonSave = this._form.querySelector(
        this._config.submitButtonSelector
      )
      this._inputList = Array.from(
        this._form.querySelectorAll(this._config.inputSelector)
      )
}
  
    enableValidation() {
      this._setEventListeners()
    }
  
    disableSubmitButton() {
      this._buttonSave.classList.remove(this._config.activeButtonClass)
      this._buttonSave.classList.add(this._config.inactiveButtonClass)
      this._buttonSave.disabled = true
    }
  
    enableSubmitButton() {
      this._buttonSave.classList.add(this._config.activeButtonClass)
      this._buttonSave.classList.remove(this._config.inactiveButtonClass)
      this._buttonSave.disabled = false
    }
  
    _showInputError(inputElement) {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
      errorElement.classList.add(this._config.errorClass)
      errorElement.textContent = inputElement.validationMessage
      inputElement.classList.add(this._config.inputErrorClass)
    }
  
    _hideInputError(inputElement) {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
      errorElement.classList.remove(this._config.errorClass)
      errorElement.textContent = ""
      inputElement.classList.remove(this._config.inputErrorClass)
    }
  
    _checkInputValidity(inputElement) {
      if (inputElement.validity.valid) {
        this._hideInputError(inputElement)
      } else {
        this._showInputError(inputElement)
      }
    }
  
    _hasInvalidInput() {
      return this._inputList.some((inputElement) => !inputElement.validity.valid)
    }
  
    _handleFormInput() {
      if (this._hasInvalidInput()) {
        this.disableSubmitButton()
      } else {
        this.enableSubmitButton()
      }
    }
  
    _setEventListeners() {
      this._handleFormInput(this._inputList, this._buttonSave)
  
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement)
          this._handleFormInput(this._inputList, this._buttonSave)
        })
      })
    }
  }
  

/*
function disableSubmitButton(button, config) {
    button.classList.remove(config.activeButtonClass)
    button.classList.add(config.inactiveButtonClass)
    button.disabled = true
  }
  
  function disableSubmit(popup, config) {
    const buttonSave = popup.querySelector(config.submitButtonSelector)
    if (buttonSave) {
      disableSubmitButton(buttonSave, config)
    }
  }
    
  function showInputError(form, input, config) {
    const errorElement = form.querySelector(`.${input.id}-error`)
    errorElement.classList.add(config.errorClass)
    errorElement.textContent = input.validationMessage
    input.classList.add(config.inputErrorClass)
  }
    
  function hideInputError(form, input, config) {
    const errorElement = form.querySelector(`.${input.id}-error`)
    errorElement.classList.remove(config.errorClass)
    errorElement.textContent = ""
    input.classList.remove(config.inputErrorClass)
  }  
    
  function checkInputValidity(form, input, config) {
    if (input.validity.valid) {
      hideInputError(form, input, config)
    } else {
      showInputError(form, input, config)
    }
  }  
    
  function hasInvalidInput(inputList) {
    return inputList.some((input) => !input.validity.valid)
  }  
    
  function handleFormInput(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
      disableSubmitButton(buttonElement, config)
    } else {
      buttonElement.classList.add(config.activeButtonClass)
      buttonElement.classList.remove(config.inactiveButtonClass)
      buttonElement.disabled = false
    }
  }  
    
  function setEventListeners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector))
    
    const buttonElement = form.querySelector(config.submitButtonSelector)
  
    handleFormInput(inputList, buttonElement, config)
  
    inputList.forEach((input) => {
        input.addEventListener("input", () => {
        checkInputValidity(form, input, config)
        handleFormInput(inputList, buttonElement, config)
      })
    })
  }  
    
    function enableValidation({ formSelector, ...restConfig }) {
      const formList = Array.from(document.querySelectorAll(formSelector))
    
      formList.forEach((form) => {
        setEventListeners(form, restConfig)
      })
    }
    
    enableValidation(formValidationConfig); */