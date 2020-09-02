import axios from "axios";

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true,
    });
    this.service = service;
  }

  signup = (username, password, name, lastName) => {
    return this.service.post("/signup", { username, password, name, lastName })
      .then((response) => response.data);
  }

  upload = (pic) => {
    return this.service.post('/upload', pic)
      .then((response) => response.data);
  };

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }
}

export default AuthService;
