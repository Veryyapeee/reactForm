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
    costam: {
      val: "xD",
      inputType: types.SELECT.SELECT,
      label: "whatever",
      valid: true,
      options: {
        option1: {
          name: "xD",
          val: "xD",
        },
        option2: {
          name: "lol",
          val: "lol",
        },
      },
    },
    costam2: {
      val: "xD2",
      valid: true,
      inputType: types.SELECT.SELECT,
      label: "whatever",
      options: {
        option1: {
          name: "xD2",
          val: "xD2",
        },
        option2: {
          name: "lol2",
          val: "lol2",
        },
      },
    },
  });

  const test = () => {
    console.log(data);
  };
  return (
    <span>
      Hello word!
      <FormStructure
        config={form}
        setConfig={setForm}
        buttonTitle="SIGN UP"
        formTitle="Sign Up"
        onSubmit={test}
      />
    </span>
  );
}

export default App;
