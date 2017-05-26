var imageLoaderFlag = false;
$(document).ready(function() {
	$("#showConsultPrivately").on("click", function() {
		if (imageLoaderFlag) {
			$('.outer-bg').addClass("consultPrivatelyBg_dld");
			$('.outer-bg').removeClass("askQuestionBg_dld");
			$('.outer-bg').removeClass("bookAppointmentBg_dld");
			$('.outer-bg').removeClass("BookMedBg_dld");
			$('.outer-bg').removeClass("tourPackBg_dld");
			$('.outer-bg').removeClass("labTestBg_dld");
			$('.outer-bg').removeClass("diagReportBg_dld");
		} else {
			$('.outer-bg').addClass("consultPrivatelyBg");
			$('.outer-bg').removeClass("askQuestionBg");
			$('.outer-bg').removeClass("bookAppointmentBg");
			$('.outer-bg').removeClass("BookMedBg");
			$('.outer-bg').removeClass("tourPackBg");
			$('.outer-bg').removeClass("labTestBg");
			$('.outer-bg').removeClass("diagReportBg");
		}
		$('.a-consultPrivately').css("display", "");
		$('.a-askQuestion').css("display", "none");
		$('.a-bookAppointment').css("display", "none");
		$('.a-bookMed').css("display", "none");
		$('.a-labTest').css("display", "none");
		$('.a-tourPack').css("display", "none");
		$('.a-diagReport').css("display", "none");
	});
	$("#showDiagReport").on("click", function() {
		if (imageLoaderFlag) {
			$('.outer-bg').removeClass("consultPrivatelyBg_dld");
			$('.outer-bg').removeClass("askQuestionBg_dld");
			$('.outer-bg').removeClass("bookAppointmentBg_dld");
			$('.outer-bg').removeClass("BookMedBg_dld");
			$('.outer-bg').removeClass("tourPackBg_dld");
			$('.outer-bg').removeClass("labTestBg_dld");
			$('.outer-bg').addClass("diagReportBg_dld");
		} else {
			$('.outer-bg').removeClass("consultPrivatelyBg");
			$('.outer-bg').removeClass("askQuestionBg");
			$('.outer-bg').removeClass("bookAppointmentBg");
			$('.outer-bg').removeClass("BookMedBg");
			$('.outer-bg').removeClass("tourPackBg");
			$('.outer-bg').removeClass("labTestBg");
			$('.outer-bg').addClass("diagReportBg");
		}
		$('.a-consultPrivately').css("display", "none");
		$('.a-askQuestion').css("display", "none");
		$('.a-bookAppointment').css("display", "none");
		$('.a-bookMed').css("display", "none");
		$('.a-labTest').css("display", "none");
		$('.a-tourPack').css("display", "none");
		$('.a-diagReport').css("display", "");
	});
	$("#showTourPack").on("click", function() {
		if (imageLoaderFlag) {
			$('.outer-bg').removeClass("consultPrivatelyBg_dld");
			$('.outer-bg').removeClass("askQuestionBg_dld");
			$('.outer-bg').removeClass("bookAppointmentBg_dld");
			$('.outer-bg').removeClass("BookMedBg_dld");
			$('.outer-bg').addClass("tourPackBg_dld");
			$('.outer-bg').removeClass("labTestBg_dld");
			$('.outer-bg').removeClass("diagReportBg_dld");

		} else {
			$('.outer-bg').addClass("tourPackBg");
			$('.outer-bg').removeClass("askQuestionBg");
			$('.outer-bg').removeClass("bookAppointmentBg");
			$('.outer-bg').removeClass("BookMedBg");
			$('.outer-bg').removeClass("consultPrivatelyBg");
			$('.outer-bg').removeClass("labTestBg");
			$('.outer-bg').removeClass("diagReportBg");
		}
		$('.a-consultPrivately').css("display", "none");
		$('.a-tourPack').css("display", "");
		$('.a-askQuestion').css("display", "none");
		$('.a-bookAppointment').css("display", "none");
		$('.a-bookMed').css("display", "none");
		$('.a-labTest').css("display", "none");
		$('.a-diagReport').css("display", "none");
	});
	$("#showBookMed").on("click", function() {
		if (imageLoaderFlag) {
			$('.outer-bg').addClass("BookMedBg_dld");
			$('.outer-bg').removeClass("tourPackBg_dld");
			$('.outer-bg').removeClass("askQuestionBg_dld");
			$('.outer-bg').removeClass("bookAppointmentBg_dld");
			$('.outer-bg').removeClass("consultPrivatelyBg_dld");
			$('.outer-bg').removeClass("labTestBg_dld");
			$('.outer-bg').removeClass("diagReportBg_dld");
		} else {
			$('.outer-bg').addClass("bookMedBg");
			$('.outer-bg').removeClass("askQuestionBg");
			$('.outer-bg').removeClass("tourPackBg");
			$('.outer-bg').removeClass("bookAppointmentBg");
			$('.outer-bg').removeClass("consultPrivatelyBg");
			$('.outer-bg').removeClass("labTestBg");
			$('.outer-bg').removeClass("diagReportBg");
		}
		$('.a-bookMed').css("display", "");
		$('.a-askQuestion').css("display", "none");
		$('.a-bookAppointment').css("display", "none");
		$('.a-consultPrivately').css("display", "none");
		$('.a-tourPack').css("display", "none");
		$('.a-labTest').css("display", "none");
		$('.a-diagReport').css("display", "none");
	});
	$("#showAskQuestion").on("click", function() {
		if (imageLoaderFlag) {
			$('.outer-bg').removeClass("consultPrivatelyBg_dld");
			$('.outer-bg').addClass("askQuestionBg_dld");
			$('.outer-bg').removeClass("tourPackBg_dld");
			$('.outer-bg').removeClass("bookAppointmentBg_dld");
			$('.outer-bg').removeClass("BookMedBg_dld");
			$('.outer-bg').removeClass("labTestBg_dld");
			$('.outer-bg').removeClass("diagReportBg_dld");
		} else {
			$('.outer-bg').removeClass("consultPrivatelyBg");
			$('.outer-bg').addClass("askQuestionBg");
			$('.outer-bg').removeClass("tourPackBg");
			$('.outer-bg').removeClass("bookAppointmentBg");
			$('.outer-bg').removeClass("BookMedBg");
			$('.outer-bg').removeClass("labTestBg");
			$('.outer-bg').removeClass("diagReportBg");
		}
		$('.a-consultPrivately').css("display", "none");
		$('.a-askQuestion').css("display", "");
		$('.a-bookAppointment').css("display", "none");
		$('.a-bookMed').css("display", "none");
		$('.a-tourPack').css("display", "none");
		$('.a-labTest').css("display", "none");
		$('.a-diagReport').css("display", "none");
	});
	$("#showBookAppointment").on("click", function() {
		if (imageLoaderFlag) {
			$('.outer-bg').removeClass("consultPrivatelyBg_dld");
			$('.outer-bg').removeClass("askQuestionBg_dld");
			$('.outer-bg').addClass("bookAppointmentBg_dld");
			$('.outer-bg').removeClass("BookMedBg_dld");
			$('.outer-bg').removeClass("tourPackBg_dld");
			$('.outer-bg').removeClass("labTestBg_dld");
			$('.outer-bg').removeClass("diagReportBg_dld");
		} else {
			$('.outer-bg').removeClass("consultPrivatelyBg");
			$('.outer-bg').removeClass("askQuestionBg");
			$('.outer-bg').addClass("bookAppointmentBg");
			$('.outer-bg').removeClass("BookMedBg");
			$('.outer-bg').removeClass("tourPackBg");
			$('.outer-bg').removeClass("labTestBg");
			$('.outer-bg').removeClass("diagReportBg");
		}
		$('.a-consultPrivately').css("display", "none");
		$('.a-askQuestion').css("display", "none");
		$('.a-bookAppointment').css("display", "");
		$('.a-bookMed').css("display", "none");
		$('.a-tourPack').css("display", "none");
		$('.a-labTest').css("display", "none");
		$('.a-diagReport').css("display", "none");
	});
	$("#showLabTest").on("click", function() {
		if (imageLoaderFlag) {
			$('.outer-bg').removeClass("consultPrivatelyBg_dld");
			$('.outer-bg').removeClass("askQuestionBg_dld");
			$('.outer-bg').removeClass("bookAppointmentBg_dld");
			$('.outer-bg').removeClass("BookMedBg_dld");
			$('.outer-bg').removeClass("tourPackBg_dld");
			$('.outer-bg').addClass("labTestBg_dld");
			$('.outer-bg').removeClass("diagReportBg_dld");
		} else {
			$('.outer-bg').removeClass("consultPrivatelyBg");
			$('.outer-bg').removeClass("askQuestionBg");
			$('.outer-bg').removeClass("bookAppointmentBg");
			$('.outer-bg').removeClass("BookMedBg");
			$('.outer-bg').removeClass("tourPackBg");
			$('.outer-bg').addClass("labTestBg");
			$('.outer-bg').removeClass("diagReportBg");
		}
		$('.a-consultPrivately').css("display", "none");
		$('.a-askQuestion').css("display", "none");
		$('.a-bookAppointment').css("display", "none");
		$('.a-bookMed').css("display", "none");
		$('.a-tourPack').css("display", "none");
		$('.a-labTest').css("display", "");
		$('.a-diagReport').css("display", "none");
	});
    $('#question-AskQuestion').keypress(function(e){
      if(e.keyCode==13){
    	  $('#submitAskQuestionBtn').click();
          ga('send', 'event', 'Home Page', 'Ask a Question', 'Ask a Question');
      }
    });
    $('#submitAskQuestionBtn').on('click', function(){
    	ga('send', 'event', 'Home Page', 'Ask a Question', 'Ask a Question');
    });
});
function askQuestion() {
	var questionText = $("#question-AskQuestion").val();
	$("#submitAskQuestionLoader").show();
	$("#submitAskQuestionBtn").hide();
	window.location = window.location.origin + "/lp/questions/ask?message="
			+ encodeURIComponent(questionText);
}
function hd_pics_dload(fn) {
	var n = 0, P = [], arg_imgs = Array.prototype.filter.call(
			Array.prototype.slice.call(arguments, 1), function(imgstr) {
				return (/\.(?:jpe?g|jpe|png|gif|bmp|tiff?|tga|iff)$/i)
						.test(imgstr);
			});
	var hd_imgs_load_handler = function(e) {

		//console.log( e.type, ' -- > ', this.src );

		(++n === arg_imgs.length) && fn.apply(document, arg_imgs);

	};
	for (var i = 0, len = arg_imgs.length; i < len; i++) {
		P[i] = new Image;
		P[i].onabort = hd_imgs_load_handler;
		P[i].onerror = hd_imgs_load_handler;
		P[i].onload = hd_imgs_load_handler;
		P[i].src = arg_imgs[i];
	}
	return arg_imgs;
}
	hd_pics_dload(function() {
		//console.log('done -> ', arguments );
		imageLoaderFlag = true;
		/*use high res image after downloading complete*/
		if ($('.outer-bg').hasClass('consultPrivatelyBg')) {
			$('.outer-bg').addClass('consultPrivatelyBg_dld');
			/* $('.outer-bg').removeClass('consultPrivatelyBg'); */
		}
		if ($('.outer-bg').hasClass('askQuestionBg')) {
			$('.outer-bg').addClass('askQuestionBg_dld');
			/* $('.outer-bg').removeClass('bookAppointmentBg'); */
	
		}
		if ($('.outer-bg').hasClass('bookAppointmentBg')) {
			$('.outer-bg').addClass('bookAppointmentBg_dld');
			/* $('.outer-bg').removeClass('askQuestionBg'); */
		}
	},

		'/img/backgroundImage-lybrateKeyboard.jpg',
		'/img/backgroundImage-right-doctor.jpg',
		'/img/background-chairs.jpg');