import React, { useState } from "react";

function Login(props) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = formValue;
    props.onLogin(email, password);
  }

  return (
    <section className="auth">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="form__title form__title_place_auth">Вход</h2>
        <input
          type="email"
          id="email"
          name="email"
          className="form__input form__input_type_auth"
          placeholder="Email"
          onChange={handleChange}
          value={formValue.email}
          required
        />
        <span className="email-error form__input-error"></span>
        <input
          type="password"
          id="password"
          name="password"
          className="form__input form__input_type_auth"
          placeholder="Пароль"
          onChange={handleChange}
          value={formValue.password}
          required
        />
        <span className="password-error form__input-error"></span>
        <button type="submit" aria-label="Зарегистрироваться" className="form__button form__button_place_auth">Войти</button>
      </form>
    </section>
  )
}

export default Login;