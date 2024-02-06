import "./pages/index.css";
import {
  formElementProfil,
  formElementCard,
  handleFormSubmit,
  addNewCard,
  placesList,
  addFromProfil,
} from "./components/form.js";
import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
} from "./components/card.js";
import {
  openPopup,
  closePopup,
  closeOverlayPopup,
  popupNewCard,
  popupProfil,
  popupImage,
  popupImg,
  popupCaption,
} from "./components/modal.js";

const openCreateCard = document.querySelector(".profile__add-button");
const openProfil = document.querySelector(".profile__edit-button");
const closePopupButton = document.querySelectorAll(".popup__close");

// @todo: Вывести карточки на страницу
initialCards.forEach(function (el) {
  placesList.append(
    createCard(el.link, el.name, deleteCard, likeCard, zoomImg)
  );
});

// Открытие попап
openCreateCard.addEventListener("click", function () {
  openPopup(popupNewCard);
});

openProfil.addEventListener("click", function () {
  openPopup(popupProfil);
  addFromProfil();
});

// функция увеличения карточки
export function zoomImg(link, name) {
  popupImg.src = link;
  popupImg.alt = name;
  popupCaption.textContent = name;
  openPopup(popupImage);
}

// Закрытие попап
closePopupButton.forEach(function (btn) {
  btn.addEventListener("click", closePopup);
});

document.addEventListener("click", closeOverlayPopup);

// Отправка формы кнопкой сохранить
formElementProfil.addEventListener("submit", handleFormSubmit);
formElementCard.addEventListener("submit", addNewCard);
