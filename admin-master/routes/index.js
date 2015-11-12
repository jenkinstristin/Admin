var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Quiz = require('../models/Quiz.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	//res.render('index', { title: 'Tour Quizzes' });
	res.redirect('/viewQuizzes2');
});
/*Integration with Edgar's front end*/
router.get('/viewQuizzes2', function(req, res){
	var quiz = Quiz.find(function(err, quiz){
		if(err)
			res.send(err);
		res.render('viewQuizzes2', {quizzes: quiz}); //Render page to view quizzes
	});
});
router.get('/addQuiz2', function(req, res){
	res.render('addQuiz2'); //Render Edgar's page to add a quiz
});
router.post('/addQuiz2', function(req, res, next){
	var quiz = new Quiz(); //Make new quiz

	quiz.name=req.body.name; 
	quiz.tour=req.body.tour;
	
	/*Parse input from quizHelper*/
	var questions = JSON.parse(req.body.questions);
	var answers = JSON.parse(req.body.answers);
	var answerKeys = JSON.parse(req.body.answerKeys);
	
	//Input to subDocument of Quiz
	for(var i = 0; i < questions.length;i++){
		quiz.questions.push({question : questions[i], answers : answers[i],answerKey : answerKeys[0]});
	};

	//Save to database
	quiz.save(function(err){
		if(err)
			res.send(err);
	});
});







module.exports = router;
