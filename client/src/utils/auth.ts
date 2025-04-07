import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
  }
  return null;
  }


  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
  const token = this.getToken();
  return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
    const decoded = jwtDecode<JwtPayload & { exp: number }>(token);
    console.log(decoded.exp)
    if (decoded.exp) {
      return decoded.exp * 1000 < Date.now();
    } else {
      return true;
    }
  } catch (error) {
    console.error("Error decoding token", error);
    return true; // If there's an error decoding the token, consider it expired
      
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
   // TODO: redirect to the home page
    window.location.assign('/'); // Redirect to the home page
  }
 

    logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    window.location.assign('/login'); // Redirect to the login page
  }
}

export default new AuthService();
