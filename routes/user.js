/// <reference path="../typings/main.d.ts" />
var router = require('express').Router();
var AV = require('leanengine');

var User = AV.Object.extend('User');

router.get("/:id", function (req, res, done) {
	var userId = req.params.id;
	res.send("get a user")
});


router.post("/", function (req, res, done) {
	res.send("create a user");
});


module.exports = router;

