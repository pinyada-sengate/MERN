import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./PlaceForm.css";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";

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
  const [isLoading, setIsLoading] = useState(false);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    console.log(identifiedPlace);
    setFormData(
      {
        title: {
          value: identifiedPlace.title,
          isValid: true,
        },
        description: {
          value: identifiedPlace.description,
          isValid: true,
        },
      },
      true
    );

    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();

    //TODO: updare to database later
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Clould not find a place</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
