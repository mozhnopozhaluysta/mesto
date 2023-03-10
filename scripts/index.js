import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { photoElements, formValidationConfig } from "./modules.js";

const profile = document.querySelector(".profile");
const profileName = document.querySelector(".profile__name");
const profileDetails = document.querySelector(".profile__details");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");

const popupName = document.querySelector(".popup__input_type_name");
const popupInfo = document.querySelector(".popup__input_type_info");
const popupForm = document.querySelector("#form-details");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-element");

const buttonCloseEditProfile = popupEditProfile.querySelector(".popup__button-close");
const buttonCloseAddCard = popupAddCard.querySelector(".popup__button-close");

const photoContainer = document.querySelector(".elements")
const template = document.querySelector(".element-template").content

const popupImage = document.querySelector(".popup_type_image")
const imageClosePopup = popupImage.querySelector(".popup__close")
const imageImg = document.querySelector(".popup__image")
const imageTitle = document.querySelector(".popup__image-title")

const imgName = document.querySelector(".popup__input_type_img-name")
const ImgLink = document.querySelector(".popup__input_type_img-link")

const popupFormAdd = document.querySelector("#form-add-element")

const popupFormEdit = document.querySelector("#form-details");

const likeActive = "element__button-like_active"

const popupEditProfileValidation = new FormValidator(
  formValidationConfig,
  popupEditProfile
)

popupEditProfileValidation.enableValidation()
const popupAddCardValidation = new FormValidator(
  formValidationConfig,
  popupAddCard
)

popupAddCardValidation.enableValidation()

// функция открытия попапа
function openPopup(popup) {
    document.addEventListener("keydown", closePopupOnEscape)
    popup.classList.add("popup_opened");
}

function closePopupOnEscape(evt) {
  if (evt.code === "Escape") {
    const popup = document.querySelector(".popup_opened")
    closePopup(popup)
  }
}

// функция обновленной информации о имени и деталях в профиль
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = popupName.value;
  profileDetails.textContent = popupInfo.value;
  closePopup(popupEditProfile);
}

// функция закрытия попапа редактирования
function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupOnEscape)
}

popupEditProfile.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupEditProfile)
  }
})

popupAddCard.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupAddCard)
  }
})

popupImage.addEventListener("click", (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(popupImage)
  }
})

function openImagePopup(card, link) {
  imageImg.src = link
  imageImg.alt = card
  imageTitle.textContent = card
  openPopup(popupImage)
}

function createCard(value) {
  const card = new Card(value, ".element-template", openImagePopup).generateCard()
  return card
}

function renderCard(card, container) {
  container.prepend(card)
}

function render() {
  photoElements.reverse().forEach((value) => {
    const newCard = createCard(value)
    if (newCard) renderCard(newCard, photoContainer)
  })
}

render()

function submitCardForm(evt) {
  evt.preventDefault()
  const name = imgName.value
  const link = ImgLink.value
  const newCard = createCard({ name, link })
  if (newCard) renderCard(newCard, photoContainer)
  closePopup(popupAddCard)
  popupFormAdd.reset()
}

// событие при клике на кнопку редактирования профиля
profileEditBtn.addEventListener("click", () => {
  popupName.value = profileName.textContent;
  popupInfo.value = profileDetails.textContent;
  popupEditProfileValidation.disableSubmitButton();
  openPopup(popupEditProfile);
});

// событие при клике на кнопку добавления фото
profileAddBtn.addEventListener("click", () => {
  popupAddCardValidation.disableSubmitButton();
  openPopup(popupAddCard);
});

// событие отправки информации из формы редактирования
popupForm.addEventListener("submit", handleEditFormSubmit);

// событие при клике на кнопку закрытия попапа редактирования
buttonCloseEditProfile.addEventListener("click", ()=> {
  closePopup(popupEditProfile);
})

// событие при клике на кнопку закрытия попапа добавления фото
buttonCloseAddCard.addEventListener("click", ()=> {
closePopup(popupAddCard);
})

// событие при клике на кнопку закрытия попапа с фото
imageClosePopup.addEventListener("click", ()=> {
closePopup(popupImage);
})

popupFormAdd.addEventListener("submit", submitCardForm)
