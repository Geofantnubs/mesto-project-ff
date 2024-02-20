import "./pages/index.css";
import { addCardsToPage } from "./components/card.js";
import { openPopup, closePopupClick } from "./components/modal.js";

import {
  handleFormSubmitCard,
  handleFormSubmitProfil,
  addInfoFromProfil,
  submitForm,
} from "./components/form.js";

import {
  disabledButton,
  hideInputPopupError,
  enableValidation,
} from "./components/validation.js";

// Переменные главного файла
const popupImage = document.querySelector(".popup_type_image");

// Переменные модальных окон
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Переменные формы
const profilName = document.querySelector(".profile__title");
const profilDesc = document.querySelector(".profile__description");

// Открытие попапа форм, обнуление ошибок и активация кнопки
function openPopupClick() {
  const buttonOpenPopupCard = document.querySelector(".profile__add-button");
  const buttonOpenPopupProfil = document.querySelector(".profile__edit-button");
  const popupProfil = document.querySelector(".popup_type_edit");
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const profilForm = popupProfil.querySelector(".edit-profil");
  const cardForm = popupNewCard.querySelector(".new-place");

  buttonOpenPopupProfil.addEventListener("click", () => {
    addInfoFromProfil();
    disabledButton(profilForm);
    hideInputPopupError(profilForm);
    openPopup(popupProfil);
  });

  buttonOpenPopupCard.addEventListener("click", () => {
    const inputLists = Array.from(cardForm.querySelectorAll(".popup__input"));
    hideInputPopupError(cardForm);
    toggleButtonState(cardForm, inputLists);
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

addCardsToPage();
submitForm("editProfile", handleFormSubmitProfil);
submitForm("newPlace", handleFormSubmitCard);
closePopupClick();
enableValidation();
openPopupClick();

export { profilName, profilDesc, zoomImg, popupImg, popupCaption };
