// Выводит ошибку валидации
function showInputPopupError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_active");
}

// Сбрасывает ошибку валидации формы
function hideInputPopupError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_active");
  errorElement.textContent = "";
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
    hideInputPopupError(formElement, inputElement);
  }
}

// Показывает ошибку и диактивирует кнопку при не правльном вводе в поля инпутов
function setEventListeners(formElement, validationConfig) {
  const inputLists = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );

  inputLists.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(formElement, validationConfig);
    });
  });
}

// Добавил слушатель для всех кнопок отправить
export function enableValidation(validationConfig) {
  const formLists = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formLists.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

// Валидация полей
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Добавление блокировки для кнопки
function toggleButtonState(formElement, validationConfig) {
  const inputLists = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  if (hasInvalidInput(inputLists)) {
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.removeAttribute("disabled");
  }
}

// Функция которая очищает валидацию форм и делает кнопку не активной
export function clearValidation(formElement, validationConfig) {
  const inputLists = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );

  inputLists.forEach((inputElement) => {
    hideInputPopupError(formElement, inputElement);
  });
  
  toggleButtonState(formElement, validationConfig);

}
