import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateAvatar({
     avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        id="url-avatar"
        name="avatar"
        className="form__input form__input_type_img-link"
        placeholder="Ссылка на новое фото"
        required
      />
      <span className="url-avatar-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
