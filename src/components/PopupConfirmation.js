import Popup from "./Popup.js"

export default class PopupConfirmation extends Popup {
  constructor(popup, handleSubmit) {
    super(popup)
    this._handleSubmit = handleSubmit
    this._handleSubmitEventPointer = this._handleSubmitEvent.bind(this)
    this._popupForm = this._popup.querySelector(".popup__form")
  }

  open(card) {
    this._card = card
    super.open()
  }

  _handleSubmitEvent(evt) {
      evt.preventDefault()
      this._handleSubmit(this._card)
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener("submit", this._handleSubmitEventPointer)
  }

  _removeEventListeners() {
    this._popupForm.removeEventListener("submit", this._handleSubmitEventPointer)
    super._removeEventListeners()
  }

}