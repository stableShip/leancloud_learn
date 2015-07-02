/// <reference path="../typings/main.d.ts" />
var router = require('express').Router();
var AV = require('leanengine');
var fs = require("fs");
var User = AV.Object.extend('User');

router.get("/:username", function (req, res, done) {
	var username = req.params.username;
	var query = new AV.Query(User);
	query.equalTo("username", username);
	query.find().try(function (users) {
		res.send(JSON.stringify(users))
	}).catch(function (err) {
		res.send(err.message);
	})
});


router.post("/", function (req, res, done) {
	// 创建该类的一个实例
	var user = new User();
	user.set("username", req.body.username);
	user.set("password", req.body.password);
	user.save().try(function (user) {
		res.send("success");
	}).catch(function (err) {
		res.send(err.message);
	})
});


router.post("/login", function (req, res, done) {
	var username = req.body.username;
	var password = req.body.password;
	AV.User.logIn(username, password).try(function (user) {
		res.send(JSON.stringify(req.AV.user));
		// console.log(user,"!!!!!")
		// console.log(AV.User.current());
		// console.log(req.AV.user,"req.AV.user");
	}).catch(function (error) {
		console.log(error, "error");
		res.send(error);
	});
});

router.get("/logout", function (req, res, done) {
	AV.User.logOut();
	res.send(AV.User.current());
});

module.exports = router;

