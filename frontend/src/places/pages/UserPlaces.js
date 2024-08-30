import React from "react";
import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
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
      creator: "u2",
    },
  ];
  return <PlaceList items={DUMMY_PLACES} />;
};

export default UserPlaces;
