/* Lybrate.Cookie START */
Lybrate.Cookie = {};
Lybrate.Cookie.data = 'data';

Lybrate.Cookie.set = function(a_name, a_value, expiredays, path, domain) {
	var expires = new Date();
	expires.setTime(expires.getTime() + (expiredays * 24 * 3600 * 1000));
	var cookieStr = a_name + "=" + escape(a_value) + ((expiredays) ? "; expires=" + expires.toGMTString() : "") + ((path) ? ";path=" + path : ";path=/")
			+ ((domain) ? ";domain=" + domain : ";domain=.lybrate.com");
	document.cookie = cookieStr;
};

Lybrate.Cookie.get = function(a_name) {
	if (document.cookie.length > 0) {
		begin = document.cookie.indexOf(" " + a_name + "=");
		if (begin != -1) {
			begin += a_name.length + 2;
			end = document.cookie.indexOf(";", begin);
			if (end == -1)
				end = document.cookie.length;
			return unescape(document.cookie.substring(begin, end));
		}else{
			begin = document.cookie.indexOf(a_name + "=");
			if(begin != -1){
				begin += a_name.length + 1;
				end = document.cookie.indexOf(";", begin);
				if (end == -1)
					end = document.cookie.length;
				return unescape(document.cookie.substring(begin, end));
			}
		}
	}
	return null;
};

Lybrate.Cookie.remove = function(a_name) {
	var cookieStr = a_name + "=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
	document.cookie = cookieStr;
};
/* Lybrate.Cookie END */




