import API from "../config/axios.api.js";

interface IParamsRequest {
  page: number;
  limit: number;
}

export class EventService {
  static async getCitiesToHomePage() {
    return API.get("/events/cities");
  }

  static async getCities({ page, limit }: IParamsRequest) {
    return API.get("/events/cities/list", { params: { page, limit } });
  }

  static async addCity(formData: any) {
    return API.post("/events/city", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async updateCity(formData: any) {
    return API.patch("/events/city", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async deleteCity(cityId: string) {
    return API.delete(`/events/city/${cityId}`);
  }

  static async addEvent(formData: any) {
    return API.post("/events/event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async getEvent({ cityName, params }: any) {
    return API.get(`/events/event/${cityName}`, { params });
  }

  static async updateEvent(formData: any) {
    return API.patch("/events/event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async deleteEvent({ cityId, eventId }: any) {
    return API.delete(`/events/event/${cityId}/${eventId}`);
  }

  static async getCity({ page = 1, limit = 5 }) {
    return API.get("/events/city", { params: { page, limit } });
  }
}
