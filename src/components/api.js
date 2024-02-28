import { data } from "autoprefixer";
import { pushProfilInfo, pushProfilInfoError } from "..";
import { showCardsPage, addNewCard, cardTemplate, createCard } from "./card";
import { handleFormSubmitDelete } from "./form";

const config = {
  profilUrl: 'https://nomoreparties.co/v1/wff-cohort-7/users/me',
  cardUrl: 'https://nomoreparties.co/v1/wff-cohort-7/cards',
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
  return res.json()
  .then((error) => {
    console.log(error);
    error.httpResponseCose = res.status;
    return Promise.reject(error);
  });
}

 export function getCard () {
  return fetch(`${config.cardUrl}`, {
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

export function getUser () {
  return fetch(`${config.profilUrl}`, {
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

export function editUser (name, about) {
  return fetch(`${config.profilUrl}`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
  .then(res => checkResponse(res))
}

export function addCard (name, link) {
  return fetch(`${config.cardUrl}`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => checkResponse(res))
}

export function deleteDataCard (cardId) {
  return fetch(`${config.cardUrl}/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
}

export function addDataLike (cardId) {
 return fetch(`${config.cardUrl}/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => checkResponse(res))

}

export function removeDataLike (cardId) {
  return fetch(`${config.cardUrl}/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkResponse(res))
}

// // Поиск всех карточек на сервере
//  export function getCards () {
//   return fetch(`https://nomoreparties.co/v1/wff-cohort-7/cards`, {
//     method: 'GET',
//     headers: config.headers,
//   })
//   .then((res) => checkResponse(res))
//   .then ((dataCard) => {
//     return dataCard
//   })
// }

// // Добал карточку на сервер
//  export function addNewCardPage (name, link) {
//   return fetch(`https://nomoreparties.co/v1/wff-cohort-7/cards`, {
//     method: "POST",
//     headers: config.headers,
//     body: JSON.stringify({
//       name: name,
//       link: link,
//     })
//   })
//     .then(res => checkResponse(res))
//     .then((data) => {
//       addNewCard(data.name, data.link, data.likes)
//     })
// }


// // Запрос информации о пользователе с сервера
// export function getUserInfo() {
//   return fetch(`https://nomoreparties.co/v1/${config.baseUrl}/users/me`, {
//     method: "GET",
//     headers: config.headers,
//   })
//     .then((res) => checkResponse(res))
//     .then((dataUser) => {
//       return dataUser
//     })

// }



// // Редактирование информации о пользователе
// export function editUserInfo(name, job) {
//   return fetch(`https://nomoreparties.co/v1/${config.baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify({
//       name: name,
//       about: job,
//     }),
//   })
//     .then((res) => checkResponse(res))
//     .then((data) => pushProfilInfo(data.name, data.about))

// }




//  export function laodingPage () {
//   Promise.all([getUserInfo(), getCards()])
//   .then(([dataUser, dataCard]) => {
//     pushProfilInfo(dataUser.name, dataUser.about, dataUser.avatar, dataUser._id)
//     showCardsPage (dataCard, dataUser)
//   })
// }

//  export function deleteCardForId (cardId) {
//   return fetch(`https://nomoreparties.co/v1/wff-cohort-7/cards/${cardId}`, {
//     method: 'DELETE',
//     headers: config.headers
// })
// }

