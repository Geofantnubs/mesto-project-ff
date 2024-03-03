import { addDataLike, removeDataLike } from "./api.js";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Переменные карточек
const placesList = document.querySelector(".places__list");
const cardDelete = {};

// Функция создания карточки
function createCard(cardData, userId, deleteCallback, likeCallback, zoomCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  likeCount.textContent = cardData.likes.length;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeCardDefailt(likeButton, cardData, userId);

  if (!deleteButtonRemove(cardData.owner._id, userId, deleteButton)) {
    deleteButton.addEventListener("click", () => {
      deleteCallback(card, cardData._id);
    });
  }

  likeButton.addEventListener("click", (evt) => {
    likeCallback(evt, cardData._id, likeCount);
  });

  cardImage.addEventListener("click", () => {
    zoomCard(cardData.link, cardData.name);
  });

  return cardElement;
}

// Вывод лайкнутой карточки
function likeCardDefailt(likeButton, cardData, userId) {
  if (cardData.likes.some((el) => el._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
}

// Функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// Функция удаления иконки корзины, если карточку создал не пользователь
function deleteButtonRemove(cardId, userId, btn) {
  if (userId !== cardId) {
    btn.remove();
    return true;
  } else {
    return false;
  }
}

// Функция счётчика лайков
function likeButtonCallback(evt, cardId, likeCount) {

  const likeMethod = evt.target.classList.contains(
    "card__like-button_is-active"
  )
    ? removeDataLike
    : addDataLike;

  likeMethod(cardId)
    .then((data) => {
      likeCount.textContent = data.likes.length;
  likeCard(evt);

    })
    .catch((err) => console.log(err));
}

export {
  createCard,
  deleteCard,
  likeCard,
  placesList,
  likeButtonCallback,
  cardDelete,
};
