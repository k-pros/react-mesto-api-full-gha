require('dotenv').config();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
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

const {
  PORT, DB_URL, LIMITER_OPTIONS, CORS_OPTIONS,
} = require('./config');

const limiter = rateLimit(LIMITER_OPTIONS); // настройка лимитера запросов

const app = express();

mongoose.connect(DB_URL);

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(helmet()); // настройка заголовков HTTP для защиты приложения
app.use(limiter);

app.use(requestLogger); // подключаем логгер запросов

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
