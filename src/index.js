import "./pages/index.css";
// import { showCardsPage } from "./components/card.js";
import { openPopup, closePopupClick } from "./components/modal.js";

import {
  handleFormSubmitCard,
  handleFormSubmitProfil,
  addInfoFromProfil,
  submitForm,
  handleFormSubmitDelete,
} from "./components/form.js";

import {
  disabledButton,
  hideInputPopupError,
  enableValidation,
  toggleButtonState,
} from "./components/validation.js";

import { getUser } from "./components/api.js";
import { showCardsPage } from "./components/card.js";


showCardsPage()
// Переменные главного файла
const popupImage = document.querySelector(".popup_type_image");
const cardDelete = {}


// Переменные модальных окон
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

// Переменные формы
const profilName = document.querySelector(".profile__title");
const profilDesc = document.querySelector(".profile__description");


// Клик по аватару
function editAvatar() {

}

// editAvatar()


function pushProfilInfo (name, about) {
  getUser()
  .then((dataUser) => {
    name = dataUser.name
    about = dataUser.about
    profilName.textContent = dataUser.name
    profilDesc.textContent = dataUser.about
  const profilAvatar = dataUser.avatar
  const profilId = dataUser._id
  })

}


pushProfilInfo()

function pushProfilInfoError (err) {
  profilName.textContent = err
  profilDesc.textContent = err
}

// Открытие попапа форм, обнуление ошибок и активация кнопки
function openPopupClick() {
  const buttonOpenPopupCard = document.querySelector(".profile__add-button");
  const buttonOpenPopupProfil = document.querySelector(".profile__edit-button");
  const popupProfil = document.querySelector(".popup_type_edit");
  const popupNewCard = document.querySelector(".popup_type_new-card");
  const profilForm = popupProfil.querySelector(".edit-profil");
  const cardForm = popupNewCard.querySelector(".new-place");
  const avatar = document.querySelector('.profile__image')
  const popupEditAvatar = document.querySelector('.popup_type_edit-avatar')
  const avatarForm = popupEditAvatar.querySelector('.edit-avatar')

  avatar.addEventListener('click', () => {
    openPopup(popupEditAvatar)
    hideInputPopupError(avatarForm);

  })

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

submitForm("editProfile", () => {handleFormSubmitProfil()});
submitForm("newPlace", () => {handleFormSubmitCard()});
closePopupClick();
enableValidation();
openPopupClick();



export { profilName, profilDesc, zoomImg, popupImg, popupCaption, pushProfilInfo, pushProfilInfoError, cardDelete };
