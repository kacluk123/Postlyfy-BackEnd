export interface UISignupFormData{
    formEmail: string;
    formName: string;
    formPassword: string;
    formUserPicture?: string;
}

export interface IServerSignupFormData {
    email: string;
    name: string;
    password: string;
    userPicture?: string;
}