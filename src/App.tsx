import React, { useState } from "react";
import FormStructure from "containers/form/form";

function App() {
  const [form, setForm] = useState({
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
  return (
    <span>
      Hello word!
      <FormStructure
        state={form}
        setState={setForm}
        btnText="SIGN UP"
        title="Sign Up"
        submitted={() => console.log("test")}
      />
    </span>
  );
}

export default App;
