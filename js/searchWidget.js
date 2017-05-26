// Handle Clinic SRP in case of hCorpus type = "CL_SPCL"
var clinicSearch = false;

$(document).ready( function(){
	// search specialities
    loadGoogleMapsApiScript(initializeSearchGeocoder);
    
	$( document ).on( 'click', '.a-searchBySpeciality .d-callToAction', function(){
		//var speciality = $(this).parents('.a-searchBySpeciality').find('.a-findDoc').val();
		var speciality = $('input[name="searchSpecility"]').val();
		
		if ( !(!!speciality) && _.isString( speciality ) ) {
			// to display error
			return;
		}
		
		var redirectURL = window.location.origin + '/consult-privately' + '?s=' + speciality + '#doctorListing';
		
		window.location = redirectURL;
	} );
	
	configureFindField();
	configureFindCityField();
	configureFindLocationField();
	
	
	$('.submitSearchAppointment').click( function(e) {
		e.preventDefault();
			var nearFieldValue = $.trim($('.searchForm-near-typeahead').val());
			if(nearFieldValue){
				var nlidValue = $.trim($('#searchForm-nlid').val());
				if (nlidValue.length > 0) {
					var splittedNear = nlidValue.split("|");
					if ($.trim(splittedNear[0]) != "") {
						$('#searchForm-localityId').val($.trim(splittedNear[0]));
						$('#searchForm-near').val($.trim(splittedNear[1]));
					} else {
						$('#searchForm-near').val(nearFieldValue);
					}
				} else {
					$('#searchForm-near').val(nearFieldValue);
				}
				
				if($.trim($('.searchForm-locality-typeahead').val()).length==0){
				    $('#searchForm-currentLocation').val(false)
				}
				
				//$('.searchForm').submit();
				
				var currentLocation = $("#searchForm-currentLocation").val();
				var cityId = $("#searchForm-cityId").val();
				var specialtyId = $("#searchForm-specialityId").val();
				var localityId = $("#searchForm-localityId").val();
				var sortBy = $("#searchForm-sortBy").val();
				
				var redirectURL = window.location.origin + '/search' + (clinicSearch ? '/clinics' : '') + '?find=' + $('.a-appointment .a-findDoc').val() + '&near=' + $('.searchForm-locality-typeahead').val() +
				                  '&cityName=' + $('.searchForm-near-typeahead').val() +'&sortBy=' + sortBy + '&currentLocation=' + currentLocation + '&specialityId=' + specialtyId + '&cityId=' + cityId +
				                  '&localityId=' + localityId + '&source=FNB';
									
				
				//Dentist&near=RPS+Green+Valley%2C+Faridabad&specialityId=&cityId=&localityId=&currentLocation=true&source=FNB&sortBy=DBS';
				
				window.location = redirectURL;
			}else{
				$('.homeCityInput input').addClass('showCityError');
				return;
			}
			
	});
});


function configureFindField() {
	var engine = new Bloodhound({
		name : 'symptomsArr',
		datumTokenizer : Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer : Bloodhound.tokenizers.whitespace,
		remote : {
			url : '/md/search/hcorpus?keyword=%QUERY',
			cache : true,
			filter : function(response) {
				if(response.hCorpus){
					var datumArray = [];
					for (var i = 0; i < response.hCorpus.length; i++) {
						var datum = {
								'value' : response.hCorpus[i].keyWord,
								'type' : response.hCorpus[i].type
							};
						datumArray.push(datum);
					}
					return datumArray;
				}
			}
		}
	});
	engine.initialize();
	
  	$('#searchForm-find, .a-searchBySpeciality .a-findDoc').typeahead({
	  	  hint: false,
	  	  highlight: true,
	  	  minLength: 0
  		},
		{
			name: 'specializations',
			displayKey: 'value',
			source: substringMatcher(Lybrate.specializationsAll.get()),
			templates: {
				header: '<div class="tt-label headlabel">Specialties</div>'
			}
		},
		{
			name: 'symptoms',
			displayKey: 'value',
			source: engine.ttAdapter(),
			templates: {
				header: '<div class="tt-label headlabel">Symptoms/Treatments</div>'
			}
		});
  	$('#searchForm-find, .a-searchBySpeciality .a-findDoc').on("typeahead:opened", function(){
  	    clinicSearch = false;
  	    ev = $.Event("keydown")
  	    ev.keyCode = ev.which = 40
  	    $(this).trigger(ev)
  	    return true
  	});

  	$('#searchForm-find, .a-searchBySpeciality .a-findDoc').on("typeahead:selected", function($e, datum){
  		if(datum.type && datum.type == "CL_SPCL"){
  			clinicSearch = true;
  		} else {
  			clinicSearch = false;
  		}
  	});   	
}

