const express = require("express"),
    router = new express.Router(),
    playersController = require("../controllers/players")

router.route("/").get(playersController.index)

module.exports = router
