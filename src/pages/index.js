import './index.css';
import { photoElements, formValidationConfig } from "../components/modules.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

//кнопки открытия попапов
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");

//находим форму редактирования по name
const popupFormEdit = document.forms.formDetails

//находим форму создания карточек по name
const popupFormAdd = document.forms.formAddElement

//находим поля в форме редактирования по name
const popupName = popupFormEdit.elements.popupName
const popupInfo = popupFormEdit.elements.popupInfo

function createCard(item) {
  return new Card(item, ".element-template", () =>
    popupOpenImage.open(item)
  ).generateCard()
}

//передача текста на страницу профиля редактирования полей Имя, О себе
function formValues(value) {
  userInfo.setUserInfo(value.popupName, value.popupInfo)
  classEditPopup.close()
}

//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
const userInfo = new UserInfo({
  titleSelector: ".profile__name",
  subtitleSelector: ".profile__details",
})

//функция открытия попапа редактирования профиля
function openEditProfile() {
  const { title, subtitle } = userInfo.getUserInfo()
  popupName.value = title
  popupInfo.value = subtitle
  formEditValidator.disableSubmitButton()
  classEditPopup.open()
}

//функция открытия попапа для создания новой карточки
function popupAddCardProfile() {
  formCardValidator.disableSubmitButton()
  classCardPopup.open()
}

//создание класса редактирования профиля
const classEditPopup = new PopupWithForm(
  ".popup_type_edit-profile",
  formValues
)
classEditPopup.setEventListeners()

//отрисовка карточек на странице из обьекта initialCards
const cardSection = new Section(
  {
    renderer: (item) => cardSection.addItem(createCard(item)),
  },
  ".elements"
)

const classCardPopup = new PopupWithForm(
  ".popup_type_add-element",
  (item) => {
    cardSection.addItem(createCard(item))
    classCardPopup.close()
  }
)
classCardPopup.setEventListeners()

//создается обьект класса PopupWithImage
const popupOpenImage = new PopupWithImage(".popup_type_image")
popupOpenImage.setEventListeners()
console.log(popupOpenImage);

//валидация формы попап редактирования профиля
const formEditValidator = new FormValidator(formValidationConfig, popupFormEdit)
formEditValidator.enableValidation()

//валидация формы попап создания карточек
const formCardValidator = new FormValidator(formValidationConfig, popupFormAdd)
formCardValidator.enableValidation()

//кнопки открытия попапов
profileAddBtn.addEventListener("click", () => popupAddCardProfile())
profileEditBtn.addEventListener("click", () => openEditProfile())

cardSection.renderItems(photoElements.reverse())