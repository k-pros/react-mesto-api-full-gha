import React from 'react';

function PopupWithForm({isOpen, onClose, name, title, buttonText, onSubmit, children}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? " popup_opened" : ""}`}>
      <div className="popup__container">
        <form name={name} className={`form popup__form form_type_${name}`} onSubmit={onSubmit}>
          <h2 className="form__title">{title}</h2>
          {children}
          <button type="submit" className="form__button">{buttonText}</button>
        </form>
        <button onClick={onClose} type="button" aria-label="Закрыть" className="popup__close link"></button>
      </div>
    </div>
  )
}

export default PopupWithForm;