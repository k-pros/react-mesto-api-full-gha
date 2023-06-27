require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const { login, createUser } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const { validateCreateUser, validateLogin } = require('./middlewares/validation');
const { handleErrors } = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  credentials: true,
};

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cors(corsOptions));
app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);
app.use(router);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use(handleErrors); // централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
