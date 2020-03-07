import { mainApi } from "../../../axios-instances";
import { packLoginFormData } from "./loginMapper";
import { UILoginFormData } from "./loginTypes";
import {
  serverMessageUnpacker,
  ServerMessagesResponse
} from "../../common/errorDataUnpacker";

const createUserUrl = "/login";

export const login = async (payload: UILoginFormData) => {
  try {
    const { data } = await mainApi.post<ServerMessagesResponse>(
      createUserUrl,
      packLoginFormData(payload),
      { withCredentials: true }
    );

    return data;
  } catch (err) {
    return serverMessageUnpacker(err.response.data);
  }
};