function configureFindCityField(){
    var cityName = Lybrate.Cookie.get('cityName');
    $('.searchForm-near-typeahead').val(cityName ? cityName: 'New Delhi')
    
    var engine = new Bloodhound({
		name : 'cities',
		limit: 10,
		datumTokenizer : Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer : Bloodhound.tokenizers.whitespace,
		remote : {
			url : '/md/search/cities?keyword=%QUERY'+'&maxResults=10',
			cache : true,
			filter : function(response) {
				var searchText = $('.searchForm-near-typeahead').val();
				if(searchText != null && searchText.length == 0){
					return Lybrate.popularCities.get().map( function (city) {
						return {
							'value': city,
							'name': city
						};
					});
				}
				var datumArray = [];
				for (var i = 0; i < response.cities.length; i++) {
					var datum = {
						'name' : response.cities[i].name,
						'value' : response.cities[i].name
					};
					datumArray.push(datum);
				}
				return datumArray;
			}
		}
	});
	engine.initialize();

    $('.searchForm-near-typeahead').typeahead({
          hint: false,
          highlight: true,
          minLength: 0,
        },
        {
          name: 'cities',
          displayKey: 'value',
          source: engine.ttAdapter(),
          templates: {
            suggestion: function(data){
            	return '<p><strong>' + data.value + '</strong></p>';
          	}
          }
              
    });
    
    $('.searchForm-near-typeahead').on("typeahead:opened", function () {
            ev = $.Event("keydown")
            ev.keyCode = ev.which = 40
            $(this).trigger(ev)
            return true
    });
}

function configureFindLocationField(){
	var engine = new Bloodhound({
		name : 'localities',
		datumTokenizer : Bloodhound.tokenizers.obj.whitespace('value'),
		queryTokenizer : Bloodhound.tokenizers.whitespace,
		remote : {
			url : '/md/search/localities?keyword=%QUERY'+'&maxResults=10&cityId=&cityName='+$('.searchForm-near-typeahead').val(),
			cache : true,
			filter : function(response) {
				var datumArray = [];
				for (var i = 0; i < response.localities.length; i++) {
					var datum = {
						'name' : response.localities[i].shortName,
						'value' : response.localities[i].shortName,
						'id' : response.localities[i].id,
						'tokens' : response.localities[i].name.split(" ")
					};
					datumArray.push(datum);
				}
				return datumArray;
			}
		}
	});
	engine.initialize();
	
	
	$('.searchForm-locality-typeahead').typeahead({
        hint: false,
        highlight: true,
        minLength: 0,
      },
      {
        name: 'localities',   
        displayKey: 'value',
        source: engine.ttAdapter(), 
        templates: {
            suggestion: function(data){
            return '<p><strong>' + data.value + '</strong></p>';
          }
        }
  	});
	
	$('.searchForm-locality-typeahead').on("typeahead:selected", function($e, datum) {
		if (datum['id'] !== undefined) {
			$('#searchForm-nlid').val(datum['id'] + "|" + datum['name']);
			$('#searchForm-sortBy').val('DBS');
			$('#searchForm-currentLocation').val(false);
		} else {
			if(datum['value'].indexOf('Current Location') != -1) {
				$('#searchForm-sortBy').val('DBS');
				$('#searchForm-currentLocation').val(true);
			} else {
				$('#searchForm-sortBy').val('BMS');
				$('#searchForm-currentLocation').val(false);
			}
		}
	});
}

$('.searchForm-near-typeahead').on("typeahead:selected", function(){
    $('.searchForm-locality-typeahead').typeahead('destroy').val('').focus();
    configureFindLocationField();
});

$('.searchForm-locality-typeahead').on("typeahead:selected", function(){
	$('.submitMakeAppointmentBtn').focus();
});

$('.searchForm-locality-typeahead').on("focus", function(){
    if($(this).val()==''){
        $('.typehelp').show();
    }else{
        $('.typehelp').hide();
    }
    
});

$('.searchForm-locality-typeahead').on("mouseout", function(){
    $('.typehelp').hide();
});

$(document).on('click', '.current_location', function(event) {
	$('.searchForm-locality-typeahead').typeahead('val', "Please authorize and wait...");
	loadGoogleMapsApiScript(initializeSearchGeocoder);
});

function initializeSearchGeocoder() {
	geocoder = new google.maps.Geocoder();
	invokeNavigator(updateFNBCityToCurrentLocation, locationNotAvailable);
}

function updateFNBCityToCurrentLocation(city, locality) {
    $('.searchForm-near-typeahead').typeahead('val', city);
	$('.searchForm-locality-typeahead').typeahead('val', locality);
	$('#searchForm-sortBy').val('DBS');
	$('#searchForm-currentLocation').val(true);
	Lybrate.Cookie.set("upllCity", city, 1);
}

function locationNotAvailable() {
	$('.searchForm-locality-typeahead').typeahead('val', '');
	$('.searchForm-locality-typeahead').focus();
}