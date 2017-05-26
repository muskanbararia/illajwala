$(document).ready(function(){
	$('.patient_new_user_form').validate({
		onkeyup: false,
		rules: {
			patientName: {
				required: true
			},
			mobile: {
				required: true
			},
			email: {
				email: true
			},
			gender: {
				required: true
			},
			city: {
				required: true
			}
		},
		groups: {
			allFields: "patientName mobile email gender city"
		},
		errorPlacement: function(error, element) {
			var n = element.attr("name");
			if (n == "patientName" || n == "mobile" || n == "email" || n == "gender" || n == "city")
				error.insertAfter(".gender");
			else
				error.insertAfter(element);
		},
		messages: {
			patientName: {
				required: 'Please fill in all fields'
			},
			mobile: {
				required: 'Please fill in all fields'
			},
			email: {
				email: 'Please enter a valid email'
			},
			gender: {
				required: 'Please fill in all fields'
			},
			city: {
				required: 'Please fill in all fields'
			}
		}
	});
	var spinnerPath = $('#spinnerPath').attr('spinnerPath');
	$(document).on('click', '.new_user_submit_btn', function(e) {
		e.preventDefault();
		var source = $(this).attr('source');
		//Only for Ask Question
		var submitBtn = $(this);
		renderMobileVerification({'source':source, 'spinnerPath':spinnerPath, 'newPass':''});
		var uclmCode = $(this).attr('uclmCode');
		$('.new_user_verify_mobile_btn[source="'+source+'"]').text(getMobileVerificationBtnText(source));
		var patientForm, loader,signUpDiv,verifyMobileDiv;

		if(uclmCode){
			signUpDiv = $('.patient_book_appt[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			verifyMobileDiv = $('.patient_verify[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			patientForm = $('.patient_new_user_form[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			loader = $('.new_user_continue_loader[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			errorDiv = $('.new_user_error[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			$(verifyMobileDiv).find('#changePass_hidden').val('');
		} else{
			signUpDiv = $('.showRegistrationForm');
			verifyMobileDiv = $('.showVerifyMobile')
			patientForm = $('.patient_new_user_form[source="'+source+'"]');
			loader = $('.new_user_continue_loader[source="'+source+'"]');
			errorDiv = $('.new_user_error[source="'+source+'"]');
		}

		$(patientForm).validate();
		if($(patientForm).valid()) {
			$(loader).show();
			$(submitBtn).hide();
			var patientName = $(patientForm).find('[name="patientName"]').val();
			var mobile = $(patientForm).find('[name="mobile"]').val();
			var email = $(patientForm).find('[name="email"]').val();
			var gender = $(patientForm).find('[name="gender"]').val();
			var password = $(patientForm).find('[name="password"]').val();
			var countryCode = $(patientForm).find('.countryCodeInAppointment').val();
			var city = $(patientForm).find('.city').val();
			var data = {firstName:patientName, mobile:mobile, email:email, gender:gender, countryCode:countryCode, password:password, city:city};
			patientSignUpRequest(data, 
					function(successResponse){
				$(signUpDiv).hide();
				$(verifyMobileDiv).show('fade');
				$(verifyMobileDiv).find('.selected_mobile').html(mobile);
				$(verifyMobileDiv).find('.selected_country_code').val(countryCode);
				if(source == 'askQuestion')
					$('.showVerifyMobile').show();
				ga('send', 'event', 'Registration', 'Mobile Number Registration', 'Continue');
				ga('send', 'event', 'Login', 'Click', 'Sign Up with Mobile - ' + source);
			},
			function(failureResponse){
				$(loader).hide();
				$(submitBtn).show();
				$(errorDiv).text(failureResponse); 
			},
			function(exceptionResponse){
				$(submitBtn).show();
				$(loader).hide();
				Lybrate.Utils.showAlert('error', 'Something went wrong. Please try again.', $(errorDiv));
			});

		} else {
			$(errorDiv).html("Please fill in all fields");
		}
	});
	$(document).on('click', '.existingUserLoginBtn', function(e){
		e.preventDefault();
		var submitBtn = $(this);
		var source = $(this).attr('source');
		var uclmCode = $(this).attr('uclmCode');
		var div, loader, extraParams;
		if(uclmCode){
			div = $('.existing_user[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			loader = $('.existingUserLogin_loader[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			errorDiv = $(div).find('.ajax_passcode_error[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			extraParams = {'uclmCode' : uclmCode,'source' : source,'sourceEvent':'SignIn'};
		} else {
			div = $('.existing_user_wrap[source="'+source+'"]');
			loader = $('.existingUserLogin_loader[source="'+source+'"]');
			errorDiv = $(div).find('.userLogin_error[source="'+source+'"]');
			extraParams = {'source' : source,'sourceEvent':'SignIn'};
		}

		$(errorDiv).hide();
		var countryCode = $(div).find('[name="countryCode"]').val();
		var mobile = $(div).find('[name="mobile"]').val();
		var password = $(div).find('[name="password"]').val();
		if(mobile.length<7 || mobile.length>10) $(errorDiv).html('Please Enter a valid number').show();
		else $(errorDiv).html("");
		if(mobile=="" || password=="") {
			$(errorDiv).show();
		}
		else {
			$(loader).show();
			$(submitBtn).hide();
			Lybrate.Server.login(mobile, password, countryCode, false, extraParams, 
					onPatientLoginSuccess, 
					function(){
				$(submitBtn).show();
				$(loader).hide();
				$(errorDiv).html('Invalid Username / Password.').show(); 
			},
			function(){ 
				$(submitBtn).show();
				$(loader).hide();
				$(errorDiv).html('Something went wrong. Please try again.').show(); 
			});
		}
	});
	$(document).on('click', '.new_user_verify_mobile_btn', function(e){
		e.preventDefault();
		var submitBtn = $(this);
		var source = $(this).attr('source');
		var uclmCode = $(this).attr('uclmCode');
		var newPass= $('#changePass_hidden').val();
		var form, passcode, mobile, countryCode, loader, successDiv ;

		if(uclmCode){
			form = $('.patient_verify[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			passcode = $(form).find('.verification_code').val();
			mobile = $(form).find('.selected_mobile').html();
			countryCode = $(form).find('.selected_country_code').val();
			loader = $('.new_user_verify_mobile_loader[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			var doctorName = $('.book_appt[uclmCode="' + uclmCode + '"] .doctorName').attr('doctorName');
			ga('send', 'event', 'Online Appointment', 'Clicked Verify & Book Appointment', doctorName);
			successDiv = $('.patient_success_appt[uclmCode="'+uclmCode+'"]');

		} else{
			form = $('.patient_verify[source="'+source+'"]');
			passcode = $(form).find('.verification_code').val();
			mobile = $(form).find('.selected_mobile').html();
			countryCode = $(form).find('.selected_country_code').val();
			loader = $('.new_user_verify_mobile_loader[source="'+source+'"]');
		}

		if(passcode=="" || countryCode=="") {
			$(form).find('.new_user_verify_mobile_error').html('Please enter verification code').show();
		} else {
			$(form).find('.new_user_verify_mobile_error').hide();
			$(loader).show();
			$(submitBtn).hide();
			var data = {mobile:mobile, passcode:passcode, countryCode : countryCode, newPass: newPass};
			patientVerifyMobileRequest(data,
					function(successResponse){
				$(form).hide();
				$(loader).hide();
				Lybrate.Server.login(mobile, passcode, countryCode, true, {'source':source, 'successDiv':successDiv, 'uclmCode':uclmCode}, 
						onPatientLoginSuccess, 
						function(){ 
					$(div).find('.new_user_verify_mobile_error').html('Invalid Username / Password.').show(); 
				},
				function(){ 
					$(div).find('.new_user_verify_mobile_error').html('Something went wrong. Please try again.').show(); 
				});
			},
			function(failureResponse){
				$(loader).hide();
				$(submitBtn).show();
				Lybrate.Utils.showAlert('error', failureResponse, $(form).find('.new_user_verify_mobile_error')); 
			},
			function(exceptionResponse){
				$(loader).hide();
				$(submitBtn).show();
				Lybrate.Utils.showAlert('error', 'Something went wrong. Please try again.', $(form).find('.new_user_verify_mobile_error'));
			});
		}
	});
	// render user reset password
	$(document).on('click', '.patient_reset_password', function(e) {
		e.preventDefault();
		var source = $(this).attr('source');
		var uclmCode = $(this).attr('uclmCode');
		var attachElement, signInFormElement;

		if(source == 'bookApp'){
			attachElement = $('.resend_verification_code_form[uclmcode="'+uclmCode+'"][source="'+source+'"]');
			signInFormElement = $('.existing_user_wrap[uclmcode="'+uclmCode+'"][source="'+source+'"]')
		} else {
			attachElement = $('.showUserResetPasswordForm');
			signInFormElement = $('.showUserLoginForm');
		}
		if($(attachElement).find('.reset_or_choose_password').length == 0){
			var data = {'countryCode':$('#countryCodeTemplate').html(), 'uclmCode':uclmCode, 'source':source};
			$(attachElement).append(_.template($('#renderUserResetPasswordTemplate').html(),data));
		}
//		$(attachElement).find('.mobile').mask("9999999999")
		$(attachElement).show();
		$(signInFormElement).hide();
		ga('send', 'event', 'Login', 'Click', 'Sign In_ForgotPassword -  ' + source);
	});


	// reset user password
	$(document).on('click', '.getPasscodeSubmitBtn', function(e) {
		e.preventDefault();
		var source = $(this).attr('source');
		var uclmCode = $(this).attr('uclmCode');
		var newPass = $('#mobile-changePassword').val();
		var submitBtn = $(this);
		var mobile, countryCode, loader, errorDiv, signUpDiv, userResetPasswordDiv, verifyMobileDiv; 
		renderMobileVerification({'source':source, 'newPass':newPass});
		
		if(uclmCode){
			signUpDiv = $('.patient_book_appt[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			userResetPasswordDiv = $('.resend_verification_code_form[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			verifyMobileDiv = $('.patient_verify[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			mobile = $('.reset_or_choose_password[uclmCode="'+uclmCode+'"][source="'+source+'"]').find('input[name="mobile"]').val();
			countryCode = $('.reset_or_choose_password[uclmCode="'+uclmCode+'"][source="'+source+'"]').find('.countryCodeInAppointment').val();
			loader = $('.getPasscode_loader[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			errorDiv = $('.getPasscodeError[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			$(verifyMobileDiv).find('#changePass_hidden').val(newPass);
		} else{
			signUpDiv = $('.showRegistrationForm');
			userResetPasswordDiv = $('.showUserResetPasswordForm');
			verifyMobileDiv = $('.showVerifyMobile');
			mobile = $('.reset_or_choose_password[source="'+source+'"]').find('input[name="mobile"]').val();
			countryCode = $('.reset_or_choose_password[source="'+source+'"]').find('.countryCodeInAppointment').val();
			loader = $('.getPasscode_loader[source="'+source+'"]');
			errorDiv = $('.getPasscodeError[source="'+source+'"]');
		}
		
		if(mobile && newPass){
			var ajaxUrl = '/reset/password/request'; 
			var data = {'mobile' : mobile,'countryCode' : countryCode};
			$(verifyMobileDiv).find('.selected_mobile').html(mobile);
			$(verifyMobileDiv).find('.selected_country_code').val(countryCode);
			$(loader).show();
			$(submitBtn).hide();
			$.ajax({ url: ajaxUrl, type: "POST", dataType: 'json', data: data, success: function(response){
				$(loader).hide();
				$(submitBtn).show();
				if(response.status == 'success') {
					$(signUpDiv).hide();
					$(userResetPasswordDiv).hide();
					$(verifyMobileDiv).show();
				} else{
					Lybrate.Utils.showAlert('error', response.message, $(errorDiv));
				}
			},
			error: function(response) {
				Lybrate.Utils.showAlert('error','Something went wrong. Please try again.', $(errorDiv));
			}
			});

		} else {
			Lybrate.Utils.showAlert('error','Please fill in all fields', $(errorDiv));
		}
	});
	$(document).on('click', '.fbLogin', function(e) {
		e.preventDefault();
		var extra_params = {'tipCode':$('#showSignInOptionsModal .tipCode').val()};
		var source = $(this).attr('source');
		var fbBtn = $(this);
		var loader = $('.fbLoginLoader[source="'+source+'"]');
		
		$(fbBtn).hide();
		$(loader).show();
		if( source == 'bookApp')
		{
			var uclmCode = $(this).attr('uclmCode');
			extra_params['uclmCode'] = uclmCode;	  
			var doctorName = $('.book_appt[uclmCode="' + uclmCode + '"] .doctorName').attr('doctorName');
			ga('send', 'event', 'Registration', 'FB Login', 'Book Appointment');
			var permissionDeniedCallback = function(extra_params) {
				$('.patient_book_appt[uclmCode="' + extra_params.uclmCode + '"] .fb_email_choice').hide();
				$('.patient_book_appt[uclmCode="' + extra_params.uclmCode + '"] .new_user').show();
			}
			extra_params['permission_denied_callback'] = permissionDeniedCallback;  
			FBcheckLogin(fbLoginSuccessFA, extra_params, 'email');
		} else {
			extra_params['source'] = source;
			FBcheckLogin(fbLoginSuccessAQ, extra_params, 'email');
		}
		
	});
	$(document).on('click', '.new_fb_user_submit_btn', function(e){
		e.preventDefault();
		var submitBtn = $(this);
		var source = $(this).attr('source');
		var uclmCode = $(this).attr('uclmCode');
		$('.new_user_verify_mobile_btn[source="'+source+'"]').text(getMobileVerificationBtnText(source));

		renderMobileVerification({'source':source, 'countryCode':$('#countryCodeTemplate').html(), 'newPass':''});
		var form, verifyMobileDiv, loader, errorDiv;

		if(uclmCode){
			form = $('.patient_new_fb_user_form[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			verifyMobileDiv = $('.patient_verify[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			loader = $('.new_fb_user_continue_loader[uclmCode="'+uclmCode+'"][source="'+source+'"]');
			errorDiv = $(form).find('.error');
			$(verifyMobileDiv).find('#changePass_hidden').val('');
			fbLoggedInDiv = $('.new_fb_user[uclmCode="'+uclmCode+'"][source="'+source+'"]');
		} else{
			form = $('.patient_new_fb_user_form[source="'+source+'"]');
			verifyMobileDiv = $('.showVerifyMobile');
			loader = $('.new_fb_user_continue_loader[source="'+source+'"]');
			errorDiv = $(form).find('.error');
			fbLoggedInDiv = $('.showFBLoggedInForm');
		}
		$(form).validate();
		$(errorDiv).html("");
		var accessToken = $(form).find('.fb_access_token').val();
		var fbUserId = $(form).find('.fb_user_id').val();
		var fName = $(form).find('.fb_user_fn').html();
		var lName = $(form).find('.fb_user_ln').html();
		var gender = $(form).find('.fb_gender').html();
		var email = $(form).find('.fb_email').html();
		var mobile = $(form).find('.mobile').val();
		var countryCode = $(form).find('.countryCodeInAppointment').val();
		var doctorName = $('.book_appt[uclmCode="' + uclmCode + '"] .doctorName').attr('doctorName');
		var city = $(form).find('input[name="city"]').val();
		ga('send', 'event', 'Online Appointment', 'Clicked Continue Affiliate User', doctorName);
		if(((countryCode.indexOf('IN')>=0) && (mobile.length < 10)) || ((countryCode.indexOf('IN')<0) && (mobile.length < 6))) {
			$(form).find('.error').html("Please enter a valid mobile number");
			return;
		}

		var data = {accessToken:accessToken, userID:fbUserId, firstName:fName, lastName:lName, mobile:mobile, email:email, gender:gender, countryCode:countryCode, city:city};
		$(loader).show();
		$(submitBtn).hide();

		//FbSignup Will Come Here
		patientFBSignUpRequest(data, 
				function(successResponse){
			$(loader).hide();
			$(fbLoggedInDiv).hide();
			$(verifyMobileDiv).show('fade');
			$(verifyMobileDiv).find('.selected_mobile').html(mobile);
			$(verifyMobileDiv).find('.selected_country_code').val(countryCode);
		},
		function(failureResponse){
			$(loader).hide();
			$(submitBtn).show();
			$(errorDiv).text(failureResponse); 
		},
		function(exceptionResponse){
			$(loader).hide();
			$(submitBtn).show();
			Lybrate.Utils.showAlert('error', 'Something went wrong. Please try again.', $(errorDiv));
		});
	});
	// render login form 
	$(document).on('click', '.SignIn', function(e) {
		e.preventDefault();

		var uclmcode = $(this).attr('uclmcode');
		var source = $(this).attr('source');

		var data = {};
		var countryCode = $('#countryCodeTemplate').html();
		data['source'] = source;
		data['uclmcode'] = uclmcode; 
		data['countryCode'] = countryCode;
		
		renderSignIn(data);
		ga('send', 'event', 'Login', 'Click', 'Sign In - ' + source);
	});
	// render signup form after returning from signin page 
	$(document).on('click', '.SignUp', function(e) {
		e.preventDefault();

		var uclmcode = $(this).attr('uclmcode');
		var source = $(this).attr('source');
		var data = {};
		var countryCode = $('#countryCodeTemplate').html();
		data['source'] = source;
		data['countryCode'] = countryCode;
		data['uclmCode'] = uclmcode;

		if(data.source == 'bookApp'){
			$('.sign_in_options').hide();
			$('.existing_user').hide();
			$('.fb_email_choice').show();
			$('.new_user').show();
		} else{
			$('.showSignInOption').hide();
			$('.showUserLoginForm').hide();
			renderSignUp(data);	
		}
		
		ga('send', 'event', 'Login', 'Click', 'Sign Up with Mobile - ' + source);

	});
	// User Login 
	$(document).on('click', '.userLoginBtn', function(e) {
		e.preventDefault();

		var password = $('#password-loginForm').val().trim();
		var mobile = $('#mobile-loginForm').val().trim();
		var countryCode = $('.countryCodeInAppointment').val();
		var source = $(this).attr('source');

		if(password  && mobile){
			$('.userLoginBtn').hide();
			$('.existingUserLogin_loader').show();
			if(source == 'bookApp'){
				var uclmCode = $(this).attr('uclmCode');
				Lybrate.Server.login(mobile, password, false, {'uclmCode' : uclmCode,'source' : source}, bookAppointmentLoginSuccess, function(){ $('.ajax_passcode_error').html('Invalid Username / Password.'); $('.ajax_passcode_error').show(); }, function(){ $('.ajax_passcode_error').html('Something went wrong. Please try again.'); $('.ajax_passcode_error').show(); });
			} else{
				Lybrate.Server.login(mobile, password, false, {'source' : source}, onPatientLoginSuccess, function(){ $('.userLogin_error').html('Invalid Username / Password.'); $('.userLogin_error').show(); }, function(){ $('.userLogin_error').html('Something went wrong. Please try again.'); $('.userLogin_error').show(); });
			}
			$('.userLoginBtn').show();
			$('.existingUserLogin_loader').hide();
		} else {
			$('.userLogin_error').html('Fields Required.');
			$('.userLogin_error').show();
		}
	});
});

function onPatientLoginSuccess(responseData, extraParams){
	if(extraParams.sourceEvent === "SignIn"){
		ga('send', 'event', 'Login', 'Click', 'Sign In_Sign In - ' + extraParams.source);
	}
	
	switch(extraParams.source){
	case 'bookApp': 
		bookAppointmentLoginSuccess(responseData,extraParams);
		break;
	case 'askQuestion':
		checkLoginAskQuestion(responseData,extraParams);
		break;
	case 'tipTopicWise':
		thanksTipSuccess();
		break;
	case 'lybrateSignUp':
		lybrateSignUpSuccess();
		break;
	case 'lybrateLogin':
		lybrateLoginSuccess();
		break;
	case 'publicQuestion':
		thanksDocSuccess();
		break;
	case 'answerRating':
		answerRating();
		break;
	case 'tipTopicSingle':
		thanksTipSingleSuccess();
		break;
	case 'ppViewThanks':
		thanksPpViewSuccess();
		break;
	case 'ppViewFeedThanks':
		thanksPpFeedViewSuccess();
		break;
	case 'cpViewThanks':
		thanksCpViewSuccess();
		break;
	case 'cpViewFeedThanks':
		thanksCpFeedViewSuccess();
		break;
	case 'mktpage':
		mktpageLoginSuccess();
		break;
	}
}
function patientSignUpRequest(data, successCallback, failureCallback, exceptionCallback){
	var ajaxUrl = "/p/signup";
	$.ajax({url:ajaxUrl, type: "POST", dataType: 'json', data:data, success: function(response) {
		if(!(response.status == "success")) {
			failureCallback(response.message);
		} else {
			successCallback(response.message);
		}
	},error:function(response){
		exceptionCallback(response);
	}
	});
}
function patientFBSignUpRequest(data, successCallback, failureCallback, exceptionCallback){
	var ajaxUrl = "/fbUser/signup";
	$.ajax({url:ajaxUrl, type: "POST", dataType: 'json', data:data, success: function(response) {
		if(!(response.status == "success")) {
			failureCallback(response.message);
		} else {
			successCallback(response.message);
		}
	},error:function(response){
		exceptionCallback(response);
	}
	});
}
function patientVerifyMobileRequest(data, successCallback, failureCallback, exceptionCallback){
	var ajaxUrl = "/p/verify/mobile";
	$.ajax({url:ajaxUrl, type: "POST", dataType: 'json', data:data, success: function(response) {
		if(!(response.successful)) {
			failureCallback(response.message);
		} else {
			successCallback(response);
		}
	},error:function(response){
		exceptionCallback(response);
	}
	});
}
function bookAppointmentLoginSuccess(responseData, extra_params) {
	$('.patient_book_appt[uclmCode="'+extra_params.uclmCode+'"]').hide();
	renderLoggedInUserDetails(extra_params);
}
function fbLoginSuccessFA(extra_params) {
	ga('send', 'event', 'Login', 'Click', 'Sign Up with Facebook - ' + extra_params.source);
	Lybrate.Server.fblogin(extra_params['userID'], extra_params['accessToken'], extra_params, fbLoginMVPNotRequired, fbLoginMVP);
}
//this question is triggered after succesfull login with FB in AskQuestion
function fbLoginSuccessAQ(extra_params){
	ga('send', 'event', 'Login', 'Click', 'Sign Up with Facebook - ' + extra_params.source);
	Lybrate.Server.fblogin(extra_params['userID'], extra_params['accessToken'], extra_params, fbLoginMVPNotRequired, fbLoginMVP);
}
function fbLoginMVPNotRequired(responseData, extra_params) {
	$('.fbLogin[source="'+extra_params.source+'"]').show();
	$('.fbLoginLoader[source="'+extra_params.source+'"]').hide();
	if(extra_params.uclmCode){			
		$('.patient_book_appt[uclmCode="' + extra_params.uclmCode + '"] .fb_email_choice').hide();
		bookAppointmentLoginSuccess(responseData, extra_params);
	} else{
		$('.showSignInOption,.showRegistrationForm').hide();
		$('.showUserLoginForm').hide()
	}
	onPatientLoginSuccess({},extra_params);
}

function fbLoginMVP(extra_params) {
	getFBUserDetails(function() {
		$('.fbLogin[source="'+extra_params.source+'"]').show();
		$('.fbLoginLoader[source="'+extra_params.source+'"]').hide();
		if(extra_params.uclmCode){
			$('.patient_book_appt[uclmCode="' + extra_params.uclmCode + '"]').hide();
			$('.new_fb_user[uclmCode="' + extra_params.uclmCode + '"]').show();
			$('.selected-time-slot[uclmCode="'+extra_params.uclmCode+'"]').find('.edit-time-slot').hide();
			$('.back_book_appt_wrap[uclmCode="'+extra_params.uclmCode+'"]').hide();
			$('.new_fb_user[uclmCode="' + extra_params.uclmCode + '"] .fb_access_token').val(extra_params.accessToken);
			$('.new_fb_user[uclmCode="' + extra_params.uclmCode + '"] .fb_user_id').val(extra_params.userID);
			$('.new_fb_user[uclmCode="' + extra_params.uclmCode + '"] .fb_user_fn').html(extra_params.firstName);
			$('.new_fb_user[uclmCode="' + extra_params.uclmCode + '"] .fb_user_ln').html(extra_params.lastName);
			$('.new_fb_user[uclmCode="' + extra_params.uclmCode + '"] .fb_name').val(extra_params.name);
			$('.new_fb_user[uclmCode="' + extra_params.uclmCode + '"] .fb_gender').html(extra_params.gender.charAt(0).toUpperCase() + extra_params.gender.slice(1));
			$('.new_fb_user[uclmCode="' + extra_params.uclmCode + '"] .fb_email').html(extra_params.email);		
			var fbProfilePicElem = '<img src="'+extra_params.pic+'" />';
			$('.new_fb_user[uclmCode="' + extra_params.uclmCode + '"] .fb_profile_pic').html(fbProfilePicElem);
			$('.new_fb_user[uclmCode="' + extra_params.uclmCode + '"]').show();
		} else {
			$('.showSignInOption').hide();
			$('.showUserLoginForm,.showRegistrationForm').hide();
			renderFbLoggedInForm({'source':extra_params.source,'countryCode':$('#countryCodeTemplate').html()});
			var form = $('.patient_new_fb_user_form[source="'+extra_params.source+'"]');
			var fbProfilePicElem = '<img src="'+extra_params.pic+'" />';

			$(form).find('.fb_profile_pic').html(fbProfilePicElem);
			$(form).find('.fb_access_token').val(extra_params.accessToken);
			$(form).find('.fb_user_id').val(extra_params.userID);
			$(form).find('.fb_user_fn').html(extra_params.firstName);
			$(form).find('.fb_user_ln').html(extra_params.lastName);
			$(form).find('.fb_name').val(extra_params.name);
			$(form).find('.fb_gender').html(extra_params.gender.charAt(0).toUpperCase() + extra_params.gender.slice(1));
			$(form).find('.fb_email').html(extra_params.email);

			$('.showFBLoggedInForm').show();
		}

	}, extra_params['userID'], extra_params['accessToken'], extra_params);
}


function renderLoggedInUserDetails(extra_params) {
	var uclmCode = extra_params.uclmCode;
	var userDetails = LoggedinUserDetails();
	$('.existing_user_wrap').hide();

	if(userDetails.name){
		$('.logged_in_user_appointment[uclmCode="' + uclmCode + '"] .logged_user_fn').html(userDetails.name);

	} else {
		$('.logged_in_user_appointment[uclmCode="' + uclmCode + '"] .logged_user_fn').parent().siblings('.signup-control').hide();
	}

	if(userDetails.gender){
		$('.logged_in_user_appointment[uclmCode="' + uclmCode + '"] .logged_user_gender').html(userDetails.gender);

	} else {
		$('.logged_in_user_appointment[uclmCode="' + uclmCode + '"] .logged_user_gender').parent().siblings('.signup-control').hide();
	}

	if(userDetails.email != "undefined" && userDetails.email){
		$('.logged_in_user_appointment[uclmCode="' + uclmCode + '"] .logged_user_email').html(userDetails.email);
	} else {
		$('.logged_in_user_appointment[uclmCode="' + uclmCode + '"] .logged_user_email').parent().siblings('.signup-control').hide();
	}

	if(userDetails.phoneNumber){
		$('.logged_in_user_appointment[uclmCode="' + uclmCode + '"] .logged_user_mobile').html(userDetails.phoneNumber);

	} else {
		$('.logged_in_user_appointment[uclmCode="' + uclmCode + '"] .logged_user_mobile').parent().siblings('.signup-control').hide();
	}

	$('.logged_in_user_appointment[uclmCode="' + uclmCode + '"] .logged_user_appointment_time').html($('.selected-time-slot[uclmCode="'+uclmCode+'"]').attr('timeSlot'));

	$('.logged_in_user_appointment[uclmCode="' + uclmCode + '"]').show();

}

//getting logged in user details
function LoggedinUserDetails()
{
	if($('#loggedInUserInfoOuter').html().trim())
	{
		var userDetails = {};
		userDetails['name'] = $('#loggedInUserInfo').attr('name'); 
		userDetails['phoneNumber'] = $('#loggedInUserInfo').attr('phoneNumber'); 
		userDetails['email'] = $('#loggedInUserInfo').attr('email');
		userDetails['gender'] = $('#loggedInUserInfo').attr('gender');
		userDetails['mvp'] = $('#loggedInUserInfo').attr('mvp');
		return userDetails;

	} else {
		return false;
	}

}
//check is user logged In
function isLoggedIn()
{
	var userDetails =  $('#loggedInUserInfoOuter').html().trim();

	if(userDetails)
	{
		return true;			
	} else {
		return false;
	}
}
//renders signInOptions
function renderSignInOption(data){
	$('.showVerifyMobile').hide();
	$('.showUserLoginForm').hide();

	if(data.source == "bookApp") {
		if ($('.signInOptions[uclmcode="'+data.uclmCode+'"] .sign_in_options').length == 0) {
			 _.defaults(data, {uclmCode : '', spinnerPath : $('#spinnerPath').attr('spinnerPath')});
			var html = _.template($('#renderUserSignInOptions').html(),data);
			$('.signInOptions[uclmcode="'+data.uclmCode+'"]').append(html);
			$('.fb_email_choice[uclmcode="'+data.uclmCode+'"]').show();

		} else {
			$('.fb_email_choice[uclmcode="'+data.uclmCode+'"]').show();
			$('.signInOptions[uclmcode="'+data.uclmCode+'"] .sign_in_options').show();
		}
		$('.time_slot_head[uclmcode="'+data.uclmCode+'"]').hide();
		signupClickEvent();
		
	} else{
		$('.showAskQuestion').hide();

		if ($('.showSignInOption .sign_in_options').length === 0) {
			 _.defaults(data, {uclmCode : '', spinnerPath : $('#spinnerPath').attr('spinnerPath')});
			var html = _.template($('#renderUserSignInOptions').html(),data);
			$('.showSignInOption').append(html);
			$('.showSignInOption').show();

		} else {
			$('.showSignInOption').show();
		}

	} 

}

function signupClickEvent()
{
	var signupBtn = document.getElementById('Signup-Option');
	signupBtn.click();
}

//render sign up after Ask Question 
function renderSignUp(data)
{
	if(data.source != 'bookApp'){
		$('.showAskQuestion, .new_fb_user, .newUserError').hide();
		$('.fb_email_choice').show();

		if ($('.showRegistrationForm .patient_new_user_form').length === 0) {
			 _.defaults(data, {uclmCode : '', spinnerPath : $('#spinnerPath').attr('spinnerPath')});
			var html = _.template($('#renderCreateAccountWithFacebookTemplate').html(),data);
			$('.showRegistrationForm').append(html);
			$('.showRegistrationForm').show();
//			$('.mobile').mask("9999999999");
			configureCity();
		} else {
			$('.showRegistrationForm').show();
		}
		$('.newUserError').hide();
		$('.patient_new_user_form .email').val($('#email-AskQuestion').val());
	}
}
function renderFbLoggedInForm(data){
	if ($('.showFBLoggedInForm .patient_new_fb_user_form').length === 0) {
		$('.showFBLoggedInForm').append(_.template($('#renderFBLoggedInUser').html(),data));
		configureCity();
//		$('.patient_new_fb_user_form[source="'+data.source+'"] .mobile').mask("9999999999");
	} 
}
function renderSignIn(data)
{
	if(data.source == 'bookApp'){
		$('.resend_verification_code_form').hide();
		$('.existing_user').show();
		$('.existing_user_wrap').show();
		$('.fb_email_choice').hide();
		
	} else{
		$('.showUserResetPasswordForm').hide();
		$('.showSignInOption').hide();
		if($('.showUserLoginForm .existing_user_wrap').length == 0){
			var html = _.template($('#renderUserLoginFormTemplate').html(),data);
			$('.showUserLoginForm').append(html);
			$('.showRegistrationForm').hide();
			$('.showUserLoginForm').show();
//			$('.mobile').mask("9999999999");
		} else {
			$('.showRegistrationForm').hide();
			$('.showUserLoginForm').show();
		}

		$('#mobile-loginForm').val('');
		$('#password-loginForm').val('');
		$('.userLogin_error').html('');

	}
}
function renderMobileVerification(data) {
	if ($('.showVerifyMobile .patient_verify').length === 0) {
		 _.defaults(data, {uclmCode : '', spinnerPath : $('#spinnerPath').attr('spinnerPath')});
		$('.showVerifyMobile').append(_.template($('#renderVerifyMobileTemplate').html(),data));
	}
	$('.new_user_verify_mobile_btn').text(getMobileVerificationBtnText(data.source));
}

function getMobileVerificationBtnText(source){
	if(source === 'bookApp')
		return 'Book Appointment';
	else if(source === 'askQuestion')
		return 'Ask Question';
	else
		return 'Verify Mobile';
}

function configureCity() {
	
	var cities = [ '24 Parganas', 'Abohar', 'Adilabad', 'Agra', 'Ahmedabad',
					'Ahmednagar', 'Aizawl', 'Ajmer', 'Akola', 'Alappuzha',
					'Aligarh', 'Allahabad', 'Almora', 'Alwar', 'Amarnath',
					'Ambala', 'Ambedkar Nagar', 'Amravati', 'Amreli',
					'Amritsar', 'Anand', 'Anantapur', 'Anantnag',
					'Andaman & Nicobar', 'Angul', 'Anuppur', 'Araria',
					'Arwal', 'Asansol', 'Ashoknagar', 'Auraiya',
					'Aurangabad', 'Azamgarh', 'Badgam', 'Bagalkot',
					'Bageshwar', 'Baghpat', 'Bahadurgarh', 'Bahraich',
					'Baksa', 'Balaghat', 'Ballia', 'Balrampur',
					'Banaskantha', 'Banda', 'Banka', 'Bankura', 'Banswara',
					'Barabanki', 'Baramula', 'Baran', 'Bardhaman',
					'Bareilly', 'Bargarh', 'Barmer', 'Barnala', 'Barpeta',
					'Barwani', 'Bastar', 'Basti', 'Bathinda', 'Beawar',
					'Beed', 'Begusarai', 'Belgaum', 'Bellary', 'Betul',
					'Bhadrak', 'Bhagalpur', 'Bhandara', 'Bharatpur',
					'Bharuch', 'Bhavnagar', 'Bhilai', 'Bhilwara', 'Bhind',
					'Bhiwadi', 'Bhiwandi', 'Bhiwani', 'Bhojpur', 'Bhopal',
					'Bhramapur', 'Bhubaneswar', 'Bidar', 'Bijapur',
					'Bijnor', 'Bikaner', 'Bilaspur', 'Billhaur', 'Birbhum',
					'Bishnupur', 'Bokaro', 'Bolangir', 'Bongaigaon',
					'Boudh', 'Budaun', 'Bulandshahar', 'Buldhana', 'Bundi',
					'Burhanpur', 'Buxar', 'Cachar', 'Calicut',
					'Chamarajanagar', 'Chamba', 'Chamoli', 'Champawat',
					'Champhai', 'Chandauli', 'Chandel', 'Chandigarh',
					'Chandrapur', 'Changlang', 'Chatra', 'Chhatarpur',
					'Chhindwara', 'Chikballapur', 'Chikkamaglur',
					'Chirang', 'Chitiradurga', 'Chitrakoot', 'Chittoor',
					'Chittorgarh', 'Churachandpur', 'Churu', 'Ernakulam',
					'Cooch Behar', 'Coorg', 'Cuddalore', 'Cuttack',
					'Dadra & Nagar Haveli', 'Dahod', 'Daman', 'Damoh',
					'Dantewada', 'Darbhanga', 'Darjeeling', 'Darrang',
					'Datia', 'Dausa', 'Davanagere', 'Debagarh', 'Dehradun',
					'New Delhi', 'Deoghar', 'Deoria', 'Dewas', 'Dhamtari',
					'Dhanbad', 'Dhar', 'Dharmapuri', 'Dharuhera',
					'Dhemaji', 'Dhenkanal', 'Dholpur', 'Dhubri', 'Dhule',
					'Dibrugarh', 'Dimapur', 'Dinajpur', 'Dindigul',
					'Dindori', 'Doda', 'Dumka', 'Durg',
					'Durgapur', 'East Godavari', 'East Kameng',
					'East Siang', 'Erode', 'Etah', 'Etawah', 'Faizabad',
					'Faridabad', 'Faridkot', 'Farrukhabad', 'Fatehabad',
					'Fatehgarh Sahib', 'Fatehpur', 'Firozabad', 'Firozpur',
					'Gadag', 'Gadchiroli', 'Gajapati', 'Ganderbal',
					'Gandhinagar', 'Gangtok', 'Ganjam', 'Garhwa',
					'Gautam Buddha Nagar', 'Gaya', 'Geyzing', 'Ghaziabad',
					'Ghazipur', 'Giridih', 'Vasco', 'South Goa', 'Panaji',
					'North Goa', 'Goalpara', 'Godda', 'Golaghat', 'Gonda',
					'Gondiya', 'Gopalganj', 'Gorakhpur', 'Greater Noida',
					'Gulbarga', 'Gumla', 'Guna', 'Guntur', 'Gurdaspur',
					'Gurgaon', 'Guruvayoor', 'Guwahati', 'Gwalior',
					'Hailakandi', 'Hamirpur', 'Hanumangarh', 'Hapur',
					'Harda', 'Hardoi', 'Haridwar', 'Hassan', 'Hathras',
					'Haveri', 'Hawai', 'Hazaribagh', 'Hingoli', 'Hisar',
					'Hooghly', 'Hoshangabad', 'Hoshiarpur', 'Hosur',
					'Howrah', 'Hubli-Dharwad', 'Idukki', 'Imphal',
					'Indore', 'Jabalpur', 'Jagatsinghpur', 'Jaipur',
					'Jaisalmer', 'Jajpur', 'Jalandhar', 'Jalaun',
					'Jalgaon', 'Jalna', 'Jalore', 'Jalpaiguri', 'Jammu',
					'Jamnagar', 'Jamshedpur', 'Jamui', 'Janjgir-Champa',
					'Jashpur', 'Jaunpur', 'Jehanabad', 'Jhabua', 'Jhajjar',
					'Jhalawar', 'Jhansi', 'Jharsuguda', 'Jind', 'Jodhpur',
					'Jorhat', 'Junagadh', 'Jyotiba Phoole Nagar', 'Kadapa',
					'Kaimur', 'Kaithal', 'Kalahandi',
					'Kamrup Metropolitan', 'Kamrup Rural', 'Kanchipuram',
					'Kandhamal', 'Kangra', 'Kanker', 'Kannauj', 'Kannur',
					'Kanpur', 'Kanyakumari', 'Kapurthala', 'Karauli',
					'Karbi Anglong', 'Kargil', 'Karimganj', 'Karimnagar',
					'Karnal', 'Karur', 'Karwar', 'Kasaragod', 'Kathua',
					'Katihar', 'Katni', 'Kaushambi', 'Kawardha',
					'Kendrapara', 'Kendujhar', 'Khagaria', 'Khammam',
					'Khandwa', 'Kharagpur', 'Khargone', 'Kheda', 'Kinnaur',
					'Kishanganj', 'Kishtwar', 'Koderma', 'Kohima',
					'Kokrajhar', 'Kolar', 'Kolhapur', 'Kollam', 'Koppal',
					'Koraput', 'Korba', 'Koriya', 'Kota', 'Kottayam',
					'Krishna', 'Kulgam', 'Kullu', 'Kupwara', 'Kurnool',
					'Kurukshetra', 'Kurung Kumey', 'Kushi Nagar', 'Kutch',
					'Lahaul and Spiti', 'Lakhimpur Kheri', 'Lakhisarai',
					'Lakshadweep', 'Lalitpur', 'Latur', 'Leh', 'Lohardaga',
					'Lohit', 'Lonavala', 'Lower Dibang Valley',
					'Lower Subansiri', 'Lucknow', 'Ludhiana', 'Lunglei',
					'MAU', 'Madhepura', 'Madhubani', 'Madurai',
					'Mahabubnagar', 'Maharajganj', 'Mahasamund',
					'Mahendragarh', 'Mahoba', 'Mainpuri', 'Malappuram',
					'Malda', 'Malkangiri', 'Mandi', 'Mandla', 'Mandsaur',
					'Mandya', 'Mangalore', 'Mansa', 'Marigaon', 'Mathura',
					'Mayurbhanj', 'Medak', 'Meerut', 'Mehsana', 'Mewat',
					'Midnapore', 'Mirzapur', 'Moga', 'Mohali',
					'Mokokchung', 'Mon', 'Moradabad', 'Morena', 'Mukatsar',
					'Munger', 'Murshidabad', 'Mussoorie', 'Muzaffarnagar',
					'Muzaffarpur', 'Mysore', 'Nabarangpur', 'Nadia',
					'Nagaon', 'Nagapattinam', 'Nagaur', 'Nagpur',
					'Nainital', 'Nalanda', 'Nalbari', 'Nalgonda',
					'Namakkal', 'Namchi', 'Nanded', 'Nandurbar',
					'Narayanpur', 'Narmada', 'Narsinghpur', 'Nashik',
					'Navi Mumbai', 'Navsari', 'Nawada', 'Nayagarh',
					'Neemuch', 'Nellore', 'Nizamabad', 'Noida',
					'North Cachar Hills', 'North Tripura', 'Nuapada',
					'Odalguri', 'Ooty', 'Osmanabad', 'Pakur', 'Palakkad',
					'Palamu', 'Pali', 'Palwal', 'Panchkula', 'Panchmahal',
					'Panipat', 'Panna', 'Papum Pare', 'Parbhani',
					'Pashchim', 'Patan', 'Pathanamthitta', 'Patiala',
					'Patna', 'Pauri', 'Perambalur', 'Phek', 'Pilibhit',
					'Pimpri-Chinchwad', 'Pithoragarh', 'Pondicherry',
					'Poonch', 'Porbandar', 'Prakasam', 'Pratapgarh',
					'Pudukkottai', 'Pulwama', 'Purba', 'Purba Champaran',
					'Puri', 'Purnia', 'Purulia', 'Puttaparthi',
					'Raebareli', 'Raichur', 'Raigad', 'Raigarh', 'Raipur',
					'Raisen', 'Rajouri', 'Rajgarh', 'Rajkot',
					'Rajnandgaon', 'Rajsamand', 'Ramanagram',
					'Ramanathapuram', 'Ramban', 'Rampur', 'Ranchi',
					'Rangareddy', 'Ratlam', 'Ratnagiri', 'Rayagada',
					'Reasi', 'Rewa', 'Rewari', 'Rohtak', 'Rohtas',
					'Roorkee', 'Rudraprayag', 'Rudrapur', 'Rupnagar',
					'Sabarkantha', 'Sagar', 'Saharanpur', 'Saharsa',
					'Sahibganj', 'Salem', 'Samastipur', 'Samba',
					'Sambalpur', 'Sangli', 'Sangrur', 'Sant Kabir Nagar',
					'Sant Ravidas Nagar', 'Saran', 'Satara', 'Satna',
					'Sawai', 'Secunderabad', 'Sehore', 'Senapati', 'Seoni',
					'Shahdol', 'Shahjahanpur', 'Shajapur', 'Sheikhpura',
					'Sheohar', 'Sheopur', 'Shillong', 'Shimla', 'Shimoga',
					'Shivpuri', 'Shopian', 'Shravasti', 'Siddharth Nagar',
					'Sidhi', 'Sikar', 'Sindhudurg', 'Sirohi', 'Sirsa',
					'Sitamarhi', 'Sitapur', 'Sivaganga', 'Siwan', 'Solan',
					'Solapur', 'Sonbhadra', 'Sonipat', 'Sonitpur',
					'South Tripura', 'Srikakulam', 'Srinagar',
					'Sriperumbudur', 'Subarnapur', 'Sultanpur',
					'Sundargarh', 'Supaul', 'Surat', 'Surendranagar',
					'Surguja', 'Tamenglong', 'Tapi', 'Tarn Taran',
					'Tawang', 'Tehri Garhwal', 'Thane', 'Thanjavur',
					'The Dangs', 'The Nilgiris', 'Theni', 'Thoothukudi',
					'Thoubal', 'Thrissur', 'Tikamgarh', 'Tinsukia',
					'Tirap', 'Tirunelveli', 'Tirupati', 'Tiruppur',
					'Tiruvallur', 'Tiruvannamalai', 'Tonk', 'Trichy',
					'Trivandrum', 'Tuensang', 'Tumkur', 'Udaipur',
					'Udham Singh Nagar', 'Udhampur', 'Udupi', 'Ujjain',
					'Ukhrul', 'Ulhasnagar', 'Umaria', 'Una', 'Unnao',
					'Upper Dibang Valley', 'Upper Siang',
					'Upper Subansiri', 'Uttar Kannada', 'Uttarkashi',
					'Vadodara', 'Vaishali', 'Valsad', 'Varanasi',
					'Vellore', 'Vidisha', 'Vijayawada', 'Villupuram',
					'Virudhunagar', 'Visakhapatnam', 'Vizianagaram',
					'Warangal', 'Wardha', 'Washim', 'Wayanad',
					'West Godavari', 'West Kameng', 'West Siang',
					'West Tripura', 'Wokha', 'Yamunanagar', 'Yavatmal',
					'Zunheboto', 'Bangalore', 'Pune', 'Hyderabad',
					'Mumbai', 'Chennai', 'Kolkata', 'Kochi', 'Coimbatore',
					'Adimaly', 'Aluva', 'Amb', 'Ambikapur',
					'Ambulance City', 'Arrah', 'Assolna', 'Balasore',
					'Batala', 'Belur', 'Bhawanigarh', 'Botad', 'Calangute',
					'Candolim', 'Chikhli', 'Chikodi', 'Daman and Diu',
					'Dankuni', 'Dungarpur', 'Fatehgarh Churian', 'Fazilka',
					'Gajrola', 'Gandhidham', 'Gangavathi', 'Ghat',
					'Gokarna', 'Haldwani', 'Himatnagar', 'Isagarh',
					'Jagdalpur', 'Jatani', 'Jhunjhunu', 'Kalyani',
					'Kamakshyanagar', 'Kandivli', 'Karaikal',
					'Karanja Lad', 'Kasganj', 'Khamgaon', 'Khliehriat',
					'Kishangarh', 'Konnagar', 'Lakshmeshwara',
					'Mahabubabad', 'Malout', 'Manimajra', 'Mapusa',
					'Margao', 'Morbi', 'Morinda', 'Motihari', 'Mundi',
					'Nadiad', 'Nawanshahr', 'Palani', 'Pathalgaon',
					'Phagwara', 'Ponda', 'Puttur', 'Rajat Nagari',
					'Rajgangpur', 'Rajpipla', 'Ramanujganj', 'Rawatbhata',
					'Rourkela', 'Sakti', 'Sangola', 'Sargur', 'Sattur',
					'Siliguri', 'Singrauli', 'Sirhind-Fategarh',
					'Sitarganj', 'Sivasagar', 'Sri Ganganagar', 'Sujanpur',
					'Sullia', 'Thiruthangal', 'Thiruvarur', 'Thodupuzha',
					'Tiruchengode', 'Titwala', 'Tuticorin', 'Vapi',
					'Veraval', 'Vyara', 'Zirakpur', 'Bangalore Rural',
					'Kakinada', 'Lakhimpur', 'Narnaul', 'Tirupur',
					'Ambarnath', 'Kozhikode', 'Kanchi', 'Trichur',
					'Thirusivapperoor', 'Thiruvananthapuram', 'Baroda',
					'Cochin', 'Rajat Nagari', 'Akbarpur', 'Pilani' ];
		var engine = new Bloodhound({
		  name: 'cities',
		  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  local: cities 
		});
		
		engine.initialize();
    	$('.searchForm-city-typeahead').typeahead({
	      	  hint: false,
	      	  highlight: true,
	      	  minLength: 0,
	      	},
	      	{
  	      	  name: 'cities',
  	      	  displayKey: 'value',
  	      	  source: substringMatcher(cities)
	  	 });
    	
    	$('.searchForm-city-typeahead').on("typeahead:opened", function () {
        		ev = $.Event("keydown")
    	      	ev.keyCode = ev.which = 40
    	      	$(this).trigger(ev)
    	      	return true
    	});
        
}

function substringMatcher(strs) {
	  return function findMatches(q, cb) {
	    var matches, substrRegex;
	    matches = [];
	    substrRegex = new RegExp(q, 'i');
	    $.each(strs, function(i, str) {
	      if (substrRegex.test(str)) {
	        matches.push({ value: str });
	      }
	    });
	 
	    cb(matches);
	  };
};