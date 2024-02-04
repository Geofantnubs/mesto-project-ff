const popup = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const createCardOpen = document.querySelector(".profile__add-button");
const profilOpen = document.querySelector(".profile__edit-button");
const closePopup = document.querySelectorAll(".popup__close");

const popupArray = Array.from(popup);
const open = "popup_is-opened";
const anima = "popup_is-animated";

// Добавление плавности попап
popupArray.map(function (evt) {
  evt.classList.add(anima);
});

// Функция открытия попап
function popupAdd(evt) {
  if (evt.target === profilOpen) {
    popupEdit.classList.add(open);
  }
  if (evt.target === createCardOpen) {
    popupNewCard.classList.add(open);
  }
}

// Функция удаления попап
function removePopup() {
  popupArray.map(function (evt) {
    evt.classList.remove(open);
  });
}

// Функция удаления попап по кнопке Esc
function popupEcs(evt) {
  if (evt.key === "Escape") {
    removePopup();
  }
}

// Функция удаления попап по оверлею
function popupOverClose(evt) {
  popupArray.map(function (el) {
    if (evt.target === el) {
      removePopup();
    }
  });
}

export {
  popupAdd,
  removePopup,
  popupEcs,
  createCardOpen,
  profilOpen,
  closePopup,
  popupOverClose,
  popup,
};
