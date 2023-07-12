import API from "../config/axios.api.js";
import { AxiosResponse } from "axios";
import { ISigninProps, IAuthDataResponse } from "../interfaces";

export class AuthService {
  static async signin(
    request: ISigninProps
  ): Promise<AxiosResponse<IAuthDataResponse>> {
    const { email, password } = request;
    return API.post("/auth/signin", { email, password });
  }

  static async logout(): Promise<AxiosResponse<void>> {
    return API.get("/auth/logout");
  }

  static async refresh(): Promise<AxiosResponse<IAuthDataResponse>> {
    return API.get("/auth/refresh", { withCredentials: true });
  }
}
