import { Form, InputText, FormData } from "utils/types";

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

// Mutate form data to object: val format
export const mutateFormData = (state: Form) => {
    const formData: FormData = {};
    let key: keyof typeof state;
    for (key in state) {
        formData[key] = state[key].val;
    }
    return formData;
}
