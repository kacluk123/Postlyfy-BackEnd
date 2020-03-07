import { UILoginFormData, serverLoginFormData } from './loginTypes'

export const packLoginFormData = (payload: UILoginFormData): serverLoginFormData => {
    return {
        name: payload.formName,
        password: payload.formPassword
    }
}