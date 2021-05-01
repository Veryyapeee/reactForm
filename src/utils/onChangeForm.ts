import { Dispatch, SetStateAction } from "react";
import { Form, FormData, InputText } from "utils/types";
interface Rules {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minDate?: Date;
    validEmail?: boolean;
    validPassword?: boolean;
    refToCheckMatch?: string;
}

/* Input data validation 
  @param {value} - input value
  @param {rules} - object with validation rules
*/
export const validation = (value: string, rules?: Rules) => {
    let isValid: boolean = true;
    if (!rules) {
        return true;
    }
    if (rules.required) {
        isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
        isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.trim().length <= rules.maxLength && isValid;
    }

    if (rules.minDate) {
        isValid = new Date(value) >= rules.minDate && isValid;
    }

    return isValid;
};

/* Check if every input is valid
  @param {fields} - object with all form fields
*/
export const wholeFormValidity = (fields: Form) => {
    let key: keyof typeof fields;
    for (key in fields) {
        if (fields[key].valid === false) {
            return false;
        }
    }
    return true;
};

/* Mutate state
  @param {value} - input current value
  @param {inputType} - type of input which is object key in state
  @params {stateCopy} - state
  @param {valid} - value which represents validity of whole form
*/
export const mutateState = (
    value: string,
    inputType: string,
    stateCopy: Form,
    valid: boolean,
) => {
    console.log(value);
    const stateText = stateCopy[inputType] as InputText;
    if (stateText.validation!.refToCheckMatch) {
        const stateSecond = stateCopy[stateText.validation!.refToCheckMatch] as InputText;
        if (stateText.val !== stateSecond.val) {
            return {
                ...stateCopy,
                [inputType]: {
                    ...stateText,
                    val: value,
                    valid: false,
                    touched: value !== "",
                },
                [stateText.validation!.refToCheckMatch]: {
                    ...stateSecond,
                    valid: false,
                    touched: value !== "",
                }
            }
        } else {
            return {
                ...stateCopy,
                [inputType]: {
                    ...stateText,
                    val: value,
                    valid: true,
                    touched: value !== "",
                },
                [stateText.validation!.refToCheckMatch]: {
                    ...stateSecond,
                    valid: true,
                    touched: value !== "",
                }
            }
        }
    }

    return {
        ...stateCopy,
        [inputType]: {
            ...stateCopy[inputType],
            val: value,
            valid: valid,
            touched: value !== "",
        },
    };
};


/* Main onChange action creator
    @param {e} - event target
    @param {inputType} - type of the input which represents key in an object
    @param {state} - state
    @param {checkPass} - boolean value to pass if we have to check if passwords are matching
*/
const onChangeForm = (e: { target: HTMLInputElement }, inputType: string, state: Form, setState: Dispatch<SetStateAction<Form>>): boolean => {

    const stateCopy = { ...state };
    const inputField = {
        ...stateCopy[inputType]
    }

    const valid: boolean = validation(e.target.value, inputField.validation);
    const updatedFields: Form = mutateState(e.target.value, inputType, stateCopy, valid);
    const validForm: boolean = wholeFormValidity(updatedFields);

    setState((prevState: Form) => {
        return {
            ...prevState,
            ...updatedFields,
        }
    })
    console.log(state);
    return validForm;
}


export const mutateToAxios = (state: Form) => {
    const formData: FormData = {};
    let key: keyof typeof state;
    for (key in state) {
        formData[key] = state[key].val;
    }
    return formData;
}

export default onChangeForm;