const async = require('async');
const mongoose = require('mongoose');
const validator = require('validator');

const Image = require('../image/Image');

const fetchAPRandMarketPrice = require('./functions/fetchAPRandMarketPrice');
const getStake = require('./functions/getStake');

const language_values = ['en', 'tr', 'ru'];

const DEFAULT_UPDATE_TIME_IN_MS = 5 * 60 * 1000;
const DUPLICATED_UNIQUE_FIELD_ERROR_CODE = 11000;
const MAX_DATABASE_TEXT_FIELD_LENGTH = 1e4;
const LANGUAGE_LENGTH = 2;

const Schema = mongoose.Schema;

const StakeSchema = new Schema({
  order: {
    type: Number,
    required: true
  },
  is_stakable: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: false
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  language: {
    type: String,
    length: LANGUAGE_LENGTH,
    required: true
  },
  name: {
    type: String,
    required: true,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  image: {
    type: String,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH,
    required: true
  },
  stake_url: {
    type: String,
    default: null,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  how_to_stake_url: {
    type: String,
    default: null,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  apr: {
    type: Number,
    default: null
  },
  market_price: {
    type: Number,
    default: null
  },
  apr_api_url: {
    type: String,
    default: null,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  market_price_api_url: {
    type: String,
    default: null,
    maxlength: MAX_DATABASE_TEXT_FIELD_LENGTH
  },
  last_update_time_in_ms: {
    type: Number,
    default: null
  }
});

StakeSchema.statics.findStakeById = function (id, callback) {
  const Stake = this;

  if (!id || !validator.isMongoId(id.toString()))
    return callback('bad_request');

  Stake.findById(mongoose.Types.ObjectId(id.toString()), (err, stake) => {
    if (err) return callback('database_error');
    if (!stake) return callback('document_not_found');

    return callback(null, stake);
  });
};

StakeSchema.statics.findStakeByIdAndFormat = function (id, callback) {
  const Stake = this;

  Stake.findStakeById(id, (err, stake) => {
    if (err) return callback(err);

    getStake(stake, (err, stake) => {
      if (err) return callback(err);

      return callback(null, stake);
    });
  });
};

StakeSchema.statics.findStakeCountByLanguage = function (language, callback) {
  const Stake = this;

  if (!language || !language_values.includes(language))
    return callback('bad_request');

  Stake
    .find({
      language,
      is_deleted: { $ne: true } 
    })
    .countDocuments()
    .then(number => callback(null, number))
    .catch(err => callback('database_error'));
};

StakeSchema.statics.findStakesByFilters = function (data, callback) {
  const Stake = this;

  const filters = { is_deleted: { $ne: true } };

  if ('is_stakable' in data)
    filters.is_stakable = data.is_stakable ? true : false;

  if ('is_active' in data)
    filters.is_active = data.is_active ? true : false;

  if (data.language && language_values.includes(data.language))
    filters.language = data.language;

  Stake
    .find(filters)
    .sort({
      order: 1,
      language: 1
    })
    .then(stakes => async.timesSeries(
      stakes.length,
      (time, next) => getStake(stakes[time], (err, stake) => next(err, stake)),
      (err, stakes) => {
        if (err) return callback('database_error');

        return callback(null, stakes);
      }
    ))
    .catch(err => callback('database_error'));
};

StakeSchema.statics.checkIfImageIsUsed = function (url, callback) {
  const Stake = this;

  if (!url || typeof url != 'string')
    return callback('bad_request');

  Stake.findOne({
    image: url.trim()
  }, (err, stake) => {
    if (err)
      return callback('database_error');
    if (!stake)
      return callback(null, false);
    return callback(null, true);
  });
};

module.exports = mongoose.model('Stake', StakeSchema);
