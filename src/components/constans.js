// Пеменные для формы профиля
const profilForm = document.querySelector(".edit-profil");
const nameInputProfil = profilForm.querySelector(".popup__input_type_name");
const jobInputProfil = profilForm.querySelector(
  ".popup__input_type_description"
);
const profilButton = profilForm.querySelector(".popup__button");

// Переменные для формы аватара
const avatarForm = document.querySelector(".edit-avatar");
const urlInputAvatar = avatarForm.querySelector(
  ".popup__input_type_avatar_url"
);
const avatarButton = avatarForm.querySelector(".popup__button");

// Переменные для формы карточек
const cardForm = document.querySelector(".new-place");
const nameInputCard = cardForm.querySelector(".popup__input_type_card-name");
const urlInputCard = cardForm.querySelector(".popup__input_type_url");
const cardButton = cardForm.querySelector(".popup__button");

export {nameInputProfil, jobInputProfil, profilButton, urlInputAvatar, avatarButton, nameInputCard, urlInputCard, cardButton, cardForm, profilForm, avatarForm}
