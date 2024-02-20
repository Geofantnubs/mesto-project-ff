import { createCard, deleteCard, likeCard, placesList } from "./card";
import { seachPopupIsOpen, closePopup } from "./modal";
import {
  zoomImg,
  profilName,
  profilDesc,
} from "../index.js";



function seachProfilPopup(form, input) {
  return (
    document.querySelector(`.${form}`), document.querySelector(`.${input}`)
  );
}

// функция редактирования профиля
function handleFormSubmitProfil(evt) {
  evt.preventDefault();

  const nameInputProfil = seachProfilPopup(
    "edit-profil",
    "popup__input_type_name"
  );
  const jobInputProfil = seachProfilPopup(
    "edit-profil",
    "popup__input_type_description"
  );

  profilName.textContent = nameInputProfil.value;
  profilDesc.textContent = jobInputProfil.value;

  closePopup(seachPopupIsOpen());
}

//Функция которая показывает имя и работу пользователя при первом открытии
function addInfoFromProfil() {
  seachProfilPopup("edit-profil", "popup__input_type_name").value =
    profilName.textContent;
  seachProfilPopup("edit-profil", "popup__input_type_description").value =
    profilDesc.textContent;
}

// Функция добавления карточки из формы
function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const cardNameInput = seachProfilPopup(
    "new-place",
    "popup__input_type_card-name"
  );
  const cardLinkInput = seachProfilPopup("new-place", "popup__input_type_url");

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  placesList.prepend(createCard(link, name, deleteCard, likeCard, zoomImg));

  cardNameInput.value = "";
  cardLinkInput.value = "";

  closePopup(seachPopupIsOpen());
}

function submitForm (nameForm, handleForm) {
  const forms = document.forms[nameForm]
    forms.addEventListener('submit', handleForm)
  }

export { handleFormSubmitProfil, handleFormSubmitCard, addInfoFromProfil, submitForm };
