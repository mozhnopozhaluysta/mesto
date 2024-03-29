// Cоздание класса Api описание работы логики, обращения к Api
export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl
      this._headers = options.headers
    }
  
    // Формирование запроса на сервер, если не удачно, то возвращаем ошибку!
    _handleSendingRequest(res) {
      if (res.ok) {
        return Promise.resolve(res.json())
      }
  
      // Если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  
    // Метод загрузки информации о пользователе с сервера
    async getRealUserInfo() {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      })
      return this._handleSendingRequest(response)
    }
  
    // Метод загрузки карточек с сервера
    async getInitialCards() {
      const response = await fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      })
      return this._handleSendingRequest(response)
    }
  
    // Метод редактирование профиля
    async editProfileUserInfo(data) {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      })
      return this._handleSendingRequest(response)
    }
  
    // Метод добавления новой карточки с сервера
    async addNewCard(data) {
      const response = await fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data),
      })
      return this._handleSendingRequest(response)
    }
  
    // Метод постановки лайка карточки
    async addLike(cardId) {
      const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
      return this._handleSendingRequest(response)
    }
  
    // Метод удаления карточки
    async removeCard(cardId) {
      const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
      return this._handleSendingRequest(response)
    }
  
    // Метод постановки и снятия лайка с карточки
    async removeLike(cardId) {
      const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      return this._handleSendingRequest(response)
    }
  
    // Метод обновления аватара пользователя
    async updateProfileUserAvatar(data) {
      const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      })
      return this._handleSendingRequest(response)
    }
  }