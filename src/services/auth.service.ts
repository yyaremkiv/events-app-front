import API from "../config/axios.api.js";
import { AxiosResponse } from "axios";
import { ISignupArg, ISigninArg } from "../interfaces";

interface IAuthResponse {
  data: any;
}

export class AuthService {
  static async signup(request: ISignupArg): Promise<IAuthResponse> {
    const { username, email, password } = request;
    return API.post<IAuthResponse>("/auth/signup", {
      username,
      email,
      password,
    });
  }

  static async signin(request: ISigninArg): Promise<IAuthResponse> {
    const { email, password } = request;
    return API.post("/auth/signin", { email, password });
  }

  static async logout(): Promise<AxiosResponse<void>> {
    return API.get<void>("/auth/logout");
  }

  static async refresh(): Promise<IAuthResponse> {
    return API.get<IAuthResponse>("/auth/refresh", { withCredentials: true });
  }
}
