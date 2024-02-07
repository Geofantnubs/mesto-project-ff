// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
function createCard(link, name, delCard, like, zoomCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  deleteButton.addEventListener("click", delCard);
  likeButton.addEventListener("click", like);
  cardImage.addEventListener("click", function () {
    zoomCard(link, name);
  });

  return cardElement;
}

// Функция лайка карточки
function likeCard(evt) {
  return evt.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  return evt.target.closest(".card").remove();
}

export { createCard, deleteCard, likeCard };
