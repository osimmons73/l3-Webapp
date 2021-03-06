import axios from "axios";

const url = "api/current_user";

class UserService {
  // Get User
  static getUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default UserService;
