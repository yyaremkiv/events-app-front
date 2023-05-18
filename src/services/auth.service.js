import API from "@/config/axios.api.js";

class AuthService {
  static async signup({ username, email, password }) {
    return API.post("/auth/signup", { username, email, password });
  }

  static async signin({ email, password }) {
    return API.post("/auth/signin", { email, password });
  }

  static async logout() {
    return API.get("/auth/logout");
  }

  static async refresh() {
    return API.get("/auth/refresh", { withCredentials: true });
  }
}

export default AuthService;
