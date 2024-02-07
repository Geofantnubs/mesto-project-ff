const popups = document.querySelectorAll(".popup");

const popupArray = Array.from(popups);

// Добавление плавности попап
popupArray.map(function (evt) {
  evt.classList.add("popup_is-animated");
});

// Функция открытия попап
function openPopup(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscPopup);
}

// Функция удаления попап
function closePopup(element) {
  element = document.querySelector(".popup_is-opened");

  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscPopup);
}

// Функция удаления попап по кнопке Esc
function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

// Функция удаления попап по оверлею
function closeOverlayPopup(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup();
  }
}

export { openPopup, closePopup, closeOverlayPopup };
