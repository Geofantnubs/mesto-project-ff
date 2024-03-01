import "./pages/index.css";
import { openPopup, closePopupClick } from "./components/modal.js";

import {
  handleFormSubmitCard,
  handleFormSubmitProfil,
  addInfoFromProfil,
  submitForm,
  handleFormSubmitAvatar,
} from "./components/form.js";

import {
  disabledButton,
  hideInputPopupError,
  enableValidation,
  toggleButtonState,
} from "./components/validation.js";

import { getUser } from "./components/api.js";
import { showCardsPage } from "./components/card.js";

showCardsPage();
// Переменные главного файла
const popupImage = document.querySelector(".popup_type_image");
const cardDelete = {};

// Переменные модальных окон
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Переменные формы
const profilName = document.querySelector(".profile__title");
const profilDesc = document.querySelector(".profile__description");
const profilAvatar = document.querySelector(".profile__image");

// Функция показа информации о пользователе с сервера
function showProfilInfo() {
  getUser()
  .then((dataUser) => {
    profilName.textContent = dataUser.name;
    profilDesc.textContent = dataUser.about;
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  });
}
// Функция показа аватара с сервера
function showAvatar() {
  getUser()
  .then((dataUser) => {
    profilAvatar.style.backgroundImage = `url(${dataUser.avatar})`;
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  });
}


// Функция открытия попап аватара
function openPopupAvatar() {
  const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
  const buttonOpenPopupAvatar = document.querySelector(".profile__image");
  const avatarForm = popupEditAvatar.querySelector(".edit-avatar");

  buttonOpenPopupAvatar.addEventListener("click", () => {
    hideInputPopupError(avatarForm);
    toggleButtonState(avatarForm);
    openPopup(popupEditAvatar);
  });
}

// Функция открытия попап профиля
function openPopupProfil() {
  const popupProfil = document.querySelector(".popup_type_edit");
  const buttonOpenPopupProfil = document.querySelector(".profile__edit-button");
  const profilForm = popupProfil.querySelector(".edit-profil");

  buttonOpenPopupProfil.addEventListener("click", () => {
    addInfoFromProfil();
    disabledButton(profilForm);
    hideInputPopupError(profilForm);
    openPopup(popupProfil);
  });
}

// Функция открытия попап добавления карточки
function openPopupCard() {
  const buttonOpenPopupCard = document.querySelector(".profile__add-button");
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const cardForm = popupNewCard.querySelector(".new-place");

  buttonOpenPopupCard.addEventListener("click", () => {
    hideInputPopupError(cardForm);
    toggleButtonState(cardForm);
    openPopup(popupNewCard);
  });
}

// функция увеличения карточки
function zoomImg(link, name) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openPopup(popupImage);
}

showProfilInfo();
showAvatar();
submitForm("editAvatar", handleFormSubmitAvatar);
submitForm("editProfile", handleFormSubmitProfil);
submitForm("newPlace", handleFormSubmitCard);
closePopupClick();
enableValidation();
openPopupAvatar();
openPopupProfil();
openPopupCard();

export {
  profilName,
  profilDesc,
  zoomImg,
  popupImg,
  popupCaption,
  showProfilInfo,
  cardDelete,
  showAvatar,
};
