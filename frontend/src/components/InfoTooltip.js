import React from "react";
import icoSuccess from '../images/ico-success.svg';
import icoError from '../images/ico-error.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_type_info-tooltip ${props.isOpen ? " popup_opened" : ""}`}>
      <div className="popup__container">
        <div className="info-tooltip__container">
          <img className="info-tooltip__ico" src={props.isSuccess ? icoSuccess : icoError} alt={props.isSuccess ? 'Успешная регистрация' : 'Ошибка'} />
          <p className="info-tooltip__desc">{props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
          <button onClick={props.onClose} type="button" aria-label="Закрыть" className="popup__close link"></button>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;