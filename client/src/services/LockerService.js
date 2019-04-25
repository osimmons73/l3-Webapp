import axios from "axios";

const url = "api/lockers";

class LockerService {
  // Get Lockers
  static async getLocker() {
    try {
      const res = await axios.get(url);
      const data = res.data;
      return data;
    } catch (error) {}
  }
  // Create Locker
  static async insertLocker(stationId, lockerName) {
    return await axios.post(url, {
      stationId,
      lockerName
    });
  }
  // Delete Locker
  static deleteLocker(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default LockerService;
