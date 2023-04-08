export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector)
      this._handleEscClose = this._handleEscClose.bind(this)
    
       this._close = this._popup.querySelector(".popup__button-close")
      
      this._close.addEventListener("click", () => {
        this.close()
      })
      console.log(this._popup);
    }
  
    open() {
      this._popup.classList.add("popup_opened")
      document.addEventListener("keydown", (evt) => {
        this._handleEscClose(evt)
      })
    }
  
    close() {
      this._popup.classList.remove("popup_opened")
      document.removeEventListener("keydown", (evt) => {
        this._handleEscClose(evt)
      })
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
  
    setEventListeners() {
        document.addEventListener("mouseup", (evt) => {
          this._handleClose(evt)
        })
/**       
            можно закрытие попапа по крестику сделать и здесь
            this._popup.querySelector(".popup__button-close").addEventListener("click", () => {
            this.close()
          }) **/
      } 
  }