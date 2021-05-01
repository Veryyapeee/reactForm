import React from "react";

import styles from "./input.module.scss";

import { Form } from "utils/types";
interface Props {
  type: string;
  inputType: string;
  inputValue: string;
  inputName: string;
  placeholder: string;
  label: string;
  validity: boolean;
  touched: boolean;
  stateMain: Form;
  onChangeInput: () => void;
  errorMessage?: string;
}

const input: React.FC<Props> = (props) => {
  // Mutate input classes if field is invalid
  let inputClasses: string[] = [styles.inputContainer];
  if (!props.validity && props.touched) {
    inputClasses = [styles.inputContainer, styles.invalidInput];
  }

  // Setup select options
  let selectOptions = [];
  if (props.inputType === "select") {
    for (let key in props.stateMain[props.inputName].options) {
      selectOptions.push(props.stateMain[props.inputName].options[key]);
    }
  }

  // Generate input
  let input;
  switch (props.inputType) {
    case "input":
      input = (
        <div className={styles.container}>
          <span className={styles.label}>{props.label}</span>
          <label className={inputClasses.join(" ")}>
            <input
              className={styles.input}
              type={props.type}
              placeholder={props.placeholder}
              value={props.inputValue}
              onChange={props.onChangeInput}
            />
          </label>
        </div>
      );
      break;
    case "textarea":
      input = (
        <div className={styles.container}>
          <span className={styles.label}>{props.label}</span>
          <label className={inputClasses.join(" ")}>
            <textarea
              className={[styles.input, styles.textarea].join(" ")}
              placeholder={props.placeholder}
              value={props.inputValue}
              onChange={props.onChangeInput}
            />
          </label>
        </div>
      );
      break;
    case "select":
      input = (
        <div className={styles.container}>
          <span className={styles.label}>{props.label}</span>
          <label className={inputClasses.join(" ")}>
            <select
              value={props.inputValue}
              onChange={props.onChangeInput}
              className={styles.select}
            >
              <option value="" selected disabled hidden>
                Choose
              </option>
              {selectOptions.map((option) => {
                return (
                  <option value={option.val} key={option.val}>
                    {option.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
      );
      break;
  }

  return <>{input}</>;
};

export default input;
