// google maps code
var map;
var markers = [];

var crd;

//list of tag relations and combinatios for a particular subject
var tagRelations = { 
	'ucberkeley': ['#UCBerkeley','#BerkeleyBlog','#AtBerkeley','#Cal','#UCB','#OccupyCal','#University','#Berkely','#UniversityofCalifornia','#UC #Berkeley'],
	'ischool': [ 'Berkeley #BigData','Berkeley #ischool', 'Berkeley #mims', 'Berkeley #southhall', 'Berkeley South Hall', 'UCBerkeley #BigData','UCBerkeley #ischool', 'UCBerkeley #mims', 'UCBerkeley #southhall', 'UCBerkeley South Hall' ],
	'football': ['#Berkeley #Football', '#Cal #Football', '#UCBerkeley #Football','#Cal #Bears','#CalBears','#CalFootball','#GoBears','#GoCal','#Cal Memorial Stadium','#BearRaid'],
	'ihouse': ['#Berkeley #IHDay','#Berkeley #IHDay13','#Berkeley #IHouse','#Berkeley #InternationalHouse','#UCBerkeley #IHDay','#UCBerkeley #IHDay13','#UCBerkeley #IHouse','#UCBerkeley #InternationalHouse','#Cal #IHDay','#Cal #IHDay13','#Cal #IHouse','#Cal #InternationalHouse'],
	'campanile': ['#Berkeley #Campanile','#Berkeley Campanile','#Berkeley #SatherTower','#Berkeley Sather Tower','#UCBerkeley Campanile','#UCBerkeley #Campanile','#UCBerkeley #SatherTower','#UCBerkeley Sather Tower','#Cal #Campanile','#Cal Campanile','#Cal #SatherTower','#Cal Sather Tower'],
	'haas': ['#Berkeley #Haas','#Berkeley Haas','#Berkeley #Business','#Berkeley MBA','#UCBerkeley #Haas','#UCBerkeley #Business','#UCBerkeley MBA','#Berkeley #Haas','#Cal #MBA','#Berkeley MBA','#UCBerkeley #PlayHackaton','#UCBerkeley #MBA','#UCBerkeley #Play2013']
	
};
	
	

function initialize(lat, long) {
    var mapOptions = {
    	zoom: 15,
    	center: new google.maps.LatLng(lat, long),
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
	
}



//html used to create the tweet in the map when clicked on it
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
//dummy list of tweets.
var tweets = [
  ['User1', ['tag1','tag2'], '2013-10-19', 'Free lunch and free dinner in Ischool today'],
  ['User2', ['tag2','tag3'], '2013-10-19', 'Free lunch and free dinner in Ischool today'],
  ['User3', ['tag3','tag4'], '2013-10-19', 'Free lunch and free dinner in Ischool today'],
  ['User4', ['tag4','tag5'], '2013-10-19', 'Free lunch and free dinner in Ischool today']  
];

/*
function used to place the tweets in the map
*/
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
	//places predefined in the map to place the tweets
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
        zoom = 17;
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
	//creates the tweet and its info to be placed in the map
    for (var i = 0; i < locations.length; i++) {
        var tweet = locations[i];
        // load content from each tweet
        var user = "User: "+tweet[0];
        
        //var myLatLng = new google.maps.LatLng(tweet[1], tweet[2]);
        var x = Math.random();
        var latitude = x * min_latitude + (1-x)* max_latitude;
        x = Math.random();
        var longitude = x * min_longitude + (1-x)* max_longitude;
        var myLatLng = new google.maps.LatLng(latitude, longitude);

        var tags = "Hashtags: "+ tweet[1];
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

/*function that removes the markers/tweets from the map
*/
function deleteMarkers(){
    for (var i = 0; i<markers.length; i++){
        markers[i].setMap(null);
    }
    markers = [];
}

// document ready
$(document).ready(function() {
    google.maps.event.addDomListener(window, 'load', initialize(37.870154, -122.260768));
});

/*
function used to get the selected checklist from the form to make the search for each one
*/
function selection()
{
	$("#tweets").html("");
	$("#hashtags").html("");
	deleteMarkers();
	var qdata = {'q': $('#keyword').val()};
	var checked = $("input[name=options]:checked");	
	//console.log(checked);
	if (checked.length)
	{
		for(var i =0; i<checked.length;i++)
		{
			for(var j = 0; j<tagRelations[checked[i]['id']].length;j++)
			{
				openSearch(checked[i]['id'],tagRelations[checked[i]['id']][j]);
			}
			
		}
	}
}

/*
function that gets the results of a search to twitter API and then calls the function to place them in the map */
function openSearch(category, keywords)
{
	var qdata = {'q': keywords};
	$.ajax({
		url: 'search_server.php',
		type: 'GET',
		data: qdata,
		dataType: 'json',
		error: function(error)
			{
				console.log(arguments);
				console.log("Error: " + error.statusText);
			},
		success: function(data)
			{
				var tweets =[];
				var tweetTexts=[];
				console.log(data);
				$.each(data['statuses'], function(i,val) 
				{
					var tags =getHashTagArray(val['entities']['hashtags']);
					console.log(tags);
					var t =  [val['user']['screen_name'],tags , val['created_at'], val['text']];
					tweets.push(t);	
					tweetTexts.push(val['text']);
					if(tags.length>0)
					{
						displayHashtags(tags);
					}
					
				});
				
				displayTweetTexts(tweetTexts);
				
				setMarkers(map,tweets,category);
			}
	});	
}

/* used to display the text of the tweets in the div under the map */
function displayTweetTexts(tweets)
{
	for(var i=0; i<tweets.length;i++)
	{
		$("#tweets").append("<li>"+tweets[i]);	
	}
}


/* used to add the list of hastags to the div in the website */
function displayHashtags(hashtags)
{
	if (hashtags.length>0)
	{
		for(var i=0; i<tweets.length;i++)
		{
			if(hashtags[i]!='undefined')
				$("#hashtags").append("<li>#"+hashtags[i]);	
		}	

	}
}

/* function that creates an array of multiple json atributes */
function getHashTagArray(json)
{
	var ht=[];
	$.each(json, function(i,val)
	{
		ht.push(json[i]['text']);
	});
	return ht;	
}

