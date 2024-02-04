import { createCard, deleteCard, likeCard, zoomImg } from "./cards";
import { removePopup } from "./modal";

const formElementProfil = document.forms.editProfile;
const formElementCard = document.forms.newPlace;
const cardNameInput = newPlace.elements.placeName;
const cardLinkInput = newPlace.elements.link;
const nameInput = editProfile.elements.name;
const jobInput = editProfile.elements.description;
const placesList = document.querySelector(".places__list");

// функция редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  const profilName = document.querySelector(".profile__title");
  const profilJob = document.querySelector(".profile__description");

  profilName.textContent = nameInput.value;
  profilJob.textContent = jobInput.value;

  removePopup();
}

// Функция добавления карточки из формы
function newCardAdd(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  placesList.prepend(createCard(link, name, deleteCard, likeCard, zoomImg));

  formElementCard.reset();

  removePopup();
}

export {
  formElementProfil,
  formElementCard,
  handleFormSubmit,
  newCardAdd,
  placesList,
};
