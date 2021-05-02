import { Dispatch, SetStateAction } from "react";
import { Form, FormData, InputText } from "utils/types";
interface Rules {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minDate?: Date;
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
    validity: boolean,
) => {

    const state = stateCopy[inputType] as InputText;
    if (state.validation) {
        if (state.validation.refToMatch) {
            const secondState = stateCopy[state.validation!.refToMatch];
            console.log(state.val === secondState.val && validity);
            return {
                ...stateCopy,
                [inputType]: {
                    ...stateCopy[inputType],
                    val: value,
                    valid: state.val === secondState.val && validity,
                    touched: value !== '',
                },
                [state.validation!.refToMatch]: {
                    ...stateCopy[state.validation!.refToMatch],
                    valid: state.val === secondState.val && validity,
                }
            }
        }
    }

    return {
        ...stateCopy,
        [inputType]: {
            ...stateCopy[inputType],
            val: value,
            valid: validity,
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
const OnChangeForm = (e: { target: HTMLInputElement }, inputType: string, state: Form, setState: Dispatch<SetStateAction<Form>>): boolean => {
    /* console.log(state); */
    const stateCopy = {
        ...state, [inputType]: {
            ...state[inputType],
            val: e.target.value
        }
    };
    const inputField = {
        ...stateCopy[inputType]
    }

    const valid: boolean = validation(e.target.value, inputField.validation);
    const updatedFields: Form = mutateState(e.target.value, inputType, stateCopy, valid);
    const validForm: boolean = wholeFormValidity(updatedFields);

    setState((prevState: any) => {
        return {
            ...prevState,
            ...updatedFields
        }
    });

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

export default OnChangeForm;