/*export default class Card {
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
}*/

export default class Card {
    constructor(
      data,
      templateSelector,
      handleCardClick,
      userId,
      like,
      dislike,
      deleteCard
    ) {
      this._templateSelector = templateSelector
      this._handleCardClick = handleCardClick
      this._userId = userId
      this._like = like
      this._dislike = dislike
      this._deleteCard = deleteCard
      this._likes = data.likes
      this._id = data._id
      this._name = data.name
      this._link = data.link
      this._ownerId = data.owner._id
    }
  
    like() {
      this._likeButton.classList.add("element__button-like_active")
    }
  
    dislike() {
      this._likeButton.classList.remove("element__button-like_active")
    }
  
    _userLiked() {
      this._likes.forEach((elementId) => {
        if (elementId._id === this._userId) {
          this.like()
        } else {
          this.dislike()
        }
      })
    }
  
    likesCount(res) {
      this._likesCount.textContent = `${res.likes.length}`
    }
  
    remove() {
      this._cardElement.remove()
    }
  
    generateCard = () => {
      const template = document.querySelector(this._templateSelector)
      if (template) {
        const element = template.content.querySelector(".element")
        if (element) {
          this._cardElement = element.cloneNode(true)
        } else console.log("В классе Card не найден .element!")
      } else
        console.log("В классе Card не найден " + this._templateSelector + "!")
  
      this._likeButton = this._cardElement.querySelector(".element__button-like")
  
      // Счетчик для подсчета лайков
      this._likesCount = this._cardElement.querySelector(".element__count-like")
      this._likesCount.textContent = this._likes.length
      this._deleteButtonTrash = this._cardElement.querySelector(".element__delete")
      if (this._ownerId !== this._userId) {
        this._deleteButtonTrash.remove()
      }
  
      this._imageElementMask = this._cardElement.querySelector(".element__photo")
      this._imageElementMask.src = this._link
      this._imageElementMask.alt = this._name
      this._cardElement.querySelector(".element__title").textContent = this._name
  
      this._setEventListeners()
      this._userLiked()
  
      return this._cardElement
    }
  
    _setEventListeners() {
      this._likeButton.addEventListener("click", () => {
        if (this._likeButton.classList.contains("element__button-like_active")) {
          this._dislike()
        } else {
          this._like()
        }
      })
      this._deleteButtonTrash.addEventListener("click", () => {
        this._deleteCard(this._id)
      })
      this._imageElementMask.addEventListener("click", () => {
        this._handleCardClick(this._name, this._link)
      })
    }
  }