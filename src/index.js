import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import {
  closePopup,
  openPopup,
  closeOverlayPopup,
} from "./components/modal.js";

import {
  handleFormSubmitCard,
  handleFormSubmitProfil,
  addInfoFromProfil,
} from "./components/form.js";

// Переменные главного файла
const buttonOpenPopupCard = document.querySelector(".profile__add-button");
const buttonOpenPopupProfil = document.querySelector(".profile__edit-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popupProfil = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

// Переменные модальных окон
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Переменные формы
const formElementProfil = document.forms.editProfile;
const nameInputProfil = editProfile.elements.name;
const jobInputProfil = editProfile.elements.description;
const formElementCard = document.forms.newPlace;
const cardNameInput = newPlace.elements.placeName;
const cardLinkInput = newPlace.elements.link;
const profilName = document.querySelector(".profile__title");
const profilDesc = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (el) {
  placesList.append(
    createCard(el.link, el.name, deleteCard, likeCard, zoomImg)
  );
});

// Открытие попап
buttonOpenPopupCard.addEventListener("click", function () {
  openPopup(popupNewCard);
});

buttonOpenPopupProfil.addEventListener("click", function () {
  openPopup(popupProfil);
  addInfoFromProfil();
});

// функция увеличения карточки
function zoomImg(link, name) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openPopup(popupImage);
}

// Закрытие попап
popupCloseButtons.forEach(function (btn) {
  btn.addEventListener("click", closePopup);
});

document.addEventListener("click", closeOverlayPopup);

// Отправка формы кнопкой сохранить
formElementProfil.addEventListener("submit", handleFormSubmitProfil);
formElementCard.addEventListener("submit", handleFormSubmitCard);

export {
  nameInputProfil,
  jobInputProfil,
  cardNameInput,
  cardLinkInput,
  profilName,
  profilDesc,
  zoomImg,
  placesList,
  formElementCard,
  popupImg,
  popupCaption,
};
