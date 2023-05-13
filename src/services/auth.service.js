import API from "@/http";

class AuthService {
  static async login({ email, password }) {
    return API.post("/auth/login", { email, password });
  }
}

export default AuthService;
