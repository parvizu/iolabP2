// google maps code
var map;
var markers = [];

var crd;

function initialize(lat, long) {
    var mapOptions = {
    	zoom: 16,
    	center: new google.maps.LatLng(lat, long),
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    setMarkers(map, tweets,'campanile');

}




function generate_tweet_content(user,tags,timestamp,content) {
    var all_tags = '';
    for (var i =0; i < tags.length; i++){
        all_tags += tags[i] +' '; 
    }

    var contentString = '<div class="tweet_info_window">'+
                            '<div class="tweet_content"><b>'+content+'</b></div>'+
                            '<div class="tweet_user">'+user+'</h1>'+
                            '<div class="tweet_tags">'+all_tags+'</div>'+
                            '<div class="tweet_timestamp">'+timestamp+'</div>'+
                        '</div>';

    return contentString;                        
}

function makeInfoWindowEvent(map, infowindow, contentString, marker) {
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}

var tweets = [
  ['User1', ['tag1','tag2'], '2013-10-19', 'Free lunch and free dinner in Ischool today'],
  ['User2', ['tag2','tag3'], '2013-10-19', 'Free lunch and free dinner in Ischool today'],
  ['User3', ['tag3','tag4'], '2013-10-19', 'Free lunch and free dinner in Ischool today'],
  ['User4', ['tag4','tag5'], '2013-10-19', 'Free lunch and free dinner in Ischool today']  
];

function setMarkers(map, locations, place) {
    var image = {
        url: '_img/twitter_icon.png',
        size: new google.maps.Size(20, 20),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 20)
    };
    var shape = {
      coord: [1, 1, 1, 20, 18, 20, 18 , 1],
      type: 'poly'
    };
    var infowindow = new google.maps.InfoWindow();

    var min_longitude;
    var max_longitude;
    var min_latitude;
    var max_latitude;
    var zoom;
    if (place == 'ischool'){
        min_longitude = -122.258677;
        max_longitude = -122.258339;
        min_latitude = 37.871160;
        max_latitude = 37.871533;
        zoom = 19;
    }
    else if (place == 'football'){
        min_longitude = -122.251795;
        max_longitude = -122.249665;
        min_latitude = 37.869922;
        max_latitude = 37.871954; 
        zoom = 18;
    }
    else if (place == 'ihouse'){
        min_longitude = -122.251950;
        max_longitude = -122.251038;
        min_latitude = 37.869299;
        max_latitude = 37.870027; 
        zoom = 19;        
    }
    else if (place == 'ucberkeley'){
        min_longitude = -122.265758;
        max_longitude = -122.253441;
        min_latitude = 37.868054;
        max_latitude = 37.875541; 
        zoom = 16;          
    }
    else if (place == 'haas'){
        min_longitude = -122.254343;
        max_longitude = -122.253152;
        min_latitude = 37.871294;
        max_latitude = 37.872221; 
        zoom = 19;          
    }
    else if (place == 'campanile'){
        min_longitude = -122.258157;
        max_longitude = -122.257588;
        min_latitude = 37.871768;
        max_latitude = 37.872327; 
        zoom = 19;          
    }
    cenLatLng = new google.maps.LatLng((min_latitude+max_latitude)/2,(min_longitude+max_longitude)/2);
    map.setCenter(cenLatLng);
    map.setZoom(zoom);
    for (var i = 0; i < locations.length; i++) {
        var tweet = locations[i];
        // load content from each tweet
        var user = tweet[0];
        
        //var myLatLng = new google.maps.LatLng(tweet[1], tweet[2]);
        var x = Math.random();
        var latitude = x * min_latitude + (1-x)* max_latitude;
        x = Math.random();
        var longitude = x * min_longitude + (1-x)* max_longitude;
        var myLatLng = new google.maps.LatLng(latitude, longitude);

        var tags = tweet[1];
        var timestamp = tweet[2];
        var content = tweet[3];

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image,
            shape: shape,
            title: user,
        });

        var contentString = generate_tweet_content(user,tags,timestamp,content);

//        var infowindow = new google.maps.InfoWindow();
        makeInfoWindowEvent(map,infowindow,contentString, marker);
        markers.push(marker);
    }
}


function deleteMarkers(){
    for (var i = 0; i<markers.length; i++){
        markers[i].setMap(null);
    }
    markers = [];
}


/*
function getUserGeolocation(callback){
    if (navigator.geolocation) {
       var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        function success(pos) {
            crd = pos.coords;

            console.log('Your current position is:');
            console.log('Latitude : ' + crd.latitude);
            console.log('Longitude: ' + crd.longitude);
            console.log('More or less ' + crd.accuracy + ' meters.');
            callback();
        };
        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        };
        navigator.geolocation.getCurrentPosition(success, error, options);

    }

}
*/

// document ready
$(document).ready(function() {
    google.maps.event.addDomListener(window, 'load', initialize(37.870154, -122.260768));
});



//twitter search results and mapping
function openSearch()
{
	console.log($("#keyword").val());
	var qdata = {'q': $("#keyword").val() };
	
	$.ajax({
		url: 'http://people.ischool.berkeley.edu/~parvizu/iolab2013/twitterMapper/search_server.php',
		type: 'GET',
		data: qdata,
		dataType: 'jsonp',
		crossDomain: true,
		error: function(error)
			{
				console.log(arguments);
				console.log("Error: " + error.statusText);
			},
		success: function(data)
			{
				var tweets =[];
				console.log(typeof data);
				$.each(data['statuses'], function(i,val) 
				{
					if(val['entities']['geo'] != null)
					{
						var t =  [val['user']['screen_name'], 37.873154, -122.266768, getHashTagArray(val['entities']['hashtags']), val['created_at'], val['text']];	
					}
				});
				
				setMarkers(map,tweets);
			}
	});	
}

function getHashTagArray(json)
{
	var ht=[];
	$.each(json, function(i,val)
	{
		ht.push(json[i]['text']);
		console.log(ht);
	});
	return ht;	
}


