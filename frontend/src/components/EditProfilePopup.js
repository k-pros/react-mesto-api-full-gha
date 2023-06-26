import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState(""); // стейт имени пользователя
  const [description, setDescription] = React.useState(""); // стейт описания пользователя

  const currentUser = React.useContext(CurrentUserContext); // Подписка на контекст

  // после загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }
  
  function handleSubmit(e) {
    e.preventDefault();
  
    // передача значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }  

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        type="text"
        id="username"
        name="name"
        className="form__input form__input_type_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="username-error form__input-error"></span>
      <input
        type="text"
        id="job"
        name="about"
        className="form__input form__input_type_job"
        placeholder="Деятельность"
        minLength="2"
        maxLength="200"
        required
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span className="job-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
