import React, { useState, useEffect } from "react";

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
  const [state, setState] = useState(props.config);

  useEffect(() => {
    setState(props.config);
  }, [props.config, state]);

  // Get input config
  let key: typeof state;
  let elements: any = [];
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
    inputType: typeof state
  ) => {
    setValidForm(onChangeForm(event, inputType, state, props.setConfig));
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
