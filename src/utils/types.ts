// Objects in custom Hook

// Input type text
export interface ValidationInputText {
    required: boolean;
    minLength: number;
    maxLength: number;
}

export interface InputText {
    val: string;
    type: string;
    inputType: string;
    placeholder: string;
    label: string;
    touched: boolean;
    valid: boolean;
    errorMessage: string;
    validation: ValidationInputText;
}

// Input type email
export interface ValidationInputEmail {
    required: boolean;
    minLength: number;
    maxLength: number;
    validEmail: boolean;
}

export interface InputEmail {
    val: string;
    type: string;
    inputType: string;
    placeholder: string;
    label: string;
    touched: boolean;
    valid: boolean;
    errorMessage: string;
    validation: ValidationInputEmail;
}

// Input type date
export interface ValidationInputDate {
    required: boolean;
    minDate: Date;
}

export interface InputDate {
    val: string;
    type: string;
    inputType: string;
    placeholder: string;
    label: string;
    touched: boolean;
    valid: boolean;
    errorMessage: string;
    validation: ValidationInputDate;
}

// Textarea
export interface ValidationTextarea {
    required: boolean;
    minLength: number;
    maxLength: number;
}

export interface Textarea {
    val: string;
    type: string;
    placeholder: string;
    label: string;
    touched: boolean;
    valid: boolean;
    errorMessage: string;
    validation: ValidationTextarea;
}

// Select
export interface ValidationSelect {
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
    inputType: string;
    label: string;
    validation: ValidationSelect;
    touched: boolean;
    valid: boolean;
    errorMessage: string;
    options: SelectOptionName[];
}