// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const openImg = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

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
  cardImage.addEventListener("click", zoomCard);

  return cardElement;
}

// функция увеличения карточки
function zoomImg(evt) {
  popupImg.src = evt.target.src;
  popupCaption.textContent = evt.target.alt;

  if (evt.target) {
    openImg.classList.add("popup_is-opened");
  }
}

// Функция лайка карточки
function likeCard(evt) {
  return evt.target.classList.toggle("card__like-button_is-active");
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  return evt.target.closest(".card").remove();
}

export { initialCards, createCard, deleteCard, likeCard, zoomImg };
