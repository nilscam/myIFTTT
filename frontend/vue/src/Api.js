import axios from 'axios'

class Api {
  constructor() {
    this.ApiURL = process.env.VUE_APP_API_URL
  }

  login(data) {
    return axios.post(this.ApiURL + "/api/user/login", data);
  }
}

export default new Api();
