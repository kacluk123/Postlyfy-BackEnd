import { mainApi } from "../../../axios-instances";

const logoutUrl = '/logout';

export const logout = async () => {
  await mainApi.get(logoutUrl, {
    withCredentials: true
  });
};
