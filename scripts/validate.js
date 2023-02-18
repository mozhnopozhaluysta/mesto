const formValidationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button-save",
    inactiveButtonClass: "popup__button-save_disabled",
    activeButtonClass: "popup__button-save_valid",
    inputErrorClass: "popup__input_type_error",
    errorClass: "error",
  }

  function disableSubmit(popup, config) {
    const buttonSave = popup.querySelector(config.submitButtonSelector)
    if (buttonSave) {
      buttonSave.classList.remove(config.activeButtonClass)
      buttonSave.classList.add(config.inactiveButtonClass)
      buttonSave.disabled = true
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
      buttonElement.classList.remove(config.activeButtonClass)
      buttonElement.classList.add(config.inactiveButtonClass)
      buttonElement.disabled = true
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
  
  enableValidation(formValidationConfig)


/* const formValidationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    inputErrorClass: '.popup__input_type_error',
}

function disableSubmit(event) {
    event.preventDefault();
}

function enableValidation(config) {
    const form = document.querySelector(config.formSelector);

    form.addEventListener("submit", disableSubmit);

    addInputListeners(form, config);
}

function handleFormInput(event, config) {
    const input = event.target;
    const inputId = input.id;
    const errorElement = document.querySelector(`#${inputId}-error`);

    console.log(errorElement);
 
    if (input.validity.valid) { 
        input.classList.remove(config.inputErrorClass);
        errorElement.textContent = "";
    } else {
        input.classList.add(config.inputErrorClass);
        errorElement.textContent = input.validationMessage;
    }
}

function addInputListeners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));

     inputList.forEach(function(item) {
         item.addEventListener('input', (event) => {
            handleFormInput(event, config)
         });
     });
}

enableValidation(formValidationConfig); */