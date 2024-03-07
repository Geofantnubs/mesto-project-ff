import "./pages/index.css";
import {
  openPopup,
  closeOverlayPopup,
  closePopup,
  seachPopupIsOpen,
  addPopupAnimation,
} from "./components/modal.js";

import {
  handleFormSubmitCard,
  handleFormSubmitProfil,
  addInfoFromProfil,
  submitForm,
  handleFormSubmitAvatar,
  handleFormSubmitDelete,
} from "./components/form.js";

import { enableValidation, clearValidation } from "./components/validation.js";

import { getUser, getCard } from "./components/api.js";
import {
  placesList,
  createCard,
  likeButtonCallback,
} from "./components/card.js";

// Переменные главного файла
const popupImage = document.querySelector(".popup_type_image");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_avtive",
};
const cardDelete = {};


// Переменные модальных окон
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Переменные формы
const profilName = document.querySelector(".profile__title");
const profilDesc = document.querySelector(".profile__description");
const profilAvatar = document.querySelector(".profile__image");

// Функция показа информации о пользователе
function showProfilInfo(dataUser) {
  profilName.textContent = dataUser.name;
  profilDesc.textContent = dataUser.about;
}
// Функция показа аватара
function showAvatar(dataUser) {
  profilAvatar.style.backgroundImage = `url(${dataUser.avatar})`;
}

// Сброс блокировки для кнопки "Сохранить" в профиле
function disabledButton(formElement, validationConfig) {
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  buttonElement.removeAttribute("disabled");
}

// Функция открытия попап аватара
function initOpenPopupAvatar() {
  const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
  const buttonOpenPopupAvatar = document.querySelector(".profile__image");
  const avatarForm = popupEditAvatar.querySelector(".edit-avatar");

  buttonOpenPopupAvatar.addEventListener("click", () => {
    clearValidation(avatarForm, validationConfig);
    openPopup(popupEditAvatar);
  });
}

// Функция открытия попап профиля
function initOpenPopupProfil() {
  const popupProfil = document.querySelector(".popup_type_edit");
  const buttonOpenPopupProfil = document.querySelector(".profile__edit-button");
  const profilForm = popupProfil.querySelector(".edit-profil");

  buttonOpenPopupProfil.addEventListener("click", () => {
    addInfoFromProfil();
    clearValidation(profilForm, validationConfig);
    disabledButton(profilForm, validationConfig);
    openPopup(popupProfil);
  });
}

// Функция открытия попап добавления карточки
function initOpenPopupCard() {
  const buttonOpenPopupCard = document.querySelector(".profile__add-button");
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const cardForm = popupNewCard.querySelector(".new-place");

  buttonOpenPopupCard.addEventListener("click", () => {
    clearValidation(cardForm, validationConfig);
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

// Функция удаления карточки
function deleteCardCallback(card, cardId) {
  const popupDelete = document.querySelector(".popup_type_delete-card");
  cardDelete.cardId = cardId;
  cardDelete.card = card;
  openPopup(popupDelete);
}

// Функция закрытия попап по крестику
function initClosePopupClick() {
  const popupCloseButtons = document.querySelectorAll(".popup__close");

  popupCloseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      closePopup(seachPopupIsOpen());
    });
  });

  document.addEventListener("click", closeOverlayPopup);
}

// Функция вывода на страницу информации
function showCardAndProfilePage() {
  Promise.all([getCard(), getUser()])
    .then(([dataCard, dataUser]) => {
      showProfilInfo(dataUser);
      showAvatar(dataUser);
      dataCard.forEach((card) => {
        placesList.append(
          createCard(
            card,
            dataUser._id,
            deleteCardCallback,
            likeButtonCallback,
            zoomImg
          )
        );
      });
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });
}


showCardAndProfilePage();
addPopupAnimation();
initOpenPopupAvatar();
initOpenPopupProfil();
initOpenPopupCard();
initClosePopupClick();
enableValidation(validationConfig);
submitForm("editAvatar", handleFormSubmitAvatar);
submitForm("editProfile", handleFormSubmitProfil);
submitForm("newPlace", handleFormSubmitCard);
submitForm("delete-card", () => {
  handleFormSubmitDelete(cardDelete);
});


export {
  profilName,
  profilDesc,
  zoomImg,
  popupImg,
  popupCaption,
  showProfilInfo,
  showAvatar,
  deleteCardCallback,
};
