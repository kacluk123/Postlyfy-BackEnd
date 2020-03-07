import * as Types from "./useFormTypes";
import { validateEmail } from "./regex";

export const validateInput = (
  validationRules: Types.ValidationRules,
  value: string
) => {
  if (validationRules.email) {
    if (!validateEmail(value)) {
      return "Must be an Email";
    }
  }

  if (validationRules.minLength) {
    const inputValueIsToShort = validationRules.minLength > value.length;

    if (inputValueIsToShort) {
      return `Must be at least ${validationRules.minLength} characters long`;
    }
  }

  return;
};

export const isFormDirty = (errorObject: Types.ErrorValues, validationRules: {[k: string]: Types.ValidationRules }): boolean => {
  return Object.entries(errorObject).some(([errorKey, errorValue]) => {
    const isFormValueRequired = validationRules[errorKey].required;
    return errorValue !== undefined && isFormValueRequired;
  });
};
