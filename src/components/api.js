// Конфигурация стандартных данных о сервере и пользователе
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-7",
  headers: {
    authorization: "c553db93-94b3-43c9-8dc1-b6beb27be2dc",
    "Content-Type": "application/json",
  },
};

// Функция получения ответа с сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((error) => {
    console.log(error);
    error.httpResponseCose = res.status;
    return Promise.reject(error);
  });
}

// Функция поиска карточек на сервере
export function getCard() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// Функция поиска данных пользователя на сервере
export function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// Функция редактирования данных пользователя на сервере
export function editUser(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => checkResponse(res));
}

// Функция добавления карточки на сервер
export function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkResponse(res));
}

// Функция удаления карточки с сервера
export function deleteDataCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

// Функция добавления лайков на сервер
export function addDataLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// Функция удаления лайков с сервера
export function removeDataLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
}

// Функция редактирования аватара в профиле пользователя на сервере
export function editDataAvatar(userAvatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: userAvatar,
    }),
  }).then((res) => checkResponse(res));
}


