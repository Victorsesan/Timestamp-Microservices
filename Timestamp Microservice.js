// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
 //My Solution
 //This is the url of where my app will be hosted ;
 //https://3000-freecodecam-boilerplate-1exewx84iwx.ws-eu114.gitpod.io
 //The first thing we needd to do for our app is to setup some routes
 //Setting up the routes: we need a route for our timestamp which is like /api/timestamp/2015-12-25 as it is on our sample
 //So the that above is our url route for our timestamp api/timestamp/date_string 
 //date string is an iput which our timestamp will take, we can also call it the homepage or result :) and that can be a date strin or unix time as on our sample page. Now lets start by setting up a date string and explain the code below
 
 let responseObject = {}
 app.get('/api/timestamp/:input', (request,response) => {
response.json = {responseObject}
 
 //First we called a method on the app using app.get to get access toour timestamp url and be able to set it up. Our path to get should just be /api/timestamp/ since thats what we are working on
 //Next we will be telling what we will be having in , either a date_string or a unix time. we used the request query thats why we put the colon ":input" . Next we create our middleware function as learned in the previous lesson. and we are using request and response and set its => 
  //For our response, since our sample solution which we have to follow is a json object "unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"
 //What we wiil do is create a java script onject to put in our json object which is let response.... 
 //And next we call a json method on the response response.json... to show our app what to show. For now we will just have it to show an empty bracket. You can text by;
 //Copy your app link paste on broswer , and change the last url to /api/timestamp/2015-12-25 you will see the results. Note a sample date has already been setup for us
//Now we have our route setup

//Second, Capturing our input: We need to capture our :input which we wrote whether its a date string or unix 
//Whenever we have a colun ":input" that gets treated as a url parameter, and the get stored in the request parameter , so we say

let input = request.params.input

if(input.includes('-')){
  //date string//
  //#1 step returning a valid unix timestamp//
  responseObject['unix'] = new Date(input).getTime()
  //#2 step returning a valid utc date string//
  responseObject['utc'] = new Date(input).toUTCString()
}else{
  //Timestamp//
input = parseInt(input)
//Confirming our integer & date//
responseObject['unix'] /*converting to date*/ = new Date(input).getTime()
//optional:adding utc too// 
responseObject['utc'] = new Date(input).toUTCString()
}
//Checking/returning an expected error for an invalid date//
if(!responseObject['unix'] || !responseObject['utc']){
  response.json({error: 'Invalid Date'})
}
response.json(responseObject)
})

//Returning current time & date in unix format for an empty date parametr//
app.get('/api/timestamp', (request,response) => {
  responseObject['unix'] = new Date().getTime()
/*Setting up a return to utc instead*/
 responseObject['utc'] = new Date(input).toUTCString()

  response.json(responseObject)
})


//So what this will do is whatever we put in there it will be stored as or replace input in our route and display the result in our app when switch to. So lets say we set our parems :input to be datestring when prompted it will show the function written in
//And next we test to see our result using the res.json . And if we go to our url now and refresh you wil see our 2015 date will show up. note this was already set in our input
//so we have figured a way to capture and edit our input we can now use it and fufill our test
//PS you can see what you have to do by copying your app url and pasting to the fcc solution  and it will show all what we have to do or what we haev let to do or current mistakes

// Our first test requires our app url to take a valid date and return the correct unix timestamp
//Note we are working to have everyhting show the real time ip address of my current computer or user, real time and date too when our url is loaded
//we can determine if our :input is a datestring or unix timestamp as so, 
//If it has a dash- space or a slash / its a date and specificaly ISO dates(2015-12-25) but timestamp on the other hand has none of those and are written together eg unix: 2333245532

//So in our code above we will continue with our solution with the if(input) method to have it tell us by saying if the input includes dash- the its a date or we have established a date string and what it also does is, it will response our object to a unix time stamp too , which we will get a new date and it call a getTime method to get time from our date string and return to unix 
//Next we can change our response.json from input to responseobject. When you refresh your url you will now see your unix time which by that you have passed the first step

//Next test: when given a valid date string it shoul return the correct utc string
//From our sample we can see a utc string written and stored in a strring called utc. We can create a utc by usig utc.get
//And what is does is you call it on any valid date and it converts it to utc for us, and we againg response our object and we put as toUTCString as thats how it is to return your utc
//And next refresh your url , that should show your utc date

//Next test: If we give it a valid unix date, it should handle a valid unix date and return the correct unix timestamp
//So now we will have our else method , as our first was if our input includes a dash- (date) it should perforn the following functions and now if not(else)?/which means our input is time// it will perform the followinng

//Its important to know our input is captured as a string , so our first prioty is convert to and integer since we are working with a time stamp instead we meed to make sure its an integer amd not a string, and we cando that using the Vanila javascript method 
//"parseInt" With this we give it  a string and it converts it to an integer for us. :String = input = parseInt(input)//converted//
//Next step set the unix field of the response object: since we have integer with the unix timestamp, its better to convert to a date first be4 a timestamp just to make sure the integer is correct and to make sure we are returning a proper date
//Note unix timestamp are generally in seconds but we have this on mili seconds
//Now if we refresh our app link we will see and object with the unix field and set to a timestamp
//Its optional: You can also add up your utc date same method in the unix field

//Next it should return an expected error message for an invalid date.
//How do we know if we have an invalid date? : when we try to create a date from an invalid input(our string) it will come up as null or void//
//We can determine if our input is invalid, if our new Date(input) unix or utc, it will return a null or undefineed value so that our unix or utc will also return null. So if our responseObject on unix and utc is invalid it should response to error 

//Next step for an empty date paremeter it should return the current time in unix format
//An empty date parametr means If we open our app link and clear our unix (0000657854) and we are left with just /api/timestamp/ in our browser and press enter or go to it will show cannot get , meaning we have to create a new route when there is nothing or when the unix is removed
//So we have to create a new route for the app if thats the case.
//First we have to use another app.get method, and this time the route is just /api/timestamp/ since we dont have anynext route
//Second we return the current time to unix format using response. we first create a new date with a get time and call a json response . So if in our app link we just have our /api/timestamp/ with no date parmt shown, it should return a new date and time to be shown rather than having not found,, and we do this by app.get the /api/timestampt only to set it up what it should do if its just it without any date 
//And this should response with our created unix function responseObject['unix'] and give a = new Date().getTime() and time
//And when you refresh after removing your unix on your app link this will be displayed

//Next step it again handle an empty date but it should return to a utc. 
//Sane like the previous step , but with this if it has an empty date it should return in a utc format instead 
//So since we have already gotten or app.get our empty date link /api/timestamp we can easily set our next step under with just a responseObect of what should be shown if its in that sate 
//Remember the method to convert a date to autc format is toUTCString eg New Date().toUTCString 

//So i have a fully working timestamp now!