import * as React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import { BrowserRouter } from "react-router-dom";
import App from '../../App';
import GlobalStyles from '../../../globalStyles';
import { login } from '../../../api/endpoints/auth/login/login';
import { fetchUser } from '../../../redux/async/fetchUser';
// import { isApiResonseHasError } from '../../../api/endpoints/common/errorDataUnpacker';

import {
  getUser,
  getUserError
} from "../../../redux/actions/userActions";
  jest.mock('../../../api/endpoints/tags/tags', () => {
    return {
      getTags: jest.fn(() => Promise.resolve({
        tags: [{
          tagName: 'hello',
          count: 2
        }],
        isError: false
      }))
    };
  });  

  jest.mock('../../../api/endpoints/auth/login/login', () => {
    return {
      login: jest.fn()
    };
  });

  jest.mock('../../../redux/async/fetchUser', () => {
    return {
      fetchUser: jest.fn()
    };
  });

  let name: HTMLInputElement;
  let password: HTMLInputElement;
  let submitButton: HTMLElement;
  let getByTextLogin: any;
  const leftClick = { button: 0 };
  const fakeLogin = {
    formName: 'test_user',
    formPassword: 'test_password',
  };
  
  beforeEach(async () => {
    (fetchUser as jest.Mock).mockImplementation(() => {
      return getUserError({
        isError: true,
        messages: ['Error']
      });
    });
    const { container, getByText, getByTestId } = render(
        <Provider store={store}>
          <GlobalStyles />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );
      getByTextLogin = getByText;

      await wait(() => {
        getByTestId('loginPage');
      });
      
      const loginNabButton = getByTestId('loginPage');
  
      fireEvent.click(loginNabButton, leftClick);

      const nameInput = container.querySelectorAll('input')[0];
      const passwordInput = container.querySelectorAll('input')[1];
      const submitButtonElement = getByText('LOGIN');
      name = nameInput;
      password = passwordInput;
      submitButton = submitButtonElement;

      fireEvent.change(name, { target: { value: fakeLogin.formName } });
      fireEvent.change(password, { target: { value: fakeLogin.formPassword } });
  });

  it('Test correct login', async () => {
    (login as jest.Mock).mockImplementation(() => (Promise.resolve({
      messages: ["Correctly logged"],
      isError: false
    })));

    expect(window.location.href).toContain('/login');
    expect(name.value).toBe('test_user');
    expect(password.value).toBe('test_password');

    fireEvent.click(submitButton, leftClick);
    
    (fetchUser as jest.Mock).mockImplementation(() => {
      return getUser({
        isError: false,
        user: {
          id: 'test',
          name: 'testUser',
          email: 'testuser@gmail.com',
          userPicture: null,
        },
      });
    });

    await wait(() => {
      expect(window.location.href).toContain('/taglist');
    });
    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith(fakeLogin);
    expect(getByTextLogin('testUser')).toBeTruthy();
  });

  it('Test failed login', async () => {
    (login as jest.Mock).mockImplementation(() => (Promise.resolve({
      messages: ["Password is not correct"],
      isError: true
    })));

    fireEvent.click(submitButton, leftClick);

    await wait(() => {
      expect(getByTextLogin("Password is not correct")).toBeInTheDocument();
    });
    expect(window.location.href).toContain('/login');
});
