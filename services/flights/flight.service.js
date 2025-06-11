const FlightRepository = require("../../repositories/flights/flight.repository");

class FlightService {
  async getAllFlights() {
    const flights = await FlightRepository.getAllFlights();
    return flights || [];
  }

  async getFlightById(id) {
    try {
      const flight = await FlightRepository.getFlightById(id);
      return flight || [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createFlight(flightData) {
    try {
      const requiredFields = ["airline", "flight_number", "departure_airport", "arrival_airport", "departure_time", "arrival_time"];

      if (!requiredFields.every(field => flightData[field])) {
        throw new Error("Semua field wajib diisi"); // Validasi input
      }

      return await FlightRepository.createFlight(flightData);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateFlight(id, flightData) {
    try {
      const flight = await FlightRepository.getFlightById(id);
      if (!flight) {
        throw new Error("Flight not found");
      }
      await FlightRepository.updateFlight(id, flightData);
      return { message: "Flight updated successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteFlight(id) {
    try {
      const flight = await FlightRepository.getFlightById(id);
      if (!flight) {
        throw new Error("Flight not found");
      }
      await FlightRepository.deleteFlight(id);
      return { message: "Flight deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new FlightService();