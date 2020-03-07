import * as React from "react";
import * as Styled from "./LoginStyles";
import StandardInput from "../../Common/StandardInput/StandardInput";
import Button from "../../Common/Button";
import useForm from "../../../hooks/useForm";
import * as API from "../../../api/endpoints/auth/login/login";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { fetchUser } from '../../../redux/async/fetchUser';
import ServerMessageViewComponent from "../../Common/ServerMessageView";
import { UIServerMessages } from "../../../api/endpoints/common/errorDataUnpacker";
import { isApiResonseHasError } from '../../../api/endpoints/common/errorDataUnpacker';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [apiResponseMessage, setApiResponseMessage] = React.useState<
    UIServerMessages
  >({
    isError: false,
    messages: []
  });
  const [buttonPending, setButtonPending] = React.useState<boolean>(false);

  const {
    formValues,
    handleChangeFormValues,
    errorValues,
    onButtonClick,
    isButtonDisabled
  } = useForm({
    initialValues: {
      formPassword: "",
      formName: ""
    },
    validationRules: {
      formPassword: {
        required: true,
        minLength: 6
      },
      formName: {
        required: true,
        minLength: 6
      }
    }
  }, []);

  const handleButtonClick = async () => {
    setButtonPending(true);
    const data = await API.login(formValues);
    if (isApiResonseHasError(data)) {
      dispatch(fetchUser());
      history.push('/taglist');
    } else {
      setButtonPending(false);
      setApiResponseMessage(data);
    }
  };

  return (
    <Styled.LoginContainer>
      <Styled.Login>
        <StandardInput
          name="formName"
          label="Name"
          value={formValues.formName}
          errorMessage={errorValues.formName}
          onChange={handleChangeFormValues}
        />
        <StandardInput
          name="formPassword"
          label="Password"
          type="password"
          value={formValues.formPassword}
          errorMessage={errorValues.formPassword}
          onChange={handleChangeFormValues}
        />
        <Button
          onClick={onButtonClick(handleButtonClick)}
          disabled={isButtonDisabled}
          isPending={buttonPending}
        >
          LOGIN
        </Button>
        <Styled.LoginServerMessages>
        <ServerMessageViewComponent
          isError={apiResponseMessage.isError}
          messages={apiResponseMessage.messages}
        />
        </Styled.LoginServerMessages>
      </Styled.Login>
    </Styled.LoginContainer>
  );
};

export default Login;
