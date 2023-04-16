/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Api)\n/* harmony export */ });\n// Cоздание класса Api описание работы логики, обращения к Api\nclass Api {\n  constructor(options) {\n    this._baseUrl = options.baseUrl;\n    this._headers = options.headers;\n  }\n\n  // Формирование запроса на сервер, если не удачно, то возвращаем ошибку!\n  _handleSendingRequest(res) {\n    if (res.ok) {\n      return Promise.resolve(res.json());\n    }\n\n    // Если ошибка, отклоняем промис\n    return Promise.reject(`Ошибка: ${res.status}`);\n  }\n\n  // Метод загрузки информации о пользователе с сервера\n  async getRealUserInfo() {\n    const response = await fetch(`${this._baseUrl}/users/me`, {\n      headers: this._headers\n    });\n    return this._handleSendingRequest(response);\n  }\n\n  // Метод загрузки карточек с сервера\n  async getInitialCards() {\n    const response = await fetch(`${this._baseUrl}/cards`, {\n      headers: this._headers\n    });\n    return this._handleSendingRequest(response);\n  }\n\n  // Метод редактирование профиля\n  async editProfileUserInfo(data) {\n    const response = await fetch(`${this._baseUrl}/users/me`, {\n      method: \"PATCH\",\n      headers: this._headers,\n      body: JSON.stringify({\n        name: data.name,\n        about: data.about\n      })\n    });\n    return this._handleSendingRequest(response);\n  }\n\n  // Метод добавления новой карточки с сервера\n  async addNewCard(data) {\n    const response = await fetch(`${this._baseUrl}/cards`, {\n      method: \"POST\",\n      headers: this._headers,\n      body: JSON.stringify(data)\n    });\n    return this._handleSendingRequest(response);\n  }\n\n  // Метод постановки лайка карточки\n  async addLike(cardId) {\n    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {\n      method: \"PUT\",\n      headers: this._headers\n    });\n    return this._handleSendingRequest(response);\n  }\n\n  // Метод удаления карточки\n  async removeCard(cardId) {\n    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {\n      method: \"DELETE\",\n      headers: this._headers\n    });\n    return this._handleSendingRequest(response);\n  }\n\n  // Метод постановки и снятия лайка с карточки\n  async removeLike(cardId) {\n    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {\n      method: \"DELETE\",\n      headers: this._headers\n    });\n    return this._handleSendingRequest(response);\n  }\n\n  // Метод обновления аватара пользователя\n  async updateProfileUserAvatar(data) {\n    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {\n      method: \"PATCH\",\n      headers: this._headers,\n      body: JSON.stringify({\n        avatar: data.avatar\n      })\n    });\n    return this._handleSendingRequest(response);\n  }\n}\n\n//# sourceURL=webpack://mesto/./src/components/Api.js?");

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Card)\n/* harmony export */ });\nclass Card {\n  constructor(data, templateSelector, handleCardClick, userId, like, dislike, deleteCard) {\n    this._templateSelector = templateSelector;\n    this._handleCardClick = handleCardClick;\n    this._userId = userId;\n    this._like = like;\n    this._dislike = dislike;\n    this._deleteCard = deleteCard;\n    this._likes = data.likes;\n    this._id = data._id;\n    this._name = data.name;\n    this._link = data.link;\n    this._ownerId = data.owner._id;\n  }\n  like() {\n    this._likeButton.classList.add(\"element__button-like_active\");\n  }\n  dislike() {\n    this._likeButton.classList.remove(\"element__button-like_active\");\n  }\n  _userLiked() {\n    this._likes.forEach(elementId => {\n      if (elementId._id === this._userId) {\n        this.like();\n      } else {\n        this.dislike();\n      }\n    });\n  }\n  setLikesCount(res) {\n    this._setLikesCount.textContent = `${res.likes.length}`;\n  }\n  remove() {\n    this._cardElement.remove();\n  }\n  generateCard = () => {\n    const template = document.querySelector(this._templateSelector);\n    if (template) {\n      const element = template.content.querySelector(\".element\");\n      if (element) {\n        this._cardElement = element.cloneNode(true);\n      } else console.log(\"В классе Card не найден .element!\");\n    } else console.log(\"В классе Card не найден \" + this._templateSelector + \"!\");\n    this._likeButton = this._cardElement.querySelector(\".element__button-like\");\n\n    // Счетчик для подсчета лайков\n    this._setLikesCount = this._cardElement.querySelector(\".element__count-like\");\n    this._setLikesCount.textContent = this._likes.length;\n    this._deleteButtonTrash = this._cardElement.querySelector(\".element__delete\");\n    if (this._ownerId !== this._userId) {\n      this._deleteButtonTrash.remove();\n    }\n    this._imageElementMask = this._cardElement.querySelector(\".element__photo\");\n    this._imageElementMask.src = this._link;\n    this._imageElementMask.alt = this._name;\n    this._cardElement.querySelector(\".element__title\").textContent = this._name;\n    this._setEventListeners();\n    this._userLiked();\n    return this._cardElement;\n  };\n  _setEventListeners() {\n    this._likeButton.addEventListener(\"click\", () => {\n      if (this._likeButton.classList.contains(\"element__button-like_active\")) {\n        this._dislike();\n      } else {\n        this._like();\n      }\n    });\n    this._deleteButtonTrash.addEventListener(\"click\", () => {\n      this._deleteCard(this._id);\n    });\n    this._imageElementMask.addEventListener(\"click\", () => {\n      this._handleCardClick(this._name, this._link);\n    });\n  }\n}\n\n//# sourceURL=webpack://mesto/./src/components/Card.js?");

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FormValidator)\n/* harmony export */ });\nclass FormValidator {\n  constructor(config, popup) {\n    this._form = popup;\n    this._config = config;\n    this._buttonSave = this._form.querySelector(this._config.submitButtonSelector);\n    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));\n  }\n  enableValidation() {\n    this._setEventListeners();\n  }\n  disableSubmitButton() {\n    this._buttonSave.classList.remove(this._config.activeButtonClass);\n    this._buttonSave.classList.add(this._config.inactiveButtonClass);\n    this._buttonSave.disabled = true;\n  }\n  enableSubmitButton() {\n    this._buttonSave.classList.add(this._config.activeButtonClass);\n    this._buttonSave.classList.remove(this._config.inactiveButtonClass);\n    this._buttonSave.disabled = false;\n  }\n  _showInputError(inputElement) {\n    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);\n    errorElement.classList.add(this._config.errorClass);\n    errorElement.textContent = inputElement.validationMessage;\n    inputElement.classList.add(this._config.inputErrorClass);\n  }\n  _hideInputError(inputElement) {\n    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);\n    errorElement.classList.remove(this._config.errorClass);\n    errorElement.textContent = \"\";\n    inputElement.classList.remove(this._config.inputErrorClass);\n  }\n  _checkInputValidity(inputElement) {\n    if (inputElement.validity.valid) {\n      this._hideInputError(inputElement);\n    } else {\n      this._showInputError(inputElement);\n    }\n  }\n  _hasInvalidInput() {\n    return this._inputList.some(inputElement => !inputElement.validity.valid);\n  }\n  _toggleButtonState() {\n    if (this._hasInvalidInput()) {\n      this.disableSubmitButton();\n    } else {\n      this.enableSubmitButton();\n    }\n  }\n  _setEventListeners() {\n    this._inputList.forEach(inputElement => {\n      inputElement.addEventListener(\"input\", () => {\n        this._checkInputValidity(inputElement);\n        this._toggleButtonState();\n      });\n    });\n  }\n}\n\n//# sourceURL=webpack://mesto/./src/components/FormValidator.js?");

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Popup)\n/* harmony export */ });\nclass Popup {\n  constructor(popupSelector) {\n    this._popup = document.querySelector(popupSelector);\n    this._handleEscClose = this._handleEscClose.bind(this);\n    this._buttonClose = this._popup.querySelector(\".popup__button-close\");\n    //Биндим к функции this._handleEscClose параметр this\n    this._clickEscClose = this._handleEscClose.bind(this);\n    //Биндим к функции this._handleClose параметр this\n    this._clickClose = this._handleClose.bind(this);\n    //Биндим к функции this._handleSubmit параметр this\n    this._clickCloseButton = this._handleSubmit.bind(this);\n  }\n  open() {\n    this.setEventListeners();\n    this._popup.classList.add(\"popup_opened\");\n  }\n  close() {\n    this._popup.classList.remove(\"popup_opened\");\n    this._removeEventListeners();\n  }\n  _handleSubmit() {\n    //Вызов закрытия\n    this.close();\n  }\n  _handleEscClose(evt) {\n    if (evt.key === \"Escape\") {\n      this.close();\n    }\n  }\n  _handleClose(evt) {\n    if (evt.target.classList.contains(\"popup_opened\")) {\n      this.close();\n    }\n  }\n  setEventListeners() {\n    //Установка обработчиков от popup на document\n    document.addEventListener(\"keydown\", this._clickEscClose);\n    document.addEventListener(\"mouseup\", this._clickClose);\n    //Устанавливаем обработчик нажатия на кнопку крестика\n    this._buttonClose.addEventListener(\"click\", this._clickCloseButton);\n  }\n  _removeEventListeners() {\n    //Снятие обработчиков от popup на document\n    document.removeEventListener(\"keydown\", this._clickEscClose);\n    document.removeEventListener(\"mouseup\", this._clickClose);\n  }\n}\n\n//# sourceURL=webpack://mesto/./src/components/Popup.js?");

/***/ }),

