import * as React from "react";
import * as Styled from "./RegisterStyles";
import StandardInput from "../../Common/StandardInput/StandardInput";
import Button from "../../Common/Button";
import ServerMessageViewComponent from "../../Common/ServerMessageView";
import { UIServerMessages } from "../../../api/endpoints/common/errorDataUnpacker";
import useForm from "../../../hooks/useForm";
import * as API from "../../../api/endpoints/auth/signup/signup";
import { IRegisterFormTypes } from "./RegisterTypes";

const RegisterComponent = () => {
  const {
    formValues,
    handleChangeFormValues,
    errorValues,
    onButtonClick,
    isButtonDisabled
  } = useForm<IRegisterFormTypes>({
    initialValues: {
      formEmail: "",
      formPassword: "",
      formName: "",
      formUserPicture: "",
    },
    validationRules: {
      formEmail: {
        required: true,
        email: true
      },
      formPassword: {
        required: true,
        minLength: 6
      },
      formName: {
        required: true,
        minLength: 6
      },
      formUserPicture: {
        required: false,
      }
    }
  }, []);

  const [apiResponseMessage, setApiResponseMessage] = React.useState<
    UIServerMessages
  >({
    isError: false,
    messages: []
  });

  const [buttonPending, setButtonPending] = React.useState<boolean>(false);

  const createUserOnButtonClick = async () => {
    setButtonPending(true);

    const response = await API.createUser(formValues);

    setApiResponseMessage(response);
    setButtonPending(false);
  };

  return (
    <Styled.RegisterContainer>
      <Styled.Register>
        <StandardInput
          value={formValues.formName}
          errorMessage={errorValues.formName}
          name="formName"
          onChange={handleChangeFormValues}
          label="Name"
        />
        <StandardInput
          value={formValues.formEmail}
          errorMessage={errorValues.formEmail}
          name="formEmail"
          onChange={handleChangeFormValues}
          label="Email"
        />
        <StandardInput
          value={formValues.formPassword}
          errorMessage={errorValues.formPassword}
          name="formPassword"
          type="password"
          onChange={handleChangeFormValues}
          label="Password"
        />
        <StandardInput
          value={formValues.formUserPicture}
          errorMessage={errorValues.formUserPicture}
          name="formUserPicture"
          type="text"
          onChange={handleChangeFormValues}
          label="Avatar url"
        />
        <Button
          disabled={isButtonDisabled}
          onClick={onButtonClick(createUserOnButtonClick)}
          isPending={buttonPending}
        >
          Register
        </Button>
        <Styled.RegisterServerMessages>
          <ServerMessageViewComponent
            isError={apiResponseMessage.isError}
            messages={apiResponseMessage.messages}
          />
        </Styled.RegisterServerMessages>
      </Styled.Register>
    </Styled.RegisterContainer>
  );
};

export default RegisterComponent;
