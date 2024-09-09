const express = require("express");

const placesController = require("../controllers/places-controllers");

const router = express.Router();

router.get("/:pid", placesController.getPlaceById);

router.get("/user/:uid", placesController.getPlaceByUserId);

router.post("/", placesController.createPlace);

router.patch("/:pid", placesController.updatePlace);

module.exports = router;
