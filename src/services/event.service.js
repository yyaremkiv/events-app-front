import API from "@/config/axios.api.js";

class EventService {
  static async getCity({ page = 1, limit = 5 }) {
    return API.get("/events/city", {
      params: { page, limit },
    });
  }

  static async addCity(formData) {
    return API.post("/events/city", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async updateCity(formData) {
    return API.patch("/events/city", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async deleteCity(cityId) {
    return API.delete(`/events/city/${cityId}`);
  }

  static async getEvent({ cityName, params }) {
    return API.get(`/events/event/${cityName}`, { params });
  }

  // static async getEvent({ cityName, page = 1, limit = 5 }) {
  //   return API.get(`/events/event/${cityName}`, {
  //     params: { page, limit },
  //   });
  // }

  static async addEvent(formData) {
    return API.post("/events/event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async updateEvent(formData) {
    return API.patch("/events/event", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async deleteEvent({ cityId, eventId }) {
    return API.delete(`/events/event/${cityId}/${eventId}`);
  }
}

export default EventService;
