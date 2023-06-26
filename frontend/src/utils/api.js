class Api {
  constructor({ url }) {
    this._url = url;
  }

  // обработчик ответов сервера
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
     // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`); 
  }

  // метод загрузки информации о пользователе с сервера
  getUserInfo() {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
      }
    })
      .then(this._handleResponse);
  }

  // метод обновления профайла
  updateUserInfo(data) {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._handleResponse);
  }

  // метод обновления аватара
  updateAvatar(data) {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._handleResponse);
  }

  // метод загрузки карточек с сервера
  getInitialCards() {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
      }
    })
      .then(this._handleResponse);
  }

  // метод отправки карточки на сервер
  addNewCard(data) {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._handleResponse);
  }

  // метод удаления карточки на сервере
  deleteCard(cardId) {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${jwt}`,
      }
    })
      .then(this._handleResponse);
  }

  // метод добавления и удаления лайка с карточки
  changeLikeCardStatus(cardId, isLiked) {
    const jwt = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        authorization: `Bearer ${jwt}`,
      }
    })
      .then(this._handleResponse);
  }
}

const api = new Api({
  url: "http://127.0.0.1:3000"
});

export default api;