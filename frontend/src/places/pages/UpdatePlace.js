import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";

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

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Clould not find a place</h2>
      </div>
    );
  }

  return (
    <form>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        OnInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type="submit" disabled={true}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
