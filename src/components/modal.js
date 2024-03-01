const popupArray = Array.from(document.querySelectorAll(".popup"));

// Ищем открытый попап
function seachPopupIsOpen() {
  return popupArray.find((popup) => {
    return popup.classList.contains("popup_is-opened");
  });
}

// Добавление плавности попап
function addPopupAnimation() {
  return popupArray.map((evt) => {
    return evt.classList.add("popup_is-animated");
  });
}

// Функция открытия попап
function openPopup(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEscPopup);
}

// Функция закрытия попап
function closePopup(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEscPopup);
}

// Функция удаления попап по кнопке Esc
function closeEscPopup(evt) {
  if (evt.key === "Escape") {
    closePopup(seachPopupIsOpen());
  }
}

// Функция удаления попап по оверлею
function closeOverlayPopup(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closePopup(evt.target);
  }
}

// Обработчик закрытия попапа
function closePopupClick() {
  const popupCloseButtons = document.querySelectorAll(".popup__close");

  popupCloseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      closePopup(seachPopupIsOpen());
    });
  });

  document.addEventListener("click", closeOverlayPopup);
}

addPopupAnimation();

export {
  openPopup,
  closeEscPopup,
  closePopupClick,
  seachPopupIsOpen,
  closePopup,
};
