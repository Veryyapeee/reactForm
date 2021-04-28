import React, { FunctionComponent } from "react";

import styles from "./input.module.scss";

interface Props {
  type: string;
  inputType: string;
  inputValue: string;
  inputName: string;
  inputSelectName?: string;
  placeholder: string;
  label: string;
  validity: boolean;
  touched: boolean;
  state?: any;
  errorMessage?: string;
  onChangeInput: any;
}

const input: FunctionComponent<Props> = (props) => {
  let inputClasses: string[] = [styles.inputContainer];
  if (!props.validity && props.touched) {
    inputClasses = [styles.inputContainer, styles.invalidInput];
  }

  let selectOptions = [];
  if (props.inputType === "select") {
    for (let key in props.state[props.inputName].options) {
      selectOptions.push(props.state[props.inputName].options[key]);
    }
  }

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
              name={props.inputSelectName}
              value={props.inputValue}
              onChange={props.onChangeInput}
              className={styles.select}
            >
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
