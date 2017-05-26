$(document).ready(function() {
	
	var ua = navigator.userAgent.toLowerCase();
    var isAndroid = (ua.indexOf("android") > -1) && (ua.indexOf("mobile") > -1);
    var isIphone = (ua.indexOf("iphone") > -1);
	if(!isAndroid && !isIphone){
		$('.sms_email_btns').show();
	}
	
	var iphone_url = $('.patient_app_promo_header .iphone_url').attr('url');
	var android_url = $('.patient_app_promo_header .android_url').attr('url');
	
	if(isAndroid && android_url.length>1) {
		updatePatientAppPromoHeader('Android', 'Play Store', $('.patient_app_promo_header .android_url').attr('url'));
		$('.sms_email_btns_wrap').hide();
	}
	
	if(isIphone && iphone_url.length>1) {
		updatePatientAppPromoHeader('iPhone', 'App Store', $('.patient_app_promo_header .iphone_url').attr('url'));
		$('.sms_email_btns_wrap').hide();
	};
	
	$(document).on('click', '.platform_url', function() { 
		ga('send', 'event', 'Patient App Promo', 'Top Fixed Promo', $(this).attr('variant'));
		window.open($(this).attr('loc'),'_blank');
	});
	
});

function updatePatientAppPromoHeader(platform_name, platform_store_name, platform_store_url) {
	if($('.mobileAppLink').length > 0){
		var randomNum = Math.floor(Math.random()*$('.mobileAppLink').length);
		var randomDiv = $('.mobileAppLink')[randomNum];
		$('#mobileAppLinkHead').text($(randomDiv).text());
		$('#mobileAppLinkSubHead').text($(randomDiv).attr('sub'));
		$('.patient_app_promo_header .platform_url').attr('loc', platform_store_url+'&c='+$(randomDiv).attr('url')).attr('variant',$(randomDiv).attr('variant'));
	}else{
		$('.patient_app_promo_header .platform_name').html(platform_name);
		$('.patient_app_promo_header .platform_store_name').html(platform_store_name);
		$('.patient_app_promo_header .platform_url').attr('loc', platform_store_url+'&c=top_fixed_promo');
	}
	$('.patient_app_promo_header').show('200');
	//$('#top_nav').css({'marginTop':'60px'});
	//$('#search_top_nav').css({'marginTop':'60px'});
	
	var lastScroll = 0;
    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        if (st > lastScroll){
        	$('.patient_app_promo_header').hide();
        }
        else {
        	$('.patient_app_promo_header').show();
        }
        lastScroll = st;
    });
	
}