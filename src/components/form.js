import { createCard, deleteCard, likeCard } from "./card";
import { closePopup } from "./modal";
import { zoomImg } from "..";

const formElementProfil = document.forms.editProfile;
const nameInput = editProfile.elements.name;
const jobInput = editProfile.elements.description;
const formElementCard = document.forms.newPlace;
const cardNameInput = newPlace.elements.placeName;
const cardLinkInput = newPlace.elements.link;
const profilName = document.querySelector(".profile__title");
const profilDesc = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list");

// функция редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  profilName.textContent = nameInput.value;
  profilDesc.textContent = jobInput.value;

  closePopup();
}

//Функция которая показывает имя и работу пользователя при первом открытии
function addFromProfil() {
  nameInput.value = profilName.textContent;
  jobInput.value = profilDesc.textContent;
}

// Функция добавления карточки из формы
function addNewCard(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  placesList.prepend(createCard(link, name, deleteCard, likeCard, zoomImg));

  formElementCard.reset();

  closePopup();
}

export {
  formElementProfil,
  formElementCard,
  handleFormSubmit,
  addNewCard,
  addFromProfil,
  placesList,
};
