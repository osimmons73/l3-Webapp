import axios from "axios";

const url = "/api/google/auth";

class UserService {
  static getUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(user => ({
            ...user
          }))
        );
        console.log(`usere is ${data}`);
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = UserService;
