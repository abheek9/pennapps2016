
/*
 * GET home page.
 */

var AWS = require('aws-sdk'); 
var http = require('http');


AWS.config.update({
    accessKeyId: "xxxxxxxxxxxxxxxxxxx",
    secretAccessKey: "xxxxxxxxxxxxxxxxxxxxxx",
    "region": 'us-west-2' 
});

var twil = require('/Users/abheekbasu/desktop/workspace/pennapps2016/dhan/routes/twilio-node/lib');


exports.index = function(req, res){
  //res.render('index', { title: 'Express' });
	var inbound = require('/Users/abheekbasu/desktop/workspace/pennapps2016/dhan/routes/twilio-node/lib');
	var resp = new inbound.TwimlResponse();
	resp.message('It worked');  
	res.writeHead(200, {
		  'Content-Type':'text/xml'
	  });
	res.end(resp.toString());
	
  var dynamodb = new AWS.DynamoDB();
  /*
   * Only need to create this once
   * 
  var params = {
		    TableName : "users",
		    KeySchema: [       
		        { AttributeName: "cellphone", KeyType: "HASH"},  //Partition key
		    ],
		    AttributeDefinitions: [       
		        { AttributeName: "cellphone", AttributeType: "N" },
		    ],
		    ProvisionedThroughput: {       
		        ReadCapacityUnits: 2, 
		        WriteCapacityUnits: 2
		    }
		};

		dynamodb.createTable(params, function(err, data) {
		    if (err) {
		        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
		    } else {
		        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
		    }
		});
  
    var params2 = {
		    TableName : "jobs",
		    KeySchema: [       
		        { AttributeName: "jobId", KeyType: "HASH"},  //Partition key
		    ],
		    AttributeDefinitions: [       
		        { AttributeName: "jobId", AttributeType: "N" },
		    ],
		    ProvisionedThroughput: {       
		        ReadCapacityUnits: 2, 
		        WriteCapacityUnits: 2
		    }
		};

		dynamodb.createTable(params2, function(err, data) {
		    if (err) {
		        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
		    } else {
		        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
		    }
		});
		
		
		*/

  //this is the user schema
  /*
  function user(cellphone, city, state){
	  this.cellphone = cellphone;
	  this.city = city;
	  this.state = state;
  }
  */
  //var a = new user(2154601668, true, true, false, "mumbai", "Abheek");
  
  //this is the jobs schema
  function job(jobId, employerPhonenumber, city, wage, state){
	  this.jobId = jobId;
	  this.employerPhonenumber = employerPhonenumber;
	  this.city = city;
	  this.wage = wage;
	  this.state = state;
  }

  //var b = new job(1, 2154601668, "mumbai", 10, 10);

  var docClient = new AWS.DynamoDB.DocumentClient();
  
  /*
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


var thing2 = {
  	TableName: "jobs",

  };

  thing2["Item"] = b;

  docClient.put(thing2, function(err, data) {
      	if (err) {
          console.error("Unable to add thing2");
         } else {
           console.log("PutItem succeeded2:");
       	}
    });
  */
  
  var client = require('/Users/abheekbasu/desktop/workspace/pennapps2016/dhan/routes/twilio-node/lib')('AC4ffa84891105bb6dfaf2a951c9118c79', '554fb6f74209ea8c50868db95966c8ab');
  
  /*
  client.sendSms({
	  to: '+19739322884',
	  from: '+16149184239',
	  body:'I sent this from my laptop'
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
  */
  /*
  var inbound = require('/Users/abheekbasu/desktop/workspace/pennapps2016/dhan/routes/twilio-node/lib');
  http.createServer(function(req, res){
	  var resp = new inbound.TwimlResponse();
	  resp.message('It worked');
	  console.log("Beginning of response body");
	  console.log(req);
	 // var response = (req.Body);
	  //console.log(response);
	  
	  console.log("in head " + JSON.stringify(req.head));
	  res.writeHead(200, {
		  'Content-Type':'text/xml'
	  });
	  res.end(resp.toString());
	  
  }).listen(1337);
  */
  
  
};