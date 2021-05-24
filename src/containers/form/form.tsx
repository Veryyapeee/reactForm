import React, { useState, useEffect, SetStateAction, Dispatch } from "react";

import Input from "components/input/input";
import Button from "components/button/button";

import onChangeForm from "utils/onChangeForm";
import { wholeFormValidity } from "utils/validation";

import { Form } from "utils/types";
interface Props {
  config: Form;
  setConfig: Dispatch<SetStateAction<Form>>;
  buttonTitle: string;
  onSubmit: () => void;
}

interface Element {
  id: string;
  name: string;
  config: any;
}

type E = React.FormEvent<HTMLFormElement>;

const FormStructure: React.FC<Props> = ({
  config,
  setConfig,
  buttonTitle,
  onSubmit,
}) => {
  // State for valid form and temp state to deal with async useState
  const [validForm, setValidForm] = useState<boolean>(
    wholeFormValidity(config)
  );
  const [state, setState] = useState<Form>(config);

  // Refresh state to update sync
  useEffect(() => {
    setState(config);
  }, [config, state]);

  // Get input config
  let key: string;
  let elements = [];
  for (key in state) {
    elements.push({
      id: key,
      name: key,
      config: state[key],
    });
  }

  // Function for mutate, validate and return new state when change input value
  const onChangeInput = (
    event: { target: HTMLInputElement },
    inputType: string
  ) => {
    setValidForm(onChangeForm(event, inputType, state, setConfig));
  };

  // Create inputs for form
  let formElements = elements.map((input: Element) => (
    <Input
      key={input.id}
      onChangeInput={(e: { target: HTMLInputElement }) =>
        onChangeInput(e, input.id)
      }
      inputName={input.name}
      {...input.config}
      stateMain={state}
    />
  ));

  return (
    <form
      onSubmit={(event: E) => {
        event.preventDefault();
        onSubmit();
      }}
      encType="multipart/form-data"
    >
      {formElements}
      <Button disabled={!validForm}>{buttonTitle}</Button>
    </form>
  );
};

export default FormStructure;
