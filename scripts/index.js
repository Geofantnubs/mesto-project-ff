// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(link, name, delCard) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  deleteButton.addEventListener('click',delCard );

  return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard =(evt) => evt.target.closest('.card').remove()

// @todo: Вывести карточки на страницу
initialCards.forEach(function(el) {
  placesList.append(createCard(el.link, el.name, deleteCard));
  })




















