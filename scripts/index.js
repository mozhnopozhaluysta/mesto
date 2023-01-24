const profile = document.querySelector(".profile");
const profileName = document.querySelector(".profile__name");
const profileDetails = document.querySelector(".profile__details");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");

const popup = document.querySelector(".popup");
const buttonClose = document.querySelector(".popup__button-close");
const buttonSave = document.querySelector(".popup__button-save");
const popupName = document.querySelector(".popup__input_type_name");
const popupInfo = document.querySelector(".popup__input_type_info");
const popupForm = document.querySelector(".popup__form");

// функция открытия попапа
function openSubmit() {
    popup.classList.add("popup_opened");
    popupName.value = profileName.textContent;
    popupInfo.value = profileDetails.textContent;
}

// функция обновленной информации о имени и деталях в профиль
function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileDetails.textContent = popupInfo.value;
    closeSubmit();
}

// функция закрытия попапа
function closeSubmit() {
    popup.classList.remove("popup_opened");
}

// событие при клике на кнопку редактирования профиля
profileEditBtn.addEventListener("click", () => {
    openSubmit();
});

// событие отправки информации из формы
popupForm.addEventListener("submit", handleFormSubmit);

// событие при клике на кнопку закртыия попапа
buttonClose.addEventListener("click", closeSubmit);