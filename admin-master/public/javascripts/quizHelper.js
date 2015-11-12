/**
 * Created by Edgar on 10/14/15.
 */
var newQuiz;
var space = "&nbsp; &nbsp; &nbsp; &nbsp;";
var questionCount = 0;
$(document).ready(function(){
    //HTML DOM Objects
    var jQuiz = $('#quiz');
    var jQuestions = $('#questions');

    $('#newQuiz').click(function(){
        var quizName = $('#quizName').val();
        var tourID = $('#tourID').val();
        newQuiz = new Quiz(quizName, tourID);
        $('#initQuiz').remove();
        jQuiz.before("<div>"+quizName+"</div><br>");
        generateQATemplate();

    });

    function generateQATemplate(){
        jQuestions.append(
            "<div id='tempQuestion'>" +
            "Question:<input type='text' id='newQuestion'>"+
            "<br>"+
            "Possible Answers:<br>"+
            "Answer 1: <input type='text' id='answer1'>" +
            "<br>" +
            "Answer 2: <input type='text' id='answer2'>" +
            "<br>" +
            "Answer 3: <input type='text' id='answer3'>" +
            "<br>" +
            "Answer 4: <input type='text' id='answer4'>" +
            "<br>" +
            "Answer 5: <input type='text' id='answer5'>" +
            "<br>" +
            "<br>" +
            "Answer key #: <input type='text' id='answerKey'>"+
            "<br><br>" +
            "<input type='button' id='submitQuestion' value='Submit Question'>" +
			"<input type='button' id='submitQuiz' value='Submit Quiz'>" +
            "</div>"
        );

        $('#submitQuestion').click(function(){
            addQuestion();
        });
		
		$('#submitQuiz').click(function(){
			submitQuiz();
		});

    }

    function addQuestion(){
		var i = 0;
        var questionName = $('#newQuestion').val();
        var arrQuestion = [];
		
		if( $('#newQuestion').val() != '' && $('#answerKey').val() != ''){
		
		} else{
		
		}
		
		if( !($('#answer1').val() == '')) {
			arrQuestion[i] = $('#answer1').val();
			i++;
		}
		
		if( !($('#answer2').val() == '')) {
			arrQuestion[i] = $('#answer2').val();
			i++;
		}
		
		if( !($('#answer3').val() == '')) {
			arrQuestion[i] = $('#answer3').val();
			i++;
		}
			
		if( !($('#answer4').val() == '')) {
			arrQuestion[i] = $('#answer4').val();
			i++;
		}
				
		if( !($('#answer5').val() == '')) {
			arrQuestion[i] = $('#answer5').val();
			i++;
		}
			
        var answer = $('#answerKey').val();
        newQuiz.addQuestion(questionName, arrQuestion, answer);
        $('#tempQuestion').remove();
		var $questionDiv = $("<div>", {id: "q"+questionCount});
		$questionDiv.append("<br><b>" + questionName +":</b>" + space + "<input type='button' id='question"+questionCount+"' value='Edit'><br>");
		
		for(var i = 0; i < arrQuestion.length; i++) {
			$questionDiv.append(space, (i+1) +") " + arrQuestion[i]+"<br>");
		}
		$questionDiv.append("Answer: " + answer +"<br>");
		jQuiz.append($questionDiv);
		editQuestion();
        generateQATemplate();
    };
	
	function editQuestion(){
		var temp = "question" + questionCount++;
		$('#'+temp).click(function(){
			editTemplate(temp);
		});
		
	}
	
	function editTemplate(question){
		var index = question.match(/(\d\d)|(\d)/g);
		$('#tempQuestion').remove();
		var temp = newQuiz.getQuestions();
		var question = temp[index];
		temp = newQuiz.getAnswers();
		var answers = temp[index];
		for(var i = 0; i < 5; i++){
			if(typeof(answers[i]) == 'undefined'){
				answers[i] = "";
			}
		}
		temp = newQuiz.getAnswerKeys();
		var answerKey = temp[index];
		jQuestions.append(
            "<div id='tempQuestion'>" +
            "Question:<input type='text' id='newQuestion' value='"+question+"'>"+
            "<br>"+
            "Possible Answers:<br>"+
            "Answer 1: <input type='text' id='answer1' value='"+answers[0]+"'>" +
            "<br>" +
            "Answer 2: <input type='text' id='answer2' value='"+answers[1]+"'>" +
            "<br>" +
            "Answer 3: <input type='text' id='answer3' value='"+answers[2]+"'>" +
            "<br>" +
            "Answer 4: <input type='text' id='answer4' value='"+answers[3]+"'>" +
            "<br>" +
            "Answer 5: <input type='text' id='answer5' value='"+answers[4]+"'>" +
            "<br>" +
            "<br>" +
            "Answer key #: <input type='text' id='answerKey' value='"+answerKey+"'>"+
            "<br><br>" +
            "<input type='button' id='submitEdit' value='Submit Edit'>" + space +
			"<input type='button' id='cancelEdit' value='Cancel Edit'>" +
            "</div>"
        );

		$('#submitEdit').click(function(){
			submitEdit(index);
		});

		$('#cancelEdit').click(function(){
			$('#tempQuestion').remove();
			generateQATemplate();
		});
	}

	function submitEdit(index){
		var i = 0;
        var questionName = $('#newQuestion').val();
        var arrQuestion = [];
		
		if( $('#newQuestion').val() != '' && $('#answerKey').val() != ''){
		
		} else{
		
		}
		
		if( !($('#answer1').val() == '')) {
			arrQuestion[i] = $('#answer1').val();
			i++;
		}
		
		if( !($('#answer2').val() == '')) {
			arrQuestion[i] = $('#answer2').val();
			i++;
		}
		
		if( !($('#answer3').val() == '')) {
			arrQuestion[i] = $('#answer3').val();
			i++;
		}
			
		if( !($('#answer4').val() == '')) {
			arrQuestion[i] = $('#answer4').val();
			i++;
		}
				
		if( !($('#answer5').val() == '')) {
			arrQuestion[i] = $('#answer5').val();
			i++;
		}
			
        var answer = $('#answerKey').val();
        newQuiz.addQuestion(questionName, arrQuestion, answer, index);
        $('#tempQuestion').remove();
		var temp = "q" + index;
		var $questionDiv = $('#'+temp);
		$questionDiv.empty();
		$questionDiv.append("<br><b>" + questionName +":</b>" + space + "<input type='button' id='question"+questionCount+"' value='Edit'><br>");
		
		for(var i = 0; i < arrQuestion.length; i++) {
			$questionDiv.append(space, (i+1) +") " + arrQuestion[i]+"<br>");
		}
		$questionDiv.append("Answer: " + answer +"<br>");
		editQuestion();
        generateQATemplate();
	}
	
	function submitQuiz(){
		//Ajax by Dennis
		$.ajax({
			url: '/addQuiz2', //Post url
			type: 'POST',
			dataType: "json", 
			data: {  //JSON data
				name: newQuiz.getQuizName(),
				tour: newQuiz.getTourID(),
				questions: JSON.stringify(newQuiz.getQuestions()), //Array to json string
				answers: JSON.stringify(newQuiz.getAnswers()),
				answerKeys: JSON.stringify(newQuiz.getAnswerKeys())
			},
			success: function(){
				
			},
		});
		window.location.replace('/viewQuizzes2'); //redirect 
	};
	}
});
