const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provided id", 404);
  }

  res.json({
    place,
  });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);

  if (!places) {
    throw new HttpError("Could not find a places for the provided id", 404);
  }

  res.json({
    places,
  });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  // will add to database later
  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({
    place: createdPlace,
  });
};

const updatePlace = (req, res, next) => {
  if (!errors.isEmpty) {
    throw new HttpError("Invalid inputs passed, please check your data", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };

  if (!updatedPlace) {
    throw new HttpError("Could not find a place for the provided id", 404);
  }

  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({
    place: updatedPlace,
  });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
