import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddNewPlace }) {
  const [name, setName] = React.useState(""); // стейт названия карточки
  const [link, setLink] = React.useState(""); // стейт ссылки на изображение

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddNewPlace({ name, link })
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="cardname"
        name="name"
        className="form__input form__input_type_name-card"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span className="cardname-error form__input-error"></span>
      <input
        type="url"
        id="url-card"
        name="link"
        className="form__input form__input_type_img-link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span className="url-card-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
