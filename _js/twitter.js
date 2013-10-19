// JavaScript Document
var map;
var lat='';
var long='';

function usersShow()
{
	var user = {'user': $("#searchUser").val() };
	
	$.ajax({
		url: 'usersShow.php',
		type: 'POST',
		data: user,
		dataType: 'json',
		error: function(error)
			{
				console.log("Error: " + error.statusText);
			},
		success: function(data)
			{
				console.log("Success: ");
				console.log(data);
				
				$("#results").html("");
				/*$.each(data['statuses'], function (i,val) 
				{
					console.log(val);
					printTweet(val);
				});*/
			}
	});
	
}

function openSearch()
{
	console.log($("#search").val());
	var qdata = {'q': $("#search").val() };
	
	$.ajax({
		url: 'search_server.php',
		type: 'GET',
		data: qdata,
		dataType: 'json',
		error: function(error)
			{
				console.log("Error: " + error.statusText);
			},
		success: function(data)
			{
				console.log(data);
				//$("#result").html(data);
				getHashTagCount(data['statuses']);
				$("#results").html("");
				$.each(data['statuses'], function(i,val) {
						
						$("#results").append("<br>"+val['text']);
						$("#results").append("<br>By: @"+val['user']['screen_name']);
						//console.log(val['user']);
						$("#results").append("<br>Location: "+getGeoLocation(val));
						$("#results").append("<br>Created: "+val['created_at']+"<br><br>");
						
				});
			}
	});	
}

function printTweet(tweet)
{
	
	$("#results").append("<br>"+tweet['text']);
	$("#results").append("<br>By: @"+tweet['user']['screen_name']);
	$("#results").append("<br>Location: "+getGeoLocation(tweet));
	$("#results").append("<br>Created: "+tweet['created_at']+"<br><br>");
	
}

function getGeoLocation(tweet)
{
	if (tweet['geo'])
	{
		console.log(tweet);	
		return tweet['geo']['coordinates'][0] +","+tweet['geo']['coordinates'][1];
	}
	return null;
}

function searchTweets()
{
	var locdata = {'lat': lat, 'long': long};
	console.log(locdata);
	$.ajax({
		url: 'searchTweets.php',
		type: 'POST',
		data: locdata,
		//dataType: 'json',
		error: function(error)
			{
				console.log("Error: " + error.statusText);
			},
		success: function(data)
			{
				
				console.log($.parseJSON(data));
				var objs = $.parseJSON(data)['statuses'];
				$.each(objs, function(i, val) 
					{
						//printHashTags(objs[i]);
						
					});
				
				getHashTagCount(objs);
			}
	});		
}

function printHashTags(obj)
{
	$("#tweets").append("<p>"+obj['text']+"</p>");
	var ent = obj['entities'];
	if (hasTags(ent))
	{
		var ht = ent['hashtags'];
		$.each(ht, function(i,val)
		{
			$("#results").append("#"+ht[i]['text']+"<br>");
			//console.log("HTag: "+ht[i]['text']);	
		});
	}
		
}

function hasTags(entities)
{
	if(entities['hashtags'].length>0)
		return true;
	else
		return false;
	
}

function getHashTagCount(tweets)
{
	var ent;
	var ht;
	var hashtags = [];
	$.each(tweets, function(i, val) 
		{
			ent = tweets[i]['entities'];
			if( hasTags(ent))
			{
				ht = ent['hashtags'];
				$.each(ht, function(i,val)
				{
					hashtags.push(ht[i]['text']);
					//$("#results").append("#"+ht[i]['text']+"<br>");
				});	
			}
			
		});
	console.log(hashtags);
	console.log(countHashTags(hashtags));
	
	var orderHashTags = countHashTags(hashtags);
	
	$("#results").html("");
	for (var i =0; i<orderHashTags[0].length;i++)
	{
		$("#results").append(orderHashTags[1][i] +" - " +orderHashTags[0][i] +"<br>");
	}
}

function countHashTags(tags)
{
	var a = [], b = [], prev;
    tags.sort();
    for ( var i = 0; i < tags.length; i++ ) {
        if ( tags[i] !== prev ) {
            a.push(tags[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = tags[i];
    }
    return [a, b];	
}

// google maps code
function initialize(latt, longt, targetID) 
{
    var mapOptions = {
    	zoom: 17,
    	center: new google.maps.LatLng(latt, longt),
    	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById(targetID), mapOptions); //creates a new map and adds it to the element passed in the variable targetID
}


function getUserLocation()
{
	var options = 
	{
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};
	
	function success(pos)
	{
		console.log("Latitude:" + pos.coords.latitude); //logging the coordinates
		console.log("Longitude: " + pos.coords.longitude);
		google.maps.event.addDomListener(window, 'load', initialize(pos.coords.latitude,pos.coords.longitude,"map"));	//loads the map
		
		lat= pos.coords.latitude;
		long=pos.coords.longitude;
	};
	
	function error(err)
	{
		console.log(err.message);
	};
	navigator.geolocation.getCurrentPosition(success, error, options); //gets the user's position.
}	


$(document).ready(function() 
	{
		if (navigator.geolocation) 
		{
			getUserLocation();
		}
		else
		{	
			console.log("Navigation denied: "+navigator.geolocation);	
		}
	}
)