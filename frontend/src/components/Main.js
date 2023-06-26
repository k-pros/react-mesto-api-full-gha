import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {

  const currentUser = React.useContext(CurrentUserContext); // подписка на контекст данных пользователя
    
  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <button
            onClick={onEditAvatar}
            type="button"
            aria-label="Загрузить новое фото"
            className="profile__avatar-edit-btn"
          >
            <img
              src={currentUser.avatar}
              alt="Фото пользователя"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              type="button"
              aria-label="Редактировать"
              className="profile__edit-btn link"
            ></button>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          aria-label="Добавить"
          className="profile__add-btn link"
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((item) => {
             return (
               <Card key={item._id} card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
              )
            }
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
