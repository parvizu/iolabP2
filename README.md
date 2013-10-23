iolabP2
=======

INFO 290TA/ Information Organization Lab
Project #2

Project Title: Cal Tweet Mapper
Project Description: The Cal Tweet Mapper is a platform that allows the user to choose the popular hash-tags associated with the UC Berkeley Campus and correspondingly maps them to the map. On clicking, the twitter icon, the user can access the corresponding tweet too.

Team Members and Roles:
Shaohan Chen: UI
Derek Kuo: Google Maps API
Pablo Arvizu: Twitter API
Ashwin Chandak: UI
Technologies Used: HTML, CSS, JavaScript, JSON

Link to Demo Version:  http://people.ischool.berkeley.edu/~parvizu/iolab2013/twitterMapper/

Known Bugs:
1. If the tweet has no hashtags then an #undefined hastag is shown
2. When making searches to the twitter API, the most results you can get is 100 but there is a property called next_results in the search_metadata that is supposed to allow you to get the next 100 or so. Apparently this doesn't always work and is a known bug of the API. 
3. Tweets might be too long and display out of site in the map.
4. When clicking on a tweet it might cover another tweet. They have to be closed one by one.
5. Takes a few seconds to process everything and zoom the map.


