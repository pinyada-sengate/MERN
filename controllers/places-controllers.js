const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");

// TODO: will fetch from database later
let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Basílica de la Sagrada Família",
    description:
      "Antoni Gaudí's renowned unfinished church, started in the 1880s, with museum and city views.",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipPvcLglf3S0-gNAZEVATnRTaObdbR4fcclktCO0=w408-h306-k-no",
    address: "Eixample, 08013 Barcelona",
    location: {
      lat: 41.403706,
      lng: 2.173504,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Walls of Ávila",
    description:
      "The Walls of Ávila, completed between the 11th and 14th centuries, are the defensive walls of Ávila, Spain, and its principal historic feature.",
    imageUrl:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQxmRsktTh1G8sZK6-zkVPafx__LYDlptCi1Irga40CfDv7fzEQ",
    address: "05001 Ávila, Ávila",
    location: {
      lat: 40.6576,
      lng: 4.6972,
    },
    creator: "u2",
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id",
      404
    );
    return next(error);
  }

  res.json({
    place: place.toObject({ getters: true }),
  });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find places.",
      500
    );
    return next(error);
  }

  if (!places || places.length === 0) {
    const error = new HttpError(
      "Could not find places for the provided id",
      404
    );
    return next(error);
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    next(new HttpError("Invalid inputs passed, please check your data", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;

  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://lh5.googleusercontent.com/p/AF1QipPvcLglf3S0-gNAZEVATnRTaObdbR4fcclktCO0=w408-h306-k-no",
    creator,
  });

  try {
    createdPlace.save();
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({
    place: createdPlace,
  });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({
    place: place.toObject({ getters: true }),
  });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findOneAndDelete({ _id: placeId });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete a place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
