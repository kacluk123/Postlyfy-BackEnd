import { UISignupFormData, IServerSignupFormData } from './signupTypes';

export const packSignupFormData = (payload: UISignupFormData): IServerSignupFormData => {
    return {
        name: payload.formName,
        email: payload.formEmail,
        password: payload.formPassword,
        userPicture: payload.formUserPicture
    };
};