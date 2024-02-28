import { zoomImg, cardDelete } from "../index.js";
import { closePopup, openPopup, seachPopupIsOpen } from "./modal.js";
import { submitForm, handleFormSubmitDelete } from "./form.js";
import { addDataLike, getCard, getUser, removeDataLike } from "./api.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

// Функция удаления иконки корзины, если карточку создал не пользователь
function deleteButtonRemove(cardId, userId, btn) {
  if (userId !== cardId) {
    btn.remove();
  }
}

// @todo: Функция создания карточки
function createCard(
  link,
  name,
  cardId,
  like,
  zoomCard,
  count,
  cardOwnerId,
  userId,
  likes

) {
  const popupDelete = document.querySelector(".popup_type_delete-card");
  const cardElement = cardTemplate.cloneNode(true);
  const card = cardElement.querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  let likeCount = cardElement.querySelector(".card__like-count");

  likeCount.textContent = count;
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  deleteButtonRemove(cardOwnerId, userId, deleteButton);

  deleteButton.addEventListener("click", () => {
    cardDelete.cardId = cardId;
    cardDelete.card = card;
    openPopup(popupDelete);
  });
  likeCardDefailt(likeButton, likes, userId)

  likeButton.addEventListener("click", (evt) => {
    like(evt)
    toggleDataCard(evt, cardId, likeCount)
  });

  cardImage.addEventListener("click", () => {
    zoomCard(link, name);
  });

  return cardElement;
}
submitForm("delete-card", () => {
  handleFormSubmitDelete(cardDelete.cardId, cardDelete.card);
});

// Вывод лайкнутой карточки
function likeCardDefailt (likeButton ,likes, userId) {
  likes.find((el) => {
    if(el._id === userId) {
      likeButton.classList.add('card__like-button_is-active')
    }
  })
}

// Функция лайка карточки
function likeCard(evt) {
evt.target.classList.toggle('card__like-button_is-active')


}

function toggleDataCard(evt, cardId, likeCount) {
  if(evt.target.classList.contains('card__like-button_is-active')) {
    addDataLike(cardId)
    .then(data => {
      likeCount.textContent = data.likes.length
    })
  } else if (!evt.target.classList.contains('card__like-button_is-active'))
  removeDataLike(cardId)
  .then(data => {
    likeCount.textContent = data.likes.length
  })
}
// function removeLikeCard () {

// like.classList.toggle('card__like-button_is-active')

// }

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove();
}



// Добавить карточку на сервер и вывести на экран при нажатие на кнопку отправить

// Показать все карточки с сервера на экране
function showCardsPage() {
  Promise.all([getCard(), getUser()]).then(([dataCard, dataUser]) => {
    dataCard.forEach((card) => {
      placesList.append(
        createCard(
          card.link,
          card.name,
          card._id,
          likeCard,
          zoomImg,
          card.likes.length,
          card.owner._id,
          dataUser._id,
          card.likes
        )
      );
    });
  });
}

export { createCard, deleteCard, likeCard, placesList, showCardsPage };
