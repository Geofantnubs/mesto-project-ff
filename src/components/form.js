import { createCard, deleteCard, likeCard } from "./card";
import { closePopup } from "./modal";
import {
  zoomImg,
  formElementCard,
  placesList,
  profilName,
  profilDesc,
  nameInputProfil,
  jobInputProfil,
  cardLinkInput,
  cardNameInput,
} from "../index.js";

// функция редактирования профиля
function handleFormSubmitProfil(evt) {
  evt.preventDefault();

  profilName.textContent = nameInputProfil.value;
  profilDesc.textContent = jobInputProfil.value;

  closePopup();
}

//Функция которая показывает имя и работу пользователя при первом открытии
function addInfoFromProfil() {
  nameInputProfil.value = profilName.textContent;
  jobInputProfil.value = profilDesc.textContent;
}

// Функция добавления карточки из формы
function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  placesList.prepend(createCard(link, name, deleteCard, likeCard, zoomImg));

  formElementCard.reset();

  closePopup();
}

export { handleFormSubmitProfil, handleFormSubmitCard, addInfoFromProfil };
