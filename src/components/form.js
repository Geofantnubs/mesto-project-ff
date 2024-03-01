import { createCard, deleteCard, likeCard, placesList } from "./card";
import { seachPopupIsOpen, closePopup } from "./modal";
import {
  zoomImg,
  profilName,
  profilDesc,
  showProfilInfo,
  showAvatar,
} from "../index.js";
import { editUser, addCard, deleteDataCard, editDataAvatar } from "./api.js";

// Функция которая показывает имя и работу пользователя при первом открытии
function addInfoFromProfil() {
  const profilForm = document.querySelector(".edit-profil");
  profilForm.querySelector(".popup__input_type_name").value =
    profilName.textContent;
  profilForm.querySelector(".popup__input_type_description").value =
    profilDesc.textContent;
}

// Редактирование текста кнопки в ожидании ответа с сервера
function loadButton(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранить...";
  } else {
    button.textContent = "Сохранить";
  }
}

// Функция редактирования аватара
function handleFormSubmitAvatar() {
  const avatarForm = document.querySelector(".edit-avatar");
  const urlInputAvatar = avatarForm.querySelector(
    ".popup__input_type_avatar_url"
  );
  const avatarButton = avatarForm.querySelector(".popup__button");

  loadButton(true, avatarButton);
  editDataAvatar(urlInputAvatar.value)
    .then((data) => {
      data;
      showAvatar();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      loadButton(false, avatarButton);
    });

  closePopup(seachPopupIsOpen());
}


// Функция редактирования профиля
function handleFormSubmitProfil() {
  const profilForm = document.querySelector(".edit-profil");
  const nameInputProfil = profilForm.querySelector(".popup__input_type_name");
  const jobInputProfil = profilForm.querySelector(
    ".popup__input_type_description"
  );
  const profilButton = profilForm.querySelector(".popup__button");

  loadButton(true, profilButton);
  editUser(nameInputProfil.value, jobInputProfil.value)
    .then((editDataUser) => {
      editDataUser;
      showProfilInfo();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      loadButton(false, profilButton);
    });
  closePopup(seachPopupIsOpen());
}

// Функция добавления карточки
function handleFormSubmitCard() {
  const cardForm = document.querySelector(".new-place");
  const nameInputCard = cardForm.querySelector(".popup__input_type_card-name");
  const urlInputCard = cardForm.querySelector(".popup__input_type_url");
  const cardButton = cardForm.querySelector(".popup__button");

  const name = nameInputCard.value;
  const link = urlInputCard.value;

  loadButton(true, cardButton);
  addCard(name, link)
    .then((data) => {
      placesList.prepend(
        createCard(
          link,
          name,
          data._id,
          likeCard,
          zoomImg,
          data.likes,
          data.likes.length
        )
      );
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      loadButton(false, cardButton);
    });

  nameInputCard.value = "";
  urlInputCard.value = "";

  closePopup(seachPopupIsOpen());
}

// Удаление карточки
function handleFormSubmitDelete(cardId, card) {
  deleteCard(card);
  deleteDataCard(cardId)
  .then((data) => data)
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  });
  cardId = null;
  card = null;
  closePopup(seachPopupIsOpen());
}

// Функция обработчик кнопки отправить
function submitForm(nameForm, handleForm) {
  const forms = document.forms[nameForm];
  forms.addEventListener("submit",handleForm);
}

export {
  handleFormSubmitProfil,
  handleFormSubmitCard,
  handleFormSubmitDelete,
  addInfoFromProfil,
  handleFormSubmitAvatar,
  submitForm,
};
