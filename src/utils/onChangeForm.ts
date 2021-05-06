import { Dispatch, SetStateAction } from "react";
import { Form, FormData, InputText, File } from "utils/types";
interface Rules {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minDate?: Date;
    emailComplexity?: boolean;
    passwordComplexity?: boolean;
}

/* Input data validation 
  @param {value} - input value
  @param {rules} - object with validation rules
*/
export const validation = (value: string, rules?: Rules) => {
    let isValid: boolean | null = true;
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

    if (rules.passwordComplexity) {
        isValid = value.match(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/) && isValid;
    }

    if (rules.emailComplexity) {
        isValid = value.match(/\S+@\S+\.\S+/) && isValid;
    }

    return isValid === null ? false : isValid;
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
  @param {valid} - value which represents validity of current input
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
            return {
                ...stateCopy,
                [inputType]: {
                    ...stateCopy[inputType],
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

    // If we add file we have to make an array on change - later add touch and valid to this
    const input = state[inputType] as File;
    if (input.type === 'file') {
        setState({
            ...state,
            [inputType]: {
                ...input,
                val: Array.from(e.target.files!)
            }

        })
        return false;
    }

    // Make state copy with new value
    const stateCopy = {
        ...state, [inputType]: {
            ...state[inputType],
            val: e.target.value
        }
    };

    // Run validation and update functions
    const valid: boolean = validation(e.target.value, stateCopy[inputType].validation);
    const updatedFields: Form = mutateState(e.target.value, inputType, stateCopy, valid);
    const validForm: boolean = wholeFormValidity(updatedFields);

    // Set new state
    setState(updatedFields);

    // Return state of form validity
    return validForm;
}


// Mutate form data to object: val format
export const mutateFormData = (state: Form) => {
    const formData: FormData = {};
    let key: keyof typeof state;
    for (key in state) {
        formData[key] = state[key].val;
    }
    return formData;
}

export default OnChangeForm;