import { Dispatch, SetStateAction } from "react";
import { Form, FileForm } from "utils/types";
import { validation, fileValidation, wholeFormValidity } from './validation';
import { mutateState } from './mutate';

/* Main onChange action creator
    @param {e} - event target
    @param {inputType} - type of the input which represents key in an object
    @param {state} - state
    @param {checkPass} - boolean value to pass if we have to check if passwords are matching
*/
const OnChangeForm = (e: { target: HTMLInputElement }, inputType: string, state: Form, setState: Dispatch<SetStateAction<Form>>): boolean => {

    // If we add file we have to make an array on change - later add touch and valid to this
    const input = state[inputType] as FileForm;
    if (input.type === 'file') {
        const updated = {
            ...state,
            [inputType]: {
                ...input,
                val: Array.from(e.target.files!),
                touched: true,
                valid: fileValidation(state[inputType].validation, Array.from(e.target.files!))
            }

        };
        setState(updated);
        return wholeFormValidity(updated);
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

export default OnChangeForm;