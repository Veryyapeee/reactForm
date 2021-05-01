import React from "react";
import FormStructure from "containers/form/form";

import useForm from "Hooks/useForm";

import * as types from "./utils/enums";

function App() {
  const [form, setForm, data] = useForm({
    email: {
      val: "",
      type: types.TYPE.TEXT,
      inputType: types.INPUT.INPUT,
      placeholder: "E-mail",
      label: "E-mail",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 50,
      },
      touched: false,
      valid: false,
    },
    password: {
      val: "",
      type: types.TYPE.PASSWORD,
      inputType: types.INPUT.INPUT,
      placeholder: "********",
      label: "Password",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 50,
      },
      touched: false,
      valid: false,
    },
    formValid: false,
  });

  const test = () => {
    console.log(data);
  };
  return (
    <span>
      Hello word!
      <FormStructure
        state={form}
        setState={setForm}
        btnText="SIGN UP"
        title="Sign Up"
        submitted={test}
      />
    </span>
  );
}

export default App;
