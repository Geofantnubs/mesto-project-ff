import { createCard, deleteCard, placesList, likeButtonCallback } from "./card";
import { seachPopupIsOpen, closePopup } from "./modal";
import {
  zoomImg,
  profilName,
  profilDesc,
  showProfilInfo,
  showAvatar,
  deleteCardCallback,
} from "../index.js";
import {
  editUser,
  addCard,
  deleteDataCard,
  editDataAvatar,
  getUser,
} from "./api.js";
import {
  nameInputProfil,
  jobInputProfil,
  profilButton,
  urlInputAvatar,
  avatarButton,
  nameInputCard,
  urlInputCard,
  cardButton,
  cardForm,
} from "./constans.js";

// Функция которая показывает имя и работу пользователя при первом открытии
function addInfoFromProfil() {
  nameInputProfil.value = profilName.textContent;
  jobInputProfil.value = profilDesc.textContent;
}

// Редактирование текста кнопки в ожидании ответа с сервера
function loadButton(isLoading, button) {
  button.textContent = isLoading ? "Сохранить..." : "Сохранить";
}

// Функция редактирования аватара
function handleFormSubmitAvatar(evt) {
  evt.preventDefault();

  loadButton(true, avatarButton);
  editDataAvatar(urlInputAvatar.value)
    .then((dataAvatar) => {
      showAvatar(dataAvatar);
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
function handleFormSubmitProfil(evt) {
  evt.preventDefault();

  loadButton(true, profilButton);
  editUser(nameInputProfil.value, jobInputProfil.value)
    .then((editDataUser) => {
      editDataUser;
      showProfilInfo(editDataUser);
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
function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const name = nameInputCard.value;
  const link = urlInputCard.value;

  loadButton(true, cardButton);
  Promise.all([addCard(name, link), getUser()])
    .then(([data, userId]) => {
      placesList.prepend(
        createCard(
          data,
          userId._id,
          deleteCardCallback,
          likeButtonCallback,
          zoomImg
        )
      );
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      loadButton(false, cardButton);
    });

  cardForm.reset();

  closePopup(seachPopupIsOpen());
}

// Удаление карточки
function handleFormSubmitDelete(cardDelete) {
  deleteDataCard(cardDelete.cardId)
    .then(() => deleteCard(cardDelete.card))
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    });

  closePopup(seachPopupIsOpen());
}

// Функция обработчик кнопки отправить
function submitForm(nameForm, handleForm) {
  const forms = document.forms[nameForm];
  forms.addEventListener("submit", handleForm);
}

export {
  handleFormSubmitProfil,
  handleFormSubmitCard,
  handleFormSubmitDelete,
  addInfoFromProfil,
  handleFormSubmitAvatar,
  submitForm,
};
