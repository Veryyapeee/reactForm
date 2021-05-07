import { InputType } from './enums';

// Objects in custom Hook

// Input type text
export interface ValidationInputText {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    emailComplexity?: boolean;
    passwordComplexity?: boolean;
    refToMatch?: string;
}

export interface InputText {
    val: string;
    type: InputType;
    inputType: InputType.INPUT;
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
    type: InputType;
    inputType: InputType.INPUT;
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
    inputType: InputType.TEXTAREA;
    placeholder: string;
    label: string;
    touched: boolean;
    valid: boolean;
    errorMessage?: string;
    validation?: ValidationTextarea;
}


// File interface - upgrade every interface to make it works good

export interface ValidationFile {
    fileCount?: number,
    maxSize?: number,
    fileTypes?: string[],
}
export interface FileForm {
    val: File[] | [];
    type: InputType;
    inputType: InputType.INPUT;
    touched: boolean;
    valid: boolean;
    multiple?: true;
    errorMessage?: string;
    validation?: ValidationFile;
}

// Select

export interface SelectValidation {
    required: boolean;
}
export interface SelectOption {
    name: string;
    val: string;
}

export interface SelectOptionName {
    [name: string]: SelectOption;
}

export interface Select {
    val: string;
    inputType: InputType.SELECT;
    label: string;
    valid: boolean;
    options: SelectOptionName;
    validation?: SelectValidation;
    errorMessage?: string;
}

// Form interface - fix index signatures
export interface Form {
    [input: string]: Select | InputText | InputDate | Textarea | FileForm | any;
}

// Data from form in object
export interface FormData {
    [input: string]: string | File[];
}