/// <reference path="../typings/main.d.ts" />
var router = require('express').Router();
var AV = require('leanengine');

var User = AV.Object.extend('User');

router.get("/:username", function (req, res, done) {
	var username = req.params.username;
	var query = new AV.Query(User);
	query.equalTo("username", username);
	query.find({
		success: function (results) {
			console.log("Successfully retrieved " + results.length + " scores.");
			// Do something with the returned AV.Object values
			for (var i = 0; i < results.length; i++) {
				var object = results[i];
				console.log(object.id + ' - ' + object.get('playerName'));
			}
			res.send(JSON.stringify(results[0]));
		},
		error: function (error) {
			res.send("Error: " + error.code + " " + error.message);
		}
	})
});


router.post("/", function (req, res, done) {
	console.log(req.body,"!!!!!!!!!!!!!!!");
	// 创建该类的一个实例
	var user = new User();
	user.set("username", req.body.username);
	user.set("password", req.body.password);
	user.save(null, {
		success: function (gameScore) {
			// Execute any logic that should take place after the object is saved.
			res.send("create a user");
		},
		error: function (gameScore, error) {
			// Execute any logic that should take place if the save fails.
			// error is a AV.Error with an error code and description.
			res.send('Failed to create new object, with error code: ' + error.message);
		}
	});

});


module.exports = router;