/*here we gonna write the common utilities, discussed with Rahul*/
Lybrate.CommonUtils = {};
Lybrate.CommonUtils.getQueryStringParameter = function(a) {a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");var b = "[\\?&]" + a + "=([^&#]*)";var c = new RegExp(b);var d = c.exec(unescape(window.location.href));if (d == null) {return null;} else {return d[1];}};

/* get state list ends */

/* Form field handling START */
(function() {
	/**
	 * This jQuery Extension adds the ability to access form fields by the
	 * shortcut property .field() which gets and sets input field values by name
	 * using the .find() method.
	 * 
	 * @param string
	 *            inputName
	 * @param mixed
	 *            value (optional)
	 */
	$.fn.field = function(inputName, value) {

		if (typeof inputName != 'string') {
			return false;
		}

		var $inputElement = $(this).find('[name=' + inputName + ']');

		/*
		 * Get request, return the input fields value.
		 */
		if (typeof value === 'undefined') {
			if ($inputElement.length >= 1) {
				switch ($inputElement.attr('type')) {
				case 'checkbox':
					return $inputElement.is(':checked');
					break;
				case 'radio':
					var result;
					$inputElement.each(function(i, val) {
						if ($(this).is(':checked'))
							result = $(this).val();
					});
					return result;
					break;
				default:
					return $inputElement.val();
					break;
				}
			} else {
				return null;
			}
		}

		/*
		 * Set request, set the input field to the value provided and return a
		 * reference to the jQuery selector for the input
		 */
		else {
			switch ($inputElement.attr('type')) {
			case 'checkbox':
				$inputElement.attr({
					checked : value
				});
				break;
			case 'radio':
				$inputElement.each(function(i) {
					if ($(this).val() == value) {
						$(this).attr({
							checked : true
						});
					}
				});
				break;
			case undefined:
				$(this).append('<input type="hidden" name="' + inputName + '" value="' + value + '" />');
				break;
			default:
				$inputElement.val(value);
				break;
			}
			return $inputElement;
		}
	}
})();
/* Form field handling END */

Lybrate.Utils = function() {
	return {
		/* ReatEasyFix for Arrays START */
		fixArray : function(array) {
			if ($.isArray(array)) {
				return array;
			} else {
				return [ array ];
			}
		}
	/* ReatEasyFix for Arrays END */
	};
}();

var emailAddressPattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);

Lybrate.Utils.isEmailValid = function(email) { 
	 return emailAddressPattern.test(email)
}

Lybrate.Utils.isMobileDeviceRequest = function(){
	var ua = navigator.userAgent.toLowerCase();
    var isMobileDevice = ua.indexOf("android") > -1 || (ua.indexOf("mobile") > -1) || (ua.indexOf("iphone") > -1) || (ua.indexOf("Opera Mini") > -1);
    return isMobileDevice;
}

Lybrate.Utils.isEmpty = function(value) { 
	 return (value == undefined || value == null || $.trim(value) == '' || value == 'null');
}

Lybrate.Utils.getNotNullValue = function(value) { 
	 return (value == undefined || value == null || $.trim(value) == '' || value == 'null') ? '':value;
}

Lybrate.Utils.showAlert = function(type, message, errorElement) {
	//$(errorElement).addClass(type);
	$(errorElement).text(message);
	$(errorElement).css('display','block');
}

Lybrate.Utils.fireEventConversionPixel = function(event, eventId, extraParams) {
	var data = {'event': event, 'eventId': eventId};
	if(extraParams != undefined) {
		for (var key in extraParams) {
			  if (extraParams.hasOwnProperty(key)) {
				data[key] = extraParams[key];
			  }
		}
	}
	$.ajax({url: "/get/event/conversion/pixel", type: "POST",dataType: 'json',data: data,
		success: function(response) {
			if (response.status == 'success' || response.successful == true ) {
				if(response.items && response.items['cp']) {
					$('body').append('<div id="eventConversionPixelId" style="display: none">' + response.items['cp'] + '</div>');
				}
			} else{
				//donothing
			}
		}
	});
}

/* Functions  */
 

Lybrate.Server = {};

Lybrate.Server.login = function(username, password, countryCode, uotp, extra_params, successCallback, failureCallback, exceptionCallback) {
	var loginUrl = "/login_security_check?"
	var data = {'j_username': username, 'j_password': password, 'ajax': true, 'uotp': uotp, '_spring_security_remember_me': 1, 'countryCode': countryCode};	
		$.ajax({url:loginUrl, type: "POST", dataType: 'json', data: data, 
			success: function(response) {
			  if(response.status == 'success') {
				  var loggedInDiv = '<div id="loggedInUserInfo" name="'+response.items['name']+'" phoneNumber="'+response.items['phoneNumber']+'" email="'+response.items['email']+'" gender="'+Lybrate.Utils.getNotNullValue(response.items['gender'])+'" mvp="'+response.items['mvp']+'" data-age-yrs="'+Lybrate.Utils.getNotNullValue(response.items['ageYears'])+'" data-age-mnths="'+Lybrate.Utils.getNotNullValue(response.items['ageMonths'])+'" data-age-type="'+Lybrate.Utils.getNotNullValue(response.items['ageType'])+'" data-weight="'+Lybrate.Utils.getNotNullValue(response.items['weight'])+'" data-weight-unit="'+Lybrate.Utils.getNotNullValue(response.items['weightUnit'])+'" data-height="'+Lybrate.Utils.getNotNullValue(response.items['height'])+'" data-height-unit="'+Lybrate.Utils.getNotNullValue(response.items['heightUnit'])+'"data-v3-user="'+(response.items['version']==='v3'?true:false)+'" style="display: none"></div>'; 
				  $("#loggedInUserInfoOuter").html(loggedInDiv);
				  var responseData = {'name': response.items['name'], 'phoneNumber': response.items['phoneNumber'], 'email': response.items['email'], 'gender': response.items['gender'], 'mvp':response.items['mvp']};
				  $('.header-right').append(_.template($('#patientDropdownTemplate').html(),responseData));
				  $('.guest_link').hide();
				  if(extra_params == undefined && extra_params == null ) {
					  extra_params = {};
				  }
				  if(successCallback != undefined && successCallback != null) {
					  successCallback(responseData, extra_params);
				  }
			  } else {
				  if(failureCallback != undefined && failureCallback != null) {
					  failureCallback(extra_params);
				  }
			  }
			},
			failure: function(response) {
				console.log("Login failed");
				if(exceptionCallback != undefined && exceptionCallback != null) {
					exceptionCallback(extra_params);
				}
			}
		});
};

Lybrate.Server.fblogin = function(fbUserId, accessToken, extra_params, returningUsersuccessCallback, newUsersuccessCallback) {
	var loginUrl = "/fbUser/login";
	var data = {'userID': fbUserId, 'accessToken': accessToken};	
	$.ajax({url:loginUrl, type: "POST", dataType: 'json', data: data, 
		success: function(response) {
		  if(response.status == 'success') {
			  if(response.items['mvp']) {
				  newUsersuccessCallback(extra_params);
			  } else {
				  Lybrate.Server.login(response.items['mobile'], response.items['passcode'], response.items['countryCode'], true , extra_params, returningUsersuccessCallback, newUsersuccessCallback);
			  }
		  } else {
			  newUsersuccessCallback(extra_params);
		  }
		},
		failure: function(response) {
			console.log("Login failed");
			if(exceptionCallback != undefined && exceptionCallback != null) {
				exceptionCallback(extra_params);
			}
		}
	});
};


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function sameOrigin(url) {
    // test that a given url is a same-origin URL
    // url could be relative or scheme relative or absolute
    var host = document.location.host; // host + port
    var protocol = document.location.protocol;
    var sr_origin = '//' + host;
    var origin = protocol + sr_origin;
    // Allow absolute or scheme relative URLs to same origin
    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
        (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
        // or any other URL that isn't scheme relative or absolute i.e relative.
        !(/^(\/\/|http:|https:).*/.test(url));
}

function showPrimeModal(){
    doctorsOnLandingCheckout();
    window.setTimeout(function(){
        $('#primeModal').modal('show');
        Lybrate.Cookie.set("promoMod", '0', 1);
    }, 15000);
}

$(document.body).on("click", ".gaEvent", function(){
    var url = $(this).attr('data-url');
    var event = $(this).attr('data-event');
    var pageView = $('#primeModalParams').attr('data-event')
    ga('send', 'event', pageView, 'Click', event);
    $(window).off('beforeunload');
    $('#primeModal').modal('hide');
    $('#showLoader').show();
    if(url==''){
        //setSession();
    }else{
        window.setTimeout(function(){
            window.location.href = url;
        }, 1000);
    }
    
});


$(document).keyup(function(e) {
    if (e.keyCode == 27 && $('#primeModal').css('display')== 'block') { 
        $('.Popup_Close').trigger('click');
   }
});

function doctorsOnLandingCheckout(){
    var speciality = $('#recent-q-speciality').val();
      $.ajax({url: "/raven/get/top/doctors?maxResults=4&speciality="+speciality, type: "GET",dataType: 'json',
          success: function(response) {
            if(response.specility && response.ggDoctors.length > 0){
                $('#topDoctorsWrapper').html(doctorTemplComp(response)).show();
            }else{
                $('#topDoctorsWrapper').hide();
            }
          }
      });
}
  
function doctorTemplComp(data){
    var html = "";
    var redirectUrl = $('#primeModalParams').attr('data-redirect');
    var pageSource = $('#primeModalParams').attr('data-page');
    var btnConsultShow = $('#primeModalParams').attr('data-showCBtn');
    var veiwMoreUrl = '/consult-privately';
    if(data.specility=='Doctors'){
        veiwMoreUrl = veiwMoreUrl+'#doctorListing';
    }else{
        veiwMoreUrl = veiwMoreUrl+'?s='+data.specility+'#doctorListing';
    }
   
    html+="<div class='lybHandCur gaEvent' data-url='/consult-privately' data-event='Popup_Banner'>";
    html+="<img class='Basic-to-prime-pop-up_banner' src='"+Lybrate.getExtResourcePath('imgs/mkting/offers/Basic_to_prime_pop_up2.jpg')+"' /> <img class='Basic-to-prime-mobile-banner' src='"+Lybrate.getExtResourcePath('imgs/mkting/offers/B2P_mobile_banner1.jpg')+"' />";
    html+="</div>";
    
   html+="<div class='topDoctorsHeading'>Top Doctors to consult privately</div>";

    $.each(data.ggDoctors,function(key,val){
        html+="<div class='docWrapper'>";
        if(val.profilePicPath){
            html+="<div class='docImg lybHandCur gaEvent' data-url='/questions/ask?u="+val.username+"&lpt="+pageSource+"' data-event='Popup_Consult_"+key+"'><img src='"+val.profilePicPath+"' class='docImgUsr' alt='"+val.doctorName+"'></a></div>";
        }else{
            html+="<div class='empty_pic c_red lybHandCur gaEvent' data-url='/questions/ask?u="+val.username+"&lpt="+pageSource+"' data-event='Popup_Consult_"+key+"'>"+val.nameInitials+"</div>";
        }
        html+="<div class='textWrapper lybHandCur gaEvent' data-url='/questions/ask?u="+val.username+"&lpt="+pageSource+"' data-event='Popup_Consult_"+key+"'>";
        html+="<div class='heading ng-binding'>"+val.namePrefix+"&nbsp;"+val.doctorName+"</div>";
        html+="<div class='subhead lybTrimStr ng-binding'>"+val.degrees+" </div>";
        html+="<div class='subhead ng-binding'>"+val.speciality+" <span style='display:"+(val.peopleHelped > 0 ? '':'none')+"'>&bull; "+val.peopleHelped+" People helped</span> <span style='display:"+(val.experience > 0 ? '':'none')+"'>&bull;  "+val.experience+" "+(val.experience > 1 ? 'Years':'Year')+" experience</span></div>";
        html+="</div>";
        html+="<button class='consultBtnWhite lybHandCur gaEvent' data-url='/questions/ask?u="+val.username+"&lpt="+pageSource+"' data-event='Popup_Consult_"+key+"'>Consult</button>";
        html+="</div>";
    });
    html +="<div class='buttonsWrapepr'><div class='viewMore lybHandCur gaEvent' data-url='"+veiwMoreUrl+"' data-event='Popup_Consult_ViewMore'>VIEW MORE</div>" +
            "<div class='noThanks lybHandCur gaEvent' data-url='"+redirectUrl+"' data-event='Popup_No Thanks'>No, Thanks</div></div>";
    
    return html;
}

function getCurrency(type){
    var currencySymbol = "&#8377";
    switch(type){
        case 'INR':
            currencySymbol= "&#8377";
            break;
        case "USD":
            currencySymbol= "$";
            break;
         case "GBP": // Pound
             currencySymbol= "£";
             break;
         case "CNY":   // China Yuan
             currencySymbol= "¥";
             break;
         case "EUR":   // Euro
             currencySymbol= "€";
             break;
         case "SGD":  // Singapore Dollar
             currencySymbol= "$";
             break;
         case "JPY": // Japan Yen
             currencySymbol= "¥";
             break;
         case "AUS": // Australian Dollar
             currencySymbol= "AU$";
            break;
    }
    
    return currencySymbol;
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
        	var csrftoken =  Lybrate.Cookie.get("csrf_token_p_c");
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
