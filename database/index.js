const mongoose = require('mongoose');
const Promise = require('bluebird');
const Schema = mongoose.Schema;

mongoose.Promise = Promise;

//?? assert.equal(query.exec().constructor, require('bluebird'));
const dbURI = 'mongodb://localhost:27017/NewsDB';
mongoose.connect(dbURI);

const db = mongoose.connection;

db.on('error', () => console.log('db connection error!'));
db.once('open', () => console.log('mongoose connected successfully'));

const articleSchema = new Schema({
  uuid: {type: String, required: true},
  date: {type: Date, default: Date.now},
  stateCode: {type: String, uppercase: true, minlength: 2, maxlength: 2},
  text: String
});

const stateTones = new Schema({
  state: String,
  tones: {
    anger: {type: Number, default: null},
    disgust: {type: Number, default: null},
    fear: {type: Number, default: null},
    sadness: {type: Number, default: null},
    joy: {type: Number, default: null}
  }
});

const StateTone = mongoose.model('StateTone', stateTones);
const Article = mongoose.model('Article', articleSchema);

module.exports = {
  StateTone,
  Article
};
