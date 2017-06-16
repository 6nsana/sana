var express = require('express');
var ra = express();
var mongoose = require('mongoose');
var config = require('../../../config/config')
var currentdate = require('../../../config/currentdate')
var rarouter = express.Router();
var verifier = require('google-id-token-verifier');
var request = require('request');

exports.fb = function(req, res) {





//output--me from facebbok gives user id

// function verifyFacebookUserAccessToken(token) {
// 	return new Promise(function (resolve, reject) {
// 	var path = 'https://graph.facebook.com/me?access_token=' + token;
// 	request(path, function (error, response, body) {
// 		var data = JSON.parse(body);
// 		var dataaaa =body;
// 		console.log("re",dataaaa)
// 		//console.log(response)
// 		if (!error && response && response.statusCode && response.statusCode == 200) {
// 			var user = {
// 				facebookUserId: data.id,
// 				username: data.username,
// 				firstName: data.first_name,
// 				lastName: data.last_name,
// 				email: data.email
// 			};
// 			console.log(data)
// 			resolve(user);
// 		}
// 		else {
// 			console.log(data.error);
// 			//console.log(response);
// 			reject({code: response.statusCode, message: data.error.message});
// 		}
// 	});

// })
// }

// var socialToken = req.body.socialToken;

//   verifyFacebookUserAccessToken(socialToken).then(function (profile) {
//         // Return the user data we got from Facebook
//         res.json('Authenticated as: ' + profile);
//     }).catch(function (err) {
//         res.send('Failed!' + err.message);
//     })

// }



//output-- app details
var accesstok='1747704782206801|d7s0LMIKU0iRlGqtgKJ91-cyIXU'

function verifyFacebookUserAccessToken(token) {
	return new Promise(function (resolve, reject) {
	var path = 'https://graph.facebook.com/debug_token?input_token=' + token+" &access_token="+ accesstok;
	request(path, function (error, response, body) {
		var data = JSON.parse(body);
		console.log("data",data)
		
		console.log("re",data.data.is_valid)
		//console.log(response)
		if (data.data.is_valid==true) {
			
			//console.log(data)
			resolve(data.data.is_valid);
		}
		else {
			console.log(data.data.error);
			//console.log(response);
			reject({message: data.data.error});
		}
	});

})
}

var socialToken = req.body.socialToken;

  verifyFacebookUserAccessToken(socialToken).then(function (profile) {
     
        res.json('Authenticated as: ' + profile);
    }).catch(function (err) {
        res.send('Failed!' + err.message);
    })

}














// output  "App access token : access_token=1747704782206801|d7s0LMIKU0iRlGqtgKJ91-cyIXU"

// function appAccessToken(token) {
// 	return new Promise(function (resolve, reject) {
// 	//var path = 'https://graph.facebook.com/v2.8/debug_token?input_token=' + token;
// 	var path = 'https://graph.facebook.com/oauth/access_token?client_id=1747704782206801&client_secret=11522ac5d43e730c40c7d418d5b593a3&grant_type=client_credentials';
// 	request(path, function (error, response, body) {
// 		//var data = JSON.parse(body);
// 		var dataa =body;
// 		console.log("re",dataa)
// 		//console.log(response)
// 		if (!error && response && response.statusCode && response.statusCode == 200) {
// 			// var user = {
// 			// 	facebookUserId: data.id,
// 			// 	username: data.username,
// 			// 	firstName: data.first_name,
// 			// 	lastName: data.last_name,
// 			// 	email: data.email
// 			// };
// 			//console.log(data)
// 			resolve(body);
// 		}
// 		else {
// 			console.log(data.error);
// 			//console.log(response);
// 			reject({code: response.statusCode, message: data.error.message});
// 		}
// 	});

// })
// }

// var socialToken = req.body.socialToken;

//   appAccessToken(socialToken).then(function (profile) {
//         // Return the user data we got from Facebook
//         res.json('App access token : ' + profile);
//     }).catch(function (err) {
//         res.send('Failed!' + err.message);
//     })

// }




