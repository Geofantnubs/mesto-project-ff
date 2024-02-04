import "./pages/index.css";
import {
  formElementProfil,
  formElementCard,
  handleFormSubmit,
  newCardAdd,
  placesList,
} from "./components/form.js";
import {
  initialCards,
  createCard,
  deleteCard,
  likeCard,
  zoomImg,
} from "./components/cards.js";
import {
  popupAdd,
  popupEcs,
  removePopup,
  createCardOpen,
  profilOpen,
  closePopup,
  popupOverClose,
  popup,
} from "./components/modal.js";

// @todo: Вывести карточки на страницу
initialCards.forEach(function (el) {
  placesList.append(
    createCard(el.link, el.name, deleteCard, likeCard, zoomImg)
  );
});

// Открытие попап
createCardOpen.addEventListener("click", popupAdd);

profilOpen.addEventListener("click", popupAdd);

// Закрытие попап
closePopup.forEach(function (btn) {
  btn.addEventListener("click", removePopup);
});

document.addEventListener("keydown", popupEcs);

document.addEventListener("click", popupOverClose);

// Отправка формы кнопкой сохранить
formElementProfil.addEventListener("submit", handleFormSubmit);
formElementCard.addEventListener("submit", newCardAdd);
