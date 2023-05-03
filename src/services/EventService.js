import API from "@/http";

class EventService {
  static async getCity() {
    return API.get("/events/city");
  }

  static async addCity(formData) {
    return API.post("/events/city", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  static async deleteCity(cityId) {
    return API.delete(`/events/city/${cityId}`);
  }

  static async getEvent(id) {
    return API.get(`/events/event/${id}`);
  }

  static async addEvent(event) {
    return API.post("/events/event", event);
  }
}

export default EventService;
