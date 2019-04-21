import axios from "axios";

const url = "api/stations";

class StationService {
  // Get Stations
  static getStation() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(data);
      } catch (error) {
        reject(err);
      }
    });
  }
  // Create Station
  static insertStation(schoolId, name) {
    return axios.post(url, {
      schoolId,
      name
    });
  }
  // Delete Station
  static deleteStation(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default StationService;
