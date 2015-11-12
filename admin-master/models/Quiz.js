var mongoose = require('mongoose');

var schema = mongoose.Schema;

var questionSchema = new schema({
	question: String,
	answers: [String],
	answerKey: String
});

var quizSchema = new schema({
	name: String,
	tour: String,
	questions: [questionSchema]
},
{
	collection : 'quizzes'
});

module.exports = mongoose.model('Quiz',quizSchema);