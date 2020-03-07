export interface FormErrorCreatorParams {
  errorMessage: string;
  isValid: boolean;
}

export interface FormErrorCreatorOutput extends FormErrorCreatorParams {}

export interface ValidationRules {
  required?: boolean;
  email?: boolean;
  minLength?: number;
}

export interface CheckValidationOfInputParams {
  value: string;
  validationRules: ValidationRules;
  name: string;
}

export interface InitialValues {
  [k: string]: string;
}

export interface UseFormParams<T> {
  initialValues: T;
  validationRules: {
    [k: string]: ValidationRules;
  };
}

export interface ErrorValues {
  [k: string]: string;
}
