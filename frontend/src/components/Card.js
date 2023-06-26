import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext); // подписка на контекст данных пользователя
  const isOwn = (card.owner._id === currentUser._id); // является ли пользователь владельцем текущей карточки
  const isLiked = card.likes.some(item => item._id === currentUser._id); // есть ли у карточки лайк, поставленный текущим пользователем
  // переменная для подстановки в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
    `cards__like-btn ${isLiked && 'cards__like-btn_active'}` 
  ); 

  // обработчик клика по изображению карточки
  function handleClick() {
    onCardClick(card);
  }

  // обработчик клика по кнопке удаления карточки
  function handleDeleteClick() {
    onCardDelete(card)
  }

  // обработчик клика по кнопке лайка
  function handleLikeClick () {
    onCardLike(card);
  }

  return (
    <li className="cards__item">
      {isOwn && <button type="button" aria-label="Удалить" className="cards__trash link" onClick={handleDeleteClick} />}
      <img onClick={handleClick} src={card.link} alt={card.name} className="cards__img"/>
      <div className="cards__description">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__likes-container">
          <button type="button" aria-label="Лайк" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <span className="cards__likes-amount">{card.likes.length}</span>
        </div>
      </div>
    </li>      
  )
}

export default Card;