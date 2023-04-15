export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector)
      this._handleEscClose = this._handleEscClose.bind(this)
      this._buttonClose = this._popup.querySelector(".popup__button-close")
      //Биндим к функции this._handleEscClose параметр this
      this._clickEscClose = this._handleEscClose.bind(this)
      //Биндим к функции this._handleClose параметр this
      this._clickClose = this._handleClose.bind(this)
      //Биндим к функции this._handleSubmit параметр this
      this._clickCloseButton = this._handleSubmit.bind(this)
      //Устанавливаем обработчик нажатия на кнопку крестика
      this._buttonClose.addEventListener("click", this._clickCloseButton)
    }
  
    open() {
      this._setEventListeners()
      this._popup.classList.add("popup_opened")
    }
  
    close() {
      this._popup.classList.remove("popup_opened")
      this._removeEventListeners()
    }

    _handleSubmit() {
        //Вызов закрытия
        this.close()
    }

    _handleEscClose(evt) {
      if (evt.key === "Escape") {
        this.close()
      }
    }
  
    _handleClose(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        this.close()
      }
    }  
    
    _setEventListeners() {
        //Установка обработчиков от popup на document
        document.addEventListener("keydown", this._clickEscClose)
        document.addEventListener("mouseup", this._clickClose)
    }
    
    _removeEventListeners() {
    //Снятие обработчиков от popup на document
        document.removeEventListener("keydown", this._clickEscClose)
        document.removeEventListener("mouseup", this._clickClose)
    }
  }