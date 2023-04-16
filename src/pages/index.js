import './index.css';

import PopupConfirmation from '../components/PopupConfirmation.js';
import { formValidationConfig } from "../utils/modules.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";


//находим форму редактирования по нэйм
const formEditProfile = document.forms.formDetails

//находим форму создания карточек по нэйм
const formAddProfile = document.forms.formAddElement

//находим форму обновления аватара по нэйм
const formUpdateAvatar = document.forms.editAvatarForm

//кнопки открытия попапов
const profileUpdateAvatar = document.querySelector(".profile__edit-avatar")
const profileAddButton = document.querySelector(".profile__add-button")
const profileEditButton = document.querySelector(".profile__edit-button")

//константы профиля
const nameProfile = document.querySelector(".profile__name")
const aboutProfile = document.querySelector(".profile__details")
const avatarProfile = document.querySelector(".profile__avatar")

let userId

//импорт класса-утилиты Api
import Api from "../components/Api.js"

// Функция создания карточек по экземпляру класса Card
function createCard(data) {
  const card = new Card(
    data,
    ".element-template",
    openPopupImage,

    userId,
    async () => {
      try {
        const response = await api.addLike(data._id)
        card.like()
        card.setLikesCount(response)
      } catch (error) {
        return console.log(`Ошибка: ${error}`)
      }
    },
    async () => {
      try {
        const response = await api.removeLike(data._id)
        card.dislike()
        card.setLikesCount(response)
      } catch (error) {
        return console.log(`Ошибка: ${error}`)
      }
    },
    () => {
      popupConfirmation.open(card)
    }
  )

  return card.generateCard()
}

//Открытие увеличенной картинки
function openPopupImage(name, link) {
  popupImage.open(name, link)
}

//Форма редактирования профиля
async function handleSubmitFormEditProfile(data) {
  try {
    const userProfile = await api.editProfileUserInfo(data)
    user.setUserInfo(userProfile)
  } catch (error) {
    return console.log(`Ошибка: ${error}`)
  }
}

//Форма обновления аватара
async function handleSubmitFormUpdateAvatar(data) {
  try {
    const userProfile = await api.updateProfileUserAvatar(data)
    user.setUserInfo(userProfile)
  } catch (error) {
    return console.log(`Ошибка: ${error}`)
  }
}

//Форма добавления карточек
async function handleSubmitFormAddCard(data) {
  try {
    const newCard = await api.addNewCard(data)
    cardList.addItem(createCard(newCard))
  } catch (error) {
    return console.log(`Ошибка: ${error}`)
  }
}


//Создание обьекта класса PopupWithImage
const popupImage = new PopupWithImage(".popup_type_image")

const popupAdd = new PopupWithForm(
  ".popup_type_add-element",
  handleSubmitFormAddCard
)

const popupEdit = new PopupWithForm(
  ".popup_type_edit-profile",
  handleSubmitFormEditProfile
)

const popupAvatar = new PopupWithForm(
  ".popup_type_update-avatar",
  handleSubmitFormUpdateAvatar
)

const user = new UserInfo({
  name: nameProfile,
  about: aboutProfile,
  avatar: avatarProfile,
})

profileEditButton.addEventListener(
  "click",
  () => {
    popupEdit.open()
    popupEdit.setInputValue(user.getUserInfo())
    validatorFormEditProfile.disableSubmitButton()
  },
  false
)

profileUpdateAvatar.addEventListener(
  "click",
  () => {
    popupAvatar.open()
    validatorFormUpdateAvatar.disableSubmitButton()
  },
  false
)

profileAddButton.addEventListener(
  "click",
  () => {
    popupAdd.open()
    validatorFormAddProfile.disableSubmitButton()
  },
  false
)

// Для каждой проверяемой формы новый экземпляр класса FormValidator
const validatorFormEditProfile = new FormValidator(
  formValidationConfig,
  formEditProfile
)

validatorFormEditProfile.enableValidation()

const validatorFormAddProfile = new FormValidator(
  formValidationConfig,
  formAddProfile
)

validatorFormAddProfile.enableValidation()

const validatorFormUpdateAvatar = new FormValidator(
  formValidationConfig,
  formUpdateAvatar
)

validatorFormUpdateAvatar.enableValidation()

const popupConfirmation = new PopupConfirmation(
  ".popup_type_confirmation",
  async (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        card.remove()
        popupConfirmation.close()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }
)

//Загрузка карточек с сервера
const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data)

      cardList.addItem(card)
    },
  },
  ".elements"
)

console.log()

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "f70fd1ec-6366-4aff-9447-5f962e306222",
    "Content-Type": "application/json",
  },
})

//Отрисовка карточек с сервера + отрисовка данных пользователя
Promise.all([api.getRealUserInfo(), api.getInitialCards()])
  .then(([userProfile, cards]) => {
    user.setUserInfo(userProfile)
    userId = userProfile._id
    cardList.renderItems(cards)
  })

  .catch((error) => console.log(`Ошибка: ${error}`))

