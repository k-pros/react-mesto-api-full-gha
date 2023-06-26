const Card = require('../models/card');
const {
  ForbiddenError,
  IncorrectError,
  NotFoundError,
} = require('../errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then((cards) => res.send(cards.reverse()))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      Card.findById(card._id)
        .populate(['likes', 'owner'])
        .then((newCard) => res.status(201).send(newCard))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new IncorrectError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Запрещено удалять карточки других пользователей');
      }
      return card.deleteOne()
        .then(() => res.status(200).send(card));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectError('Передан несуществующий _id карточки'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .populate(['likes', 'owner'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectError('Переданы некорректные данные для постановки лайка'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .populate(['likes', 'owner'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectError(' Переданы некорректные данные для снятия лайка'));
      }
      return next(err);
    });
};
