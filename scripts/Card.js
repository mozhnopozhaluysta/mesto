export default class Card {
    constructor(data, templateSelector, openImagePopup) {
        this._name = data.name
        this._link = data.link
        this._templateSelector = templateSelector
        this.openImagePopup = openImagePopup
    }
  
    generateCard = () => {
        this._cardElement = document
            .querySelector(this._templateSelector)
            .content.cloneNode(true)
        this._title = this._cardElement.querySelector(".element__title")
        this._photo = this._cardElement.querySelector(".element__photo")
        this._delete = this._cardElement.querySelector(".element__delete")
        this._like = this._cardElement.querySelector(".element__button-like")

        this._fillCard()
        this._setEventHandlers()
        return this._cardElement
    }
  
    _likeCard = () => {
        this._like.classList.toggle("element__button-like_active")
    }
  
    _deleteCard = () => {
        this._delete.closest(".element").remove()
    }
  
    _setEventHandlers = () => {
        this._delete.addEventListener("click", () => this._deleteCard())
        this._like.addEventListener("click", () => this._likeCard())
        this._photo.addEventListener("click", () =>
        this.openImagePopup(this._name, this._link))
    }
  
    _fillCard = () => {
        this._title.textContent = this._name
        this._photo.src = this._link
        this._photo.alt = this._name
    }
}