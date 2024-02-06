const popup = document.querySelectorAll(".popup");

const addOpen = "popup_is-opened";
const addAnimation = "popup_is-animated";
const popupArray = Array.from(popup);
const popupProfil = seachElArray(".popup_type_edit");
const popupNewCard = seachElArray(".popup_type_new-card");
const popupImage = seachElArray(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

function seachElArray(name) {
  let result = document.querySelector(name);
  popupArray.find(function (el) {
    el === result;
  });
  return result;
}

// Добавление плавности попап
popupArray.map(function (evt) {
  evt.classList.add(addAnimation);
});

// Функция открытия попап
function openPopup(name) {
  name.classList.add(addOpen);
  addEventListener("keydown", closeEscPopup);
}

// Функция удаления попап
function closePopup(evt) {
  evt = seachElArray(".popup_is-opened");
  evt.classList.remove(addOpen);
  removeEventListener("keydown", closeEscPopup);
  removeEventListener("click", closeOverlayPopup);
}

// Функция удаления попап по кнопке Esc
function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

// Функция удаления попап по оверлею
function closeOverlayPopup(evt) {
  if (evt.target === seachElArray(".popup_is-opened")) {
    closePopup();
  }
}

export {
  openPopup,
  closePopup,
  closeOverlayPopup,
  popupProfil,
  popupNewCard,
  popupImage,
  popupImg,
  popupCaption,
};
