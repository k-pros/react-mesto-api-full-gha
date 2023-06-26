import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_image ${card.name ? " popup_opened" : ""}`} >
      <figure className="popup__image">
        <img src={card.link ? card.link : "#"} alt={card.name} className="popup__img" />
        <figcaption className="popup__img-title">{card.name}</figcaption>
        <button onClick={onClose} type="button" aria-label="Закрыть" className="popup__close link"></button>
      </figure>
    </div>
  )
}

export default ImagePopup;