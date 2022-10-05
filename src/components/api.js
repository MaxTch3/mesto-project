const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-15',
  headers: {
    authorization: 'df96d3b0-3822-438d-a20e-f1a1a788e6cc',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(checkResponse(res))
};

export const getInitialCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(checkResponse(res))
}

export const setUserInfo = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job
    })
  })
  .then(checkResponse(res))
}

export const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse(res))
}

export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse(res))
}

export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(checkResponse(res))
}

export const dislikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse(res))
}

export const patchAvatar = (avatar) => {
  return fetch('https://nomoreparties.co/v1/plus-cohort-15/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(checkResponse(res))
}
