import Popup from "../components/Popup.js"

export default class PopupWithForm extends Popup {
  constructor(selector, callbackSubmit) {
    super(selector)
    this._callbackSubmit = callbackSubmit
    this._form = this._popup.querySelector(".popup__form")
    this._inputs = [...this._form.querySelectorAll(".popup__input")]
    this._handleSubmitPointer = this._handleSubmit.bind(this)
  }

  _getInputValues() {
    const values = {}
    this._inputs.forEach((input) => {
      values[input.name] = input.value
    })
    return values
  }

  setInputValue(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name]
    })
  }

  _handleSubmit(event) {
    event.preventDefault()
    let replacementText = ''
    // Смена текста кнопки при сохранение данных
    if (event.submitter) {
      console.log(event.submitter)
      replacementText = event.submitter.textContent
      event.submitter.textContent = "Сохранение..."
    }
    this._callbackSubmit(this._getInputValues())
      .then(() => this.close())
      .finally(() => {
        if (event.submitter && replacementText !== '') event.submitter.textContent = replacementText
      })
  }

  close() {
    super.close()
    this._form.reset()
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener("submit", this._handleSubmitPointer)

  }

  _removeEventListeners() {
    this._form.removeEventListener("submit", this._handleSubmitPointer)
    super._removeEventListeners()
  }
}