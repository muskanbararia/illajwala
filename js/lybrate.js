var geocoder, gMapsInitialized=false;
var gMapCallbacks = [];
function loadGoogleMapsApiScript(callback) {
	if(!gMapsInitialized) {
		gMapsInitialized = true;
		gMapCallbacks.push(callback);
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyBQsilq9Lpqyf8TVw6SkJQ-pg6fTLrFFa0&libraries=places&sensor=false&callback=gMapLoadCallback';
		document.body.appendChild(script);
	} else {
		if(typeof(google) == 'undefined') {
			gMapCallbacks.push(callback);
		} else {
			callback();
        }
	}
}

function gMapLoadCallback() {
	for(var i=0; i<gMapCallbacks.length; i++) {
		gMapCallbacks[i]();
	}
}

function invokeNavigator(callback, failureCallback) {
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(
	function( position ){
		updateUPLLCookie(position.coords.latitude, position.coords.longitude);
		getCity(position.coords.latitude, position.coords.longitude, callback);
	},
	function( error ){
		console.log(error);
		if(failureCallback !== null && failureCallback != undefined) {
			failureCallback();
		}
	},
	{
		timeout: (5 * 1000),
		maximumAge: 0,
		enableHighAccuracy: true
	}
  );
	var positionTimer = navigator.geolocation.watchPosition(
		function( position ){
			updateUPLLCookie(position.coords.latitude, position.coords.longitude);
			getCity(position.coords.latitude, position.coords.longitude, callback);
		},
		function( error ){
			console.log(error);
			if(failureCallback !== null && failureCallback != undefined) {
				failureCallback();
			}
		},
		{ enableHighAccuracy: true,maximumAge: 0}
	);

	setTimeout(
		function(){
			navigator.geolocation.clearWatch( positionTimer );
		},
		(1000 * 60 * 0.5)
	);
 }
}

function updateUPLLCookie(lat, lng) {
	var upllcValue = lat + "|" + lng;
	Lybrate.Cookie.set("upll", upllcValue, 1);
}

function getCity(latitude, longitude, callback){
	var latlng = new google.maps.LatLng(latitude, longitude);
	geocoder.geocode({'latLng': latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results) {
				var foundCity = false;
				var foundLocality = false;
				var city;
				var locality=new Array();
				for(var k=0;k<results[0].address_components.length;k++){
//					console.log(results[0]);
					for(var p=0;p<results[0].address_components[k].types.length;p++){
						if((results[0].address_components[k].types[p]=="locality") && !foundCity){
							var tempStr = results[0].address_components[k].long_name;
							city = tempStr;
							found = true;
							break;
						}else if((results[0].address_components[k].types[p]=="sublocality") && !foundLocality){
//							console.log(foundLocality);
							var tempStr = results[0].address_components[k].long_name;
//							console.log("SUBLOCALITY: " + results[0].address_components[k].long_name);
							locality.push(tempStr);
							foundLocality = true;
							break;
						}
					}
					if(foundCity==true){
						break;
					}
				}
				callback(city, locality);
			} else {
//				console.log('No results found');
			}
		} else {
//			console.log('Geocoder failed due to: ' + status);
		}
	});
}