/***/ "./src/components/PopupConfirmation.js":
/*!*********************************************!*\
  !*** ./src/components/PopupConfirmation.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopupConfirmation)\n/* harmony export */ });\n/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ \"./src/components/Popup.js\");\n\nclass PopupConfirmation extends _Popup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(popup, handleSubmit) {\n    super(popup);\n    this._handleSubmit = handleSubmit;\n    this._popupForm = this._popup.querySelector(\".popup__form\");\n  }\n  open(card) {\n    this._card = card;\n    super.open();\n  }\n  setEventListeners() {\n    super.setEventListeners();\n    this._popupForm.addEventListener(\"submit\", evt => {\n      evt.preventDefault();\n      this._handleSubmit(this._card);\n    });\n  }\n}\n\n//# sourceURL=webpack://mesto/./src/components/PopupConfirmation.js?");

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopupWithForm)\n/* harmony export */ });\n/* harmony import */ var _components_Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Popup.js */ \"./src/components/Popup.js\");\n\nclass PopupWithForm extends _components_Popup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(selector, callbackSubmit) {\n    super(selector);\n    this._callbackSubmit = callbackSubmit;\n    this._form = this._popup.querySelector(\".popup__form\");\n    this._inputs = [...this._form.querySelectorAll(\".popup__input\")];\n    this._handleSubmitPointer = this._handleSubmit.bind(this);\n  }\n  _getInputValues() {\n    const values = {};\n    this._inputs.forEach(input => {\n      values[input.name] = input.value;\n    });\n    return values;\n  }\n  setInputValue(data) {\n    this._inputs.forEach(input => {\n      input.value = data[input.name];\n    });\n  }\n  _handleSubmit(event) {\n    event.preventDefault();\n    const replacementText = event.submitter.textContent;\n    // Смена текста кнопки при сохранение данных\n    event.submitter.textContent = \"Сохранение...\";\n    this._callbackSubmit(this._getInputValues()).then(() => this.close()).finally(() => {\n      event.submitter.textContent = replacementText;\n    });\n  }\n  close() {\n    super.close();\n    this._form.reset();\n  }\n  setEventListeners() {\n    super.setEventListeners();\n    this._form.addEventListener(\"submit\", this._handleSubmitPointer);\n  }\n  _removeEventListeners() {\n    super._removeEventListeners();\n    this._form.removeEventListener(\"submit\", this._handleSubmitPointer);\n  }\n}\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithForm.js?");

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PopupWithImage)\n/* harmony export */ });\n/* harmony import */ var _components_Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Popup.js */ \"./src/components/Popup.js\");\n\nclass PopupWithImage extends _components_Popup_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(popupSelector) {\n    super(popupSelector);\n    this._imagePopup = this._popup.querySelector(\".popup__image\");\n    this._imagePopupTitle = this._popup.querySelector(\".popup__image-title\");\n  }\n  open(name, link) {\n    this._imagePopupTitle.textContent = name;\n    this._imagePopup.alt = \"Картинка \" + name;\n    this._imagePopup.src = link;\n    super.open();\n  }\n}\n\n//# sourceURL=webpack://mesto/./src/components/PopupWithImage.js?");

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Section)\n/* harmony export */ });\nclass Section {\n  constructor({\n    renderer\n  }, containerSelector) {\n    this._renderer = renderer;\n    this._container = document.querySelector(containerSelector);\n  }\n  addItem = item => {\n    this._container.prepend(item);\n  };\n  renderItems(items) {\n    items.forEach(item => {\n      return this._renderer(item);\n    });\n  }\n}\n\n//# sourceURL=webpack://mesto/./src/components/Section.js?");

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UserInfo)\n/* harmony export */ });\nclass UserInfo {\n  constructor({\n    name,\n    about,\n    avatar\n  }) {\n    this._data = {\n      name: name.textContent,\n      about: about.textContent,\n      avatar: avatar.textContent\n    };\n    this._name = name;\n    this._about = about;\n    this._avatar = avatar;\n  }\n  getUserInfo() {\n    return {\n      name: this._data.name,\n      about: this._data.about,\n      avatar: this._data.avatar\n    };\n  }\n  setUserInfo(data) {\n    this._data.name = data.name;\n    this._data.about = data.about;\n    this._data.avatar = data.avatar;\n    if (data.name) {\n      this._name.textContent = this._data.name;\n    }\n    if (data.about) {\n      this._about.textContent = this._data.about;\n    }\n    if (data.avatar) {\n      this._avatar.src = this._data.avatar;\n      this._avatar.alt = this._data.name;\n    }\n  }\n}\n\n//# sourceURL=webpack://mesto/./src/components/UserInfo.js?");

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _components_PopupConfirmation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/PopupConfirmation.js */ \"./src/components/PopupConfirmation.js\");\n/* harmony import */ var _utils_modules_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/modules.js */ \"./src/utils/modules.js\");\n/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Section.js */ \"./src/components/Section.js\");\n/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PopupWithImage.js */ \"./src/components/PopupWithImage.js\");\n/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PopupWithForm.js */ \"./src/components/PopupWithForm.js\");\n/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/UserInfo.js */ \"./src/components/UserInfo.js\");\n/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/FormValidator.js */ \"./src/components/FormValidator.js\");\n/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Card.js */ \"./src/components/Card.js\");\n/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/Api.js */ \"./src/components/Api.js\");\n\n\n\n\n\n\n\n\n\n\n//находим форму редактирования по нэйм\nconst formEditProfile = document.forms.formDetails;\n\n//находим форму создания карточек по нэйм\nconst formAddProfile = document.forms.formAddElement;\n\n//находим форму обновления аватара по нэйм\nconst formUpdateAvatar = document.forms.editAvatarForm;\n\n//кнопки открытия попапов\nconst profileUpdateAvatar = document.querySelector(\".profile__edit-avatar\");\nconst profileAddButton = document.querySelector(\".profile__add-button\");\nconst profileEditButton = document.querySelector(\".profile__edit-button\");\n\n//константы профиля\nconst nameProfile = document.querySelector(\".profile__name\");\nconst aboutProfile = document.querySelector(\".profile__details\");\nconst avatarProfile = document.querySelector(\".profile__avatar\");\nlet userId;\n\n//импорт класса-утилиты Api\n\n\n// Функция создания карточек по экземпляру класса Card\nfunction createCard(data) {\n  const card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"](data, \".element-template\", openPopupImage, userId, async () => {\n    try {\n      const response = await api.addLike(data._id);\n      card.like();\n      card.setLikesCount(response);\n    } catch (error) {\n      return console.log(`Ошибка: ${error}`);\n    }\n  }, async () => {\n    try {\n      const response = await api.removeLike(data._id);\n      card.dislike();\n      card.setLikesCount(response);\n    } catch (error) {\n      return console.log(`Ошибка: ${error}`);\n    }\n  }, () => {\n    popupConfirmation.open(card);\n  });\n  return card.generateCard();\n}\n\n//Открытие увеличенной картинки\nfunction openPopupImage(name, link) {\n  popupImage.open(name, link);\n}\n\n//Форма редактирования профиля\nasync function handleSubmitFormEditProfile(data) {\n  try {\n    const userProfile = await api.editProfileUserInfo(data);\n    user.setUserInfo(userProfile);\n  } catch (error) {\n    return console.log(`Ошибка: ${error}`);\n  }\n}\n\n//Форма обновления аватара\nasync function handleSubmitFormUpdateAvatar(data) {\n  try {\n    const userProfile = await api.updateProfileUserAvatar(data);\n    user.setUserInfo(userProfile);\n  } catch (error) {\n    return console.log(`Ошибка: ${error}`);\n  }\n}\n\n//Форма добавления карточек\nasync function handleSubmitFormAddCard(data) {\n  try {\n    const newCard = await api.addNewCard(data);\n    cardList.addItem(createCard(newCard));\n  } catch (error) {\n    return console.log(`Ошибка: ${error}`);\n  }\n}\n\n//Создание обьекта класса PopupWithImage\nconst popupImage = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"](\".popup_type_image\");\nconst popupAdd = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](\".popup_type_add-element\", handleSubmitFormAddCard);\nconst popupEdit = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](\".popup_type_edit-profile\", handleSubmitFormEditProfile);\nconst popupAvatar = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"](\".popup_type_update-avatar\", handleSubmitFormUpdateAvatar);\nconst user = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"]({\n  name: nameProfile,\n  about: aboutProfile,\n  avatar: avatarProfile\n});\nprofileEditButton.addEventListener(\"click\", () => {\n  popupEdit.open();\n  popupEdit.setInputValue(user.getUserInfo());\n  validatorFormEditProfile.disableSubmitButton();\n}, false);\nprofileUpdateAvatar.addEventListener(\"click\", () => {\n  popupAvatar.open();\n  validatorFormUpdateAvatar.disableSubmitButton();\n}, false);\nprofileAddButton.addEventListener(\"click\", () => {\n  popupAdd.open();\n  validatorFormAddProfile.disableSubmitButton();\n}, false);\n\n// Для каждой проверяемой формы новый экземпляр класса FormValidator\nconst validatorFormEditProfile = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"](_utils_modules_js__WEBPACK_IMPORTED_MODULE_2__.formValidationConfig, formEditProfile);\nvalidatorFormEditProfile.enableValidation();\nconst validatorFormAddProfile = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"](_utils_modules_js__WEBPACK_IMPORTED_MODULE_2__.formValidationConfig, formAddProfile);\nvalidatorFormAddProfile.enableValidation();\nconst validatorFormUpdateAvatar = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"](_utils_modules_js__WEBPACK_IMPORTED_MODULE_2__.formValidationConfig, formUpdateAvatar);\nvalidatorFormUpdateAvatar.enableValidation();\nconst popupConfirmation = new _components_PopupConfirmation_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\".popup_type_confirmation\", async card => {\n  api.removeCard(card._id).then(() => {\n    card.remove();\n    popupConfirmation.close();\n  }).catch(error => console.log(`Ошибка: ${error}`));\n});\n\n//Загрузка карточек с сервера\nconst cardList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n  renderer: data => {\n    const card = createCard(data);\n    cardList.addItem(card);\n  }\n}, \".elements\");\nconsole.log();\nconst api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"]({\n  baseUrl: \"https://mesto.nomoreparties.co/v1/cohort-62\",\n  headers: {\n    authorization: \"f70fd1ec-6366-4aff-9447-5f962e306222\",\n    \"Content-Type\": \"application/json\"\n  }\n});\n\n//Отрисовка карточек с сервера + отрисовка данных пользователя\nPromise.all([api.getRealUserInfo(), api.getInitialCards()]).then(([userProfile, cards]) => {\n  user.setUserInfo(userProfile);\n  userId = userProfile._id;\n  cardList.renderItems(cards);\n}).catch(error => console.log(`Ошибка: ${error}`));\n\n//# sourceURL=webpack://mesto/./src/pages/index.js?");

/***/ }),

/***/ "./src/utils/modules.js":
/*!******************************!*\
  !*** ./src/utils/modules.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"formValidationConfig\": () => (/* binding */ formValidationConfig)\n/* harmony export */ });\nconst formValidationConfig = {\n  formSelector: \".popup__form\",\n  inputSelector: \".popup__input\",\n  submitButtonSelector: \".popup__button-save\",\n  inactiveButtonClass: \"popup__button-save_disabled\",\n  activeButtonClass: \"popup__button-save_valid\",\n  inputErrorClass: \"popup__input_type_error\",\n  errorClass: \"error\"\n};\n\n\n//# sourceURL=webpack://mesto/./src/utils/modules.js?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://mesto/./src/pages/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/index.js");
/******/ 	
/******/ })()
;