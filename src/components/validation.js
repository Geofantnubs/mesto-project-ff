// Выводит ошибку валидации
function showInputPopupError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_active");
}

// Сбрасывает ошибку валидации формы
function hideInputPopupError(formElement) {
  const inputLists = Array.from(formElement.querySelectorAll(".popup__input"));
  inputLists.forEach((inputElement) => {
    const errorElement = formElement.querySelector(
      `.${inputElement.name}-error`
    );

    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__error_active");
    errorElement.textContent = "";
  });
}

// Проверяет форму на ошибку валидации и показыввет сообщение об ошибке
function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputPopupError(
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputPopupError(formElement);
  }
}

// Показывает ошибку и диактивирует кнопку при не правльном вводе в поля инпутов
function setEventListeners(formElement) {
  const inputLists = Array.from(formElement.querySelectorAll(".popup__input"));

  inputLists.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(formElement, inputLists);
    });
  });
}

// Добавил слушатель для всех кнопок отправить
function enableValidation() {
  const formLists = Array.from(document.querySelectorAll(".popup__form"));
  formLists.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}
// Валидация полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
// Добавление блокировки для кнопки
function toggleButtonState(formElement, inputList) {
  const buttonElement = formElement.querySelector(".popup__button");

  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.removeAttribute("disabled");
  }
}

// Сброс блокировки для кнопки
function disabledButton(formElement) {
  const buttonElement = formElement.querySelector(".popup__button");
  buttonElement.removeAttribute("disabled");
}

export {disabledButton, hideInputPopupError, enableValidation}
