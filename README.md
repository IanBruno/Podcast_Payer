# Podcast_Player

This project consists in receive an URL from an XML Podcast (by an input form),
and then read the properties of the file to show the content of this in an 
HTML page.

Structure of the project:

-Player.html
  This is the page that will show the content to the user with a basic design,
  first the user have to type an url of a podcast xml to try to be loaded
  (if the user do not type a url or the url is not from an XML, the page will show
  an error and wont try to get the properties).
  
  Once the user has typed a valid url, the script will read the properties of the file,
  then itself will add the value of this properties to the html page to be showned.
  
  The Html page show the title and description of the podcast on the top, after these 
  the image is showned on the left of the page, next to there is a table with an audio
  player on the top and lists of the values of the podcast properties like: name of episode,
  duration of this and publication date.

  The list of the episode name has a link to listen the audio, it will be reproduced into the
  audio player on the top.
  
  If you resize the web browser, the Duration and Publicated Columns will be hide to the page,
  this is because in the case you see the page on a mobile device, dont have a lot of information.
  
-podcastFunctions.js
  This is a JavaScript File that contains the functions used to load the XML file properties and
  then reload de Html Page.
  
  Inside of this is the function initializeXML(), the function used to realize the logic.
  
  This function load the properties from the XML file, and assign the value of these to the 
  htmle tags to be showned.
  
  Also there is a function to set the playlist of all the episodes to the Audio Player. These are loaded
  after of load the propertis of the File.
  
-OTHER FILES
  The other Files contains the java script libraries and the API of Google Feed (this used to load de XML File),
  these are contained inside the folder "JS" and in the folder named "css" are the css files used to the design
  of the page, one of this is the library of Bootstrap.
  
