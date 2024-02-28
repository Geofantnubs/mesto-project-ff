import {
  createCard,
  deleteCard,
  cardTemplate,
  likeCard,
  placesList,
  cardDelete
} from "./card";
import { seachPopupIsOpen, closePopup } from "./modal";
import {
  zoomImg,
  profilName,
  profilDesc,
  config,
  pushProfilInfo,
} from "../index.js";
import { editUser, addCard, getCard, deleteDataCard } from "./api.js";
import { data } from "autoprefixer";

function seachProfilPopup(form, input) {
  return (
    document.querySelector(`.${form}`), document.querySelector(`.${input}`)
  );
}

// функция редактирования профиля
function handleFormSubmitProfil() {
  const nameInputProfil = seachProfilPopup(
    "edit-profil",
    "popup__input_type_name"
  );
  const jobInputProfil = seachProfilPopup(
    "edit-profil",
    "popup__input_type_description"
  );
  editUser(nameInputProfil.value, jobInputProfil.value).then((editDataUser) => {
    editDataUser;
    pushProfilInfo(nameInputProfil.value, jobInputProfil.value);
  });

  closePopup(seachPopupIsOpen());
}

//Функция которая показывает имя и работу пользователя при первом открытии
function addInfoFromProfil() {
  seachProfilPopup("edit-profil", "popup__input_type_name").value =
    profilName.textContent;
  seachProfilPopup("edit-profil", "popup__input_type_description").value =
    profilDesc.textContent;
}

// Функция добавления карточки
function handleFormSubmitCard() {
  const cardNameInput = seachProfilPopup(
    "new-place",
    "popup__input_type_card-name"
  );
  const cardLinkInput = seachProfilPopup("new-place", "popup__input_type_url");
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  addCard(name, link)
  .then((data) => {
    placesList.prepend(
      createCard(link, name,data._id, likeCard, zoomImg, data.likes.length, )
    );
  });

  cardNameInput.value = "";
  cardLinkInput.value = "";

  closePopup(seachPopupIsOpen());
}
// Удаление карточки
function handleFormSubmitDelete(cardId, card) {
  deleteCard(card)
deleteDataCard(cardId)
cardId = null
card = null
  closePopup(seachPopupIsOpen());
}

function submitForm(nameForm, handleForm) {
  const forms = document.forms[nameForm];
  forms.addEventListener("submit", () => {
    handleForm();
  });
}

export {
  handleFormSubmitProfil,
  handleFormSubmitCard,
  handleFormSubmitDelete,
  addInfoFromProfil,
  submitForm,
};
