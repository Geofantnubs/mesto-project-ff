// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(link, name, delCard) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', delCard )

  return cardElement
}

// @todo: Функция удаления карточки
const deleteCard = () => document.querySelector('.card').remove()

// @todo: Вывести карточки на страницу
initialCards.forEach(function(el) {
  placesList.append(addCard(el.link, el.name, deleteCard))
})










