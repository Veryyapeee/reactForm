import React, { useState } from "react";
import FormStructure from "containers/form/form";

import useForm from "Hooks/useForm";

function App() {
  const [form, setForm, data] = useForm({
    email: {
      val: "",
      type: "email",
      inputType: "input",
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
      type: "password",
      inputType: "input",
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

  const dupa = (e: any) => {
    e.preventDefault();
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
        submitted={dupa}
      />
    </span>
  );
}

export default App;
