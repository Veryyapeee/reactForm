import React from "react";
import FormStructure from "containers/form/form";

import useForm from "Hooks/useForm";

import { InputType } from "./utils/enums";

function App() {
  const [form, setForm, data] = useForm({
    email: {
      val: "",
      type: InputType.TEXT,
      inputType: InputType.INPUT,
      placeholder: "E-mail",
      label: "E-mail",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 50,
        emailComplexity: true,
      },
      touched: false,
      valid: false,
    },
    file: {
      val: [],
      type: InputType.FILE,
      inputType: InputType.INPUT,
      touched: false,
      validation: {
        required: true,
        fileCount: 2,
      },
      valid: false,
      multiple: true,
    },
    password: {
      val: "",
      type: InputType.PASSWORD,
      inputType: InputType.INPUT,
      placeholder: "********",
      label: "Password",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 50,
        refToMatch: "confirmPassword",
        passwordComplexity: true,
      },
      touched: false,
      valid: false,
    },
    confirmPassword: {
      val: "",
      type: InputType.PASSWORD,
      inputType: InputType.INPUT,
      placeholder: "********",
      label: "ConfirmPassword",
      validation: {
        required: true,
        minLength: 8,
        maxLength: 50,
        refToMatch: "password",
        passwordComplexity: true,
      },
      touched: false,
      valid: false,
    },
    costam: {
      val: "xD",
      inputType: InputType.SELECT,
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
      inputType: InputType.SELECT,
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
        onSubmit={test}
      />
      {/* The way to handle files */}
      {/* {data.file.length > 0 && (
        <img src={URL.createObjectURL(data.file[0])} alt="xd" />
      )} */}
    </span>
  );
}

export default App;
