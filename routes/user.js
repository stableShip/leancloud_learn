/// <reference path="../typings/main.d.ts" />
var router = require('express').Router();
var AV = require('leanengine');
var fs=require("fs");
var User = AV.Object.extend('User');

router.get("/:username", function (req, res, done) {
	var username = req.params.username;
	var query = new AV.Query(User);
	query.equalTo("username", username);
	query.find().try(function (users) {
		res.send(users[0])
	}).catch(function(err){
		res.send(err.message);
	})
});


router.post("/", function (req, res, done) {
	// 创建该类的一个实例
	var user = new User();
	user.set("username", req.body.username);
	user.set("password", req.body.password);
	user.save().try(function(user){
		res.send(user);
	}).catch(function(err){
		res.send(err.message);
	})
});


module.exports = router;

