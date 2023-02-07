const profile = document.querySelector(".profile");
const profileName = document.querySelector(".profile__name");
const profileDetails = document.querySelector(".profile__details");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");

const buttonSave = document.querySelector(".popup__button-save");
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

const likeActive = "element__button-like_active"

// функция открытия попапа
function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function openPropfilePopup() { 
  popupName.value = profileName.textContent;
  popupInfo.value = profileDetails.textContent;
  openPopup(popup) 
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
}

function imageOpen(card, link) {
  const cardTitle = card.querySelector(".element__title").textContent
  imageImg.src = link
  imageImg.alt = cardTitle
  imageTitle.textContent = cardTitle
  openPopup(popupImage)
}

function createCard(value) {
  const card = template.querySelector(".element").cloneNode(true)
  const title = card.querySelector(".element__title")
  const photo = card.querySelector(".element__photo")
  const photoDelete = card.querySelector(".element__delete")
  const like = card.querySelector(".element__button-like")
    title.textContent = value.name
    photo.src = value.link
    photo.alt = value.name
    photo.addEventListener("click", () => {
      imageOpen(card, value.link)
    })
    photoDelete.addEventListener("click", () => {
      card.remove()
    })
    like.addEventListener("click", () => { 
      like.classList.toggle(likeActive)
    })
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
  openPopup(popupEditProfile);
});

// событие при клике на кнопку добавления фото
profileAddBtn.addEventListener("click", () => {
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