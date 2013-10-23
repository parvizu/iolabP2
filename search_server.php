<?php 

	//print_r($_GET);
// The search terms are passed in the q parameter
// search_server.php?q=[search terms]

if (!empty($_GET['q'])) {
	
	// Remove any hack attempts from input data
	$search_terms = htmlspecialchars($_GET['q']);
	
	// Get the application OAuth tokens
	require 'appTokens2.php';
	
	// Create an OAuth connection
	require 'tmhOAuth.php';
	$connection = new tmhOAuth(array(
	  'consumer_key'    => $consumer_key,
	  'consumer_secret' => $consumer_secret,
	  'user_token'      => $user_token,
	  'user_secret'     => $user_secret
	));
	
	// Request the most recent 100 matching tweets
	$http_code = $connection->request('GET',$connection->url('1.1/search/tweets'), 
		    	array('q' => $search_terms,
		    	'count' => 50,
				'type' => 'popular'
		    	//'lang' => 'en',
				//'type' => 'recent')
				));
	//print_r($connection);
	
	// Search was successful
	if ($http_code == 200) {
			
		// Extract the tweets from the API response
		$response = json_decode($connection->response['response'],true);
		//$tweet_data = $response['statuses']; 
		
		print($connection->response['response']);
		
	// Handle errors from API request
	} else {
		if ($http_code == 429) {
			print 'Error: Twitter API rate limit reached';
		} else {
			print_r($connection);
			print 'Error: Twitter was not able to process that search';
		}
	}

} else {
	print_r($_GET);
	print 'No search terms found';
}	

?>