const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: [/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.()))(:\d{2,5})?((\/.+)+)?\/?#?/, 'Неверный формат ссылки'],
  },
  trailerLink: {
    type: String,
    required: true,
    match: [/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.()))(:\d{2,5})?((\/.+)+)?\/?#?/, 'Неверный формат ссылки'],
  },
  thumbnail: {
    type: String,
    required: true,
    match: [/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.()))(:\d{2,5})?((\/.+)+)?\/?#?/, 'Неверный формат ссылки'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    precision: 0,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    match: [/^[?'&-«»_:–!,.A-Za-zа-яА-ЯёЁ0-9\s]+$/],
  },
  nameEN: {
    type: String,
    required: true,
    match: [/^[?'&-«»_:–!,.A-Za-zа-яА-ЯёЁ0-9\s]+$/],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', userSchema);
