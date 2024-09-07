import React, { useState } from "react";

import "./Auth.css";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";

const Auth = () => {
  const initialInputs = {
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  };
  const [formState, inputHandler, setFormData] = useForm(initialInputs, false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    //TODO: send data to server
    console.log(formState.inputs);
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      // handle when switch to login mode
      const inputData = {
        ...formState.inputs,
        name: undefined,
      };
      const formValidity =
        formState.inputs.email.isValid && formState.inputs.password.isValid;
      setFormData(inputData, formValidity);
    } else {
      // handle when switch to register mode
      const inputData = {
        ...formState.inputs,
        name: {
          value: "",
          isValid: false,
        },
      };
      setFormData(inputData, false);
    }

    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form className="place-form" onSubmit={loginSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter your name."
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          element="input"
          type="text"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email."
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="text"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password (at least 6 characters)."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
