/// <reference path="../typings/main.d.ts" />
var router = require('express').Router();
var AV = require('leanengine');
var fs = require("fs");
// var Friend = AV.Object.extend('Friend');
var User = AV.Object.extend('User');



router.get("/", function (req, res, done) {
	res.render("friends")
})

router.get("/:username", function (req, res, done) {
	var username = req.params.username;
	var query = new AV.Query(User);
	query.equalTo("username", username);
	query.find().try(function (users) {
		res.send({user:JSON.stringify(users),id:users[0].id})
	}).catch(function (err) {
		res.send(err);
	})
})

router.post("/", function (req, res, done) {
	var user = req.AV.user;
	var relation = user.relation("friends");
	var friend = new User();
	friend.id=req.body.id;
	relation.add(friend);
	user.save();
	res.send("success");
})


module.exports = router;
