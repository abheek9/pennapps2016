
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var AWS = require('aws-sdk'); 

AWS.config.update({
    accessKeyId: "xxxxxxxxxx",
    secretAccessKey: "xxxxxxxxxxxxxxxxxxx",
    "region": 'us-west-2' 
});

var twilio = require('/Users/abheekbasu/desktop/workspace/pennapps2016/dhan/routes/twilio-node/lib');

var dynamodb = new AWS.DynamoDB();

var docClient = new AWS.DynamoDB.DocumentClient();


//this is the user schema
function u(cellphone, subscribe){
	  this.cellphone = cellphone;
	  this.subscribe = subscribe;
}

//this is the jobs schema
function job(jobId, employerPhonenumber, city, wage, state){
	  this.jobId = jobId;
	  this.employerPhonenumber = employerPhonenumber;
}

/*
//this is the user schema
function user(cellphone, name, city, state){
	  this.cellphone = cellphone;
	  this.name = name;
	  this.city = city;
	  this.state = state;
}

//this is the jobs schema
function job(jobId, employerPhonenumber, city, wage, state){
	  this.jobId = jobId;
	  this.employerPhonenumber = employerPhonenumber;
	  this.city = city;
	  this.wage = wage;
	  this.state = state;
}

*/

//AWS.config.region = 'us-west-2';

// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/', function(req,res){
	
	console.log("here");
	var resp = new  twilio.TwimlResponse();
	console.log("the body is " + req.body.Body.trim());
	console.log("the from is " + req.body.From.trim());
	
	var sms = req.body.Body.trim();
	var number = req.body.From.trim();
	
	var client = require('/Users/abheekbasu/desktop/workspace/pennapps2016/dhan/routes/twilio-node/lib')('AC4ffa84891105bb6dfaf2a951c9118c79', '554fb6f74209ea8c50868db95966c8ab');
	//labourer
	
	if(sms.indexOf("subscribe") != -1){
		
		
		//var a = new user(number, "subscribe");
		
		var thing = {
		  	TableName: "users",

		  };

		  thing["Item"] = new u(number, "subscribe");

		  docClient.put(thing, function(err, data) {
		      	if (err) {
		          console.error("Unable to add thing1");
		         } else {
		           console.log("PutItem succeeded:");
		       	}
		    });
	}
	
	if(sms.indexOf("job") != -1){
		var params = {
			 TableName: "users",
			};
		
		docClient.scan(params, onScan);
		
		function onScan(err, data) {
		    if (err) {
		        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
		    } else {
		        // print all the movies
		        console.log("Scan succeeded.");
		        data.Items.forEach(function(person) {
		            
		        	  client.sendSms({
		        		  to: person.cellphone,
		        		  from: '+16149184239',
		        		  body: "There is a new job call "+ number + " now",
		        	  }, function(error, message) {
		        		  if(!error) {
		        			  console.log('Success! Its working. The SID for this SMS message is:');
		        			  console.log(message.sid);
		        			  console.log('Message sent on:');
		        			  console.log(message.dateCreated);
		        		  } else {
		        			  console.log('Oops! There was an error.');
		        		  }
		        	  });
		        });

		        // continue scanning if we have more movies
		        if (typeof data.LastEvaluatedKey != "undefined") {
		            console.log("Scanning for more...");
		            params.ExclusiveStartKey = data.LastEvaluatedKey;
		            docClient.scan(params, onScan);
		        }
		    }
		    
		}

		
		
	}
	
	
	
	
	/*
	if(sms.indexOf("subscribe") != -1){
		var qu = {
			    TableName : "users",
			    Key: {
			    	"cellphone" :{
			    		"S" : number
			    	}
			    }
			};
		
		dynamodb.getItem(qu,function(err, data){
			if(data){
				
				
			}
			
			
		});

		
		
		
		

		
	}
	else{
		
		var a = new user(number, "toFill", "toFill", 1);
		
		var thing = {
		  	TableName: "users",

		  };

		  thing["Item"] = a;
		  		

		  docClient.put(thing, function(err, data) {
		      	if (err) {
		          console.error("Unable to add thing1");
		         } else {
		           console.log("PutItem succeeded:");
		       	}
		    });
		
	}
	
	//employer
	if(sms === "job"){
		
		
	}
	
	*/
	
	resp.message('You already subscribed!');
	res.writeHead(200, {
	  'Content-Type':'text/xml'
		 });
	res.end(resp.toString());
});
	


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
