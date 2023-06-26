import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false); // стейт попапа изменения аватара
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false); // стейт попапа редактирования профайла
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false); // стейт попапа добавления новой карточки
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false); // стейт попапа результата регистрации пользователя
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''}); // стейт выбранной карточки
  const [currentUser, setCurrentUser] = React.useState({}); // стейт текущего пользователя
  const [cards, setCards] = React.useState([]); // стейт карточек
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // стейт авторизации пользователя
  const [email, setEmail] = React.useState('') // стейт email пользователя
  const [isSuccess, setIsSuccess] = React.useState(false) // стейт успешной регистрации/авторизации

  const navigate = useNavigate();

  // получение токена из локального хранилище
  function getToken() {
    return localStorage.getItem('token');
  }

  // загрузка информации о пользователе с сервера
  React.useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return
    }

    api.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  // загрузка карточек с сервера
  React.useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return
    }

    api.getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  // проверка токена
  React.useEffect(() => {
    checkToken();
  }, []);

  // функция проверки токена
  function checkToken() {
    const jwt = getToken();
    if (!jwt) {
      return
    }

    auth.checkToken(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmail(res.email);
          navigate('/')
        }
      })
      .catch((err) => console.log(err));
  }

  // обработчик кнопки редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // обработчик кнопки редактирования профайла
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // обработчик кнопки добавления новой карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // обработчик клика по изображению карточки
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // обработчик регистрации на сервере

  function handleRegister() {
    setIsSuccess(true);
    setIsInfoTooltipPopupOpen(true);
  }

  // обработчик отображения сообщения об ошибке
  function handleError(err) {
    setIsSuccess(false);
    setIsInfoTooltipPopupOpen(true);
  }

  // обработчик постановки или снятия лайка с карточки
  function handleCardLike(card) {
    // Проверка, есть ли уже лайк на этой карточке от текущего пользователя
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // console.log(isLiked);
    
    // Отправка запроса в API и получение обновлённых данных карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  // обработчик удаления карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  // обработчик обновления данных пользователя
  function handleUpdateUser(userData) {
    api.updateUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  // обработчик обновления аватара
  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  // обработчик добавления новой карточки
  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  function handleSignOut() {
    setIsLoggedIn(false);    
  }

  // закрытие всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function onLogin(email, password) {
    auth.autorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          checkToken();
        }
      })
      .catch((err) => handleError(err))
  }
  
  function onRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        navigate('/sign-in');
        handleRegister();
      })
      .catch((err) => {
        console.log(err);
        handleError(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={email} onSignOutClick={handleSignOut} />

        <Routes>
          <Route
            path="/*"
            element={
              !isLoggedIn ? <Navigate to="/sign-in" /> : <Navigate to="/" />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={onLogin} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
        </Routes>

        {isLoggedIn && <Footer />}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddNewPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;