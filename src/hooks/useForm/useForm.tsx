import * as React from "react";
import * as Types from "./useFormTypes";
import { validateInput, isFormDirty } from "./helperFunctions";

enum FORM_ACTIONS {
  CHANGE_FORM_VALUE = "CHANGE_FORM_VALUE",
  VALIDATE_ALL_INPUTS = "VALIDATE_ALL_INPUTS",
  DISABLE_BUTTON = "DISABLE_BUTTON",
  ENABLE_BUTTON = "ENABLE_BUTTON",
  RESET_FORM = "RESET_FORM"
}

export interface IFormBaseAction {
  type: FORM_ACTIONS;
}

interface IChangeFormValue extends IFormBaseAction {
  type: FORM_ACTIONS.CHANGE_FORM_VALUE;
  fieldName: string;
  value: string;
  validationRules: Types.ValidationRules;
}

interface IValidateAllInputs<T> extends IFormBaseAction {
  type: FORM_ACTIONS.VALIDATE_ALL_INPUTS;
  errorValues: T;
}

interface IDisableButton extends IFormBaseAction {
  type: FORM_ACTIONS.DISABLE_BUTTON;
}

interface IEnableButton extends IFormBaseAction {
  type: FORM_ACTIONS.ENABLE_BUTTON;
}

interface IResetForm<T> extends IFormBaseAction {
  type: FORM_ACTIONS.RESET_FORM;
  state: IFormState<T>;
}

type IFormActions<T> =
  | IChangeFormValue
  | IValidateAllInputs<T>
  | IDisableButton
  | IEnableButton
  | IResetForm<T>;

interface IFormState<T> {
  formValues: T;
  errorValues: T;
  isButtonDisabled: boolean;
}

const formReducer = <T extends {}>() => (
  state: IFormState<T>,
  action: IFormActions<T>
) => {
  switch (action.type) {
    case FORM_ACTIONS.CHANGE_FORM_VALUE: {
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.fieldName]: action.value
        },
        errorValues: {
          ...state.errorValues,
          [action.fieldName]: validateInput(
            action.validationRules,
            action.value
          )
        }
      };
    }
    case FORM_ACTIONS.VALIDATE_ALL_INPUTS: {
      return {
        ...state,
        errorValues: action.errorValues
      };
    }
    case FORM_ACTIONS.DISABLE_BUTTON: {
      return {
        ...state,
        isButtonDisabled: true
      };
    }
    case FORM_ACTIONS.ENABLE_BUTTON: {
      return {
        ...state,
        isButtonDisabled: false
      };
    }
    case FORM_ACTIONS.RESET_FORM: {
      return {
        ...action.state
      };
    }
    default:
      return state;
  }
};

const useForm = <T extends {}>(form: Types.UseFormParams<T>, forceToResetInitialValues: any[]) => {
  const firstUpdate = React.useRef(true);
  
  const initialState = {
    formValues: {
      ...form.initialValues
    },
    errorValues: {
      ...form.initialValues
    },
    isButtonDisabled: false
  };

  React.useEffect(() => {
    dispatch({ type: FORM_ACTIONS.RESET_FORM, state: initialState});
  }, forceToResetInitialValues);

  const [state, dispatch] = React.useReducer(formReducer<T>(), initialState);

  React.useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (isFormDirty(state.errorValues, form.validationRules)) {
      dispatch({ type: FORM_ACTIONS.DISABLE_BUTTON });
    } else {
      dispatch({ type: FORM_ACTIONS.ENABLE_BUTTON });
    }
  }, [state.errorValues, state.formValues]);

  const handleChangeFormValues = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputName = event.target.name;
    const value = event.target.value;
    const validationRulesOfCurrentInput = form.validationRules[inputName];
    
    dispatch({
      type: FORM_ACTIONS.CHANGE_FORM_VALUE,
      fieldName: inputName,
      value,
      validationRules: validationRulesOfCurrentInput
    });
  };

  const validateAllInputs = React.useCallback(() => {
    const validatedInputs = Object.keys(state.formValues).reduce(
      (prev: T, curr: string) => {
        return {
          ...prev,
          [curr]: validateInput(
            form.validationRules[curr],
            state.formValues[curr]
          )
        };
      },
      { ...state.errorValues }
    );

    dispatch({
      type: FORM_ACTIONS.VALIDATE_ALL_INPUTS,
      errorValues: validatedInputs
    });
  }, [state.formValues]);

  const onButtonClick = (callback: Function) => () => {
    validateAllInputs();

    if (!isFormDirty(state.errorValues, state.formValues)) {
      callback();
    }
  };

  return {
    formValues: state.formValues,
    errorValues: state.errorValues,
    handleChangeFormValues,
    onButtonClick,
    isButtonDisabled: state.isButtonDisabled
  };
};

export default useForm;
