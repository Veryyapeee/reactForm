import React, { useState } from "react";

import Input from "components/input/input";
import Button from "components/button/button";

import onChangeForm, { wholeFormValidity } from "utils/onChangeForm";
interface Props {
  config: any;
  setConfig: any;
  buttonTitle: string;
  onSubmit: () => void;
  formTitle?: string;
  children?: JSX.Element | JSX.Element[] | string;
  checkPass?: boolean;
}

interface Element {
  id: string;
  name: string;
  config: any;
}

type E = React.FormEvent<HTMLFormElement>;

const FormStructure: React.FC<Props> = (props) => {
  const [validForm, setValidForm] = useState(wholeFormValidity(props.config));

  // Get input config
  let key: typeof props.config;
  let elements = [];
  for (key in props.config) {
    elements.push({
      id: key,
      name: key,
      config: props.config[key],
    });
  }

  // Function for mutate, validate and return new state when change input value
  const onChangeInput = (
    event: { target: HTMLInputElement },
    inputType: typeof props.config
  ) => {
    setValidForm(onChangeForm(event, inputType, props.config, props.setConfig));
  };

  // Create inputs for form
  const formElements = elements.map((input: Element) => (
    <Input
      key={input.id}
      onChangeInput={(e: { target: HTMLInputElement }) =>
        onChangeInput(e, input.id)
      }
      inputName={input.name}
      {...input.config}
      stateMain={props.config}
    />
  ));

  return (
    <div>
      <span>{props.formTitle}</span>
      <form
        onSubmit={(event: E) => {
          event.preventDefault();
          props.onSubmit();
        }}
      >
        <div>{formElements}</div> {props.children}
        <Button disabled={!validForm}>{props.buttonTitle}</Button>
      </form>
    </div>
  );
};

export default FormStructure;
