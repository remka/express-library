var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for date_of_birth
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return moment(this.date_of_birth).format('MMMM Do, YYYY');
});

AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return moment(this.date_of_death).format('MMMM Do, YYYY');
});

AuthorSchema
.virtual('lifespan')
.get(function () {
  var a = moment(this.date_of_death);
  var b = moment(this.date_of_birth);
  var years = a.diff(b, 'year');
  b.add(years, 'years');
  var months = a.diff(b, 'months');
  b.add(months, 'months');
  var days = a.diff(b, 'days');
  return {
    years: years,
    months: months,
    days: days
  }
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);
