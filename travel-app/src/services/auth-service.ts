export default class AuthService {
  serverUrl = 'https://travel-react-app.herokuapp.com';
  localServerUrl = 'http://localhost:3000/user/profile';

  async createNewUser(userData: {
    login: string;
    email: string;
    password: string;
  }) {
    const res = await fetch(`${this.serverUrl}/user/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });

    const data = await res.json();

    return data;
  }

  async loginApp(userData: { login: string; password: string }) {
    const res = await fetch(`${this.serverUrl}/user/login`, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'content-type': 'application/json' },
    });

    const data = await res.json();

    return data;
  }

  async updateImage(imgUrl: any, userLogin: string) {
    const res = await fetch(`${this.serverUrl}/user/updatefoto`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: imgUrl,
        login: userLogin,
      }),
    });

    const data = await res.json();

    return data;
  }
}
