// google maps code
var map;
function initialize(lat, long) {
    var mapOptions = {
    	zoom: 16,
    	center: new google.maps.LatLng(lat, long),
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
    setMarkers(map, tweets);

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

    return contentString                        
}

function makeInfoWindowEvent(map, infowindow, contentString, marker) {
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });
}

var tweets = [
  ['User1', 37.873154, -122.266768, ['tag1','tag2'], '2013-10-19', 'Free lunch and free dinner in Ischool today'],
  ['User2', 37.872154, -122.264768, ['tag2','tag3'], '2013-10-19', 'Free lunch and free dinner in Ischool today'],
  ['User3', 37.871154, -122.262768, ['tag3','tag4'], '2013-10-19', 'Free lunch and free dinner in Ischool today'],
  ['User4', 37.870154, -122.260768, ['tag4','tag5'], '2013-10-19', 'Free lunch and free dinner in Ischool today']  
];

function setMarkers(map, locations) {
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
    for (var i = 0; i < locations.length; i++) {
        var tweet = locations[i];
        // load content from each tweet
        var user = tweet[0];
        var myLatLng = new google.maps.LatLng(tweet[1], tweet[2]);
        var tags = tweet[3];
        var timestamp = tweet[4];
        var content = tweet[5];

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

    }


}

// document ready
$(document).ready(function() {
    google.maps.event.addDomListener(window, 'load', initialize(37.870154, -122.260768));
});




