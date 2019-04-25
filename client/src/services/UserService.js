import axios from "axios";

const STATION_USER_BASE_URL = "api/users/stations/";
const LOCKER_BASE_URL = "api/users/lockers/";
class UserService {
  // Get All User-Station Mappings
  static async getAllUsersStations() {
    try {
      const res = await axios.get(`${STATION_USER_BASE_URL}/all`);
      const data = res.data;
      return data;
    } catch (error) {}
  }
  // Get My User-Station Mapping
  static async getMyStation(id) {
    console.log("station service");
    try {
      console.log("here is my id guy", id);
      const res = await axios.get(`${STATION_USER_BASE_URL}${id.userId}`);
      console.log("response data", res.data);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }
  // Create My User-Station Mapping
  static insertMyUserStation(userId, stationId) {
    return axios.post(STATION_USER_BASE_URL, {
      userId,
      stationId
    });
  }
  // Delete User-Station Mapping
  static deleteMyUserStation(id) {
    return axios.delete(`${STATION_USER_BASE_URL}${id}`);
  }

  // Get All User-Locker Mappings
  static async getAllUsersLockers() {
    try {
      const res = await axios.get(`${LOCKER_BASE_URL}all`);
      const data = res.data;
      return data;
    } catch (error) {
      return data;
    }
  }
  // Get My User-Locker Mapping
  static async getMyLocker(userId) {
    try {
      const res = await axios.get(LOCKER_BASE_URL, {
        userId,
        lockerId
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // Create My User-Locker Mapping
  static insertMyUserLocker(userId, lockerId) {
    return axios.post(LOCKER_BASE_URL, {
      userId,
      lockerId
    });
  }
  // Delete User-Station Mapping
  static deleteMyUserLocker(id) {
    return axios.delete(`${LOCKER_BASE_URL}${id}`);
  }
}

export default UserService;
