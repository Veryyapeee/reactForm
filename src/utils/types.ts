import * as type from './enums';

// Objects in custom Hook

// Input type text
export interface ValidationInputText {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    validEmail?: boolean;
    validPassword?: boolean;
    checkPasswordMatch?: boolean
}

export interface InputText {
    val: string;
    type: type.TYPE;
    inputType: type.INPUT;
    placeholder: string;
    label: string;
    touched: boolean;
    valid: boolean;
    errorMessage?: string;
    validation?: ValidationInputText;
}

// Input type date
export interface ValidationInputDate {
    required?: boolean;
    minDate?: Date;
    maxDate?: Date;
}

export interface InputDate {
    val: string;
    type: type.TYPEDATE;
    inputType: type.INPUT;
    placeholder: string;
    label: string;
    touched: boolean;
    valid: boolean;
    errorMessage?: string;
    validation?: ValidationInputDate;
}

// Textarea
export interface ValidationTextarea {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
}

export interface Textarea {
    val: string;
    inputType: type.TEXTAREA;
    placeholder: string;
    label: string;
    touched: boolean;
    valid: boolean;
    errorMessage?: string;
    validation?: ValidationTextarea;
}

// Select

export interface SelectValidation {
    required: boolean;
}
export interface SelectOption {
    optionVal: string;
    optionName: string;
}

export interface SelectOptionName {
    name: SelectOption;
}

export interface Select {
    val: string;
    inputType: type.SELECT;
    label: string;
    valid: boolean;
    validation: SelectValidation;
    errorMessage?: string;
    options: SelectOptionName[];
}

// Form interface - fix index signatures
export type Form = { formValid: boolean } & { [input: string]: InputText | Select | InputDate | Textarea | any }

// Data from form in object
export interface FormData {
    [input: string]: { val: string }
}