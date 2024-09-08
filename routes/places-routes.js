const express = require("express");

const router = express.Router();

// TODO: will fetch from database later
const DUMMY_PLACES = [
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

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    return res.status(404).json({
      message: "Clould not find a place",
    });
  }

  res.json({
    place,
  });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    return res.status(404).json({
      message: "Clould not find a place",
    });
  }

  res.json({
    place,
  });
});

module.exports = router;
