const players = require("../controllers/players")

const express = require("express"),
    router = new express.Router(),
    playersController = require("../controllers/players")

router.route("/").get(playersController.search)
router.route("/averages").get(playersController.averages)
router.route("/stats").get(playersController.stats)

module.exports = router
