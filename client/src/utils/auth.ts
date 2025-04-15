// Path: client/src/utils/auth.ts
// This file is used to handle authentication
import { jwtDecode,  JwtPayload } from 'jwt-decode';

class AuthService {
  // Get the user's profile by decoding the token
  getProfile() {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken = jwtDecode<JwtPayload>(token);
    const { exp } = decodedToken;
    const currentTime = Date.now() / 1000; // Convert to seconds
    if (exp && exp < currentTime) {
      return null; // Token is expired
    }
    return decodedToken; // Return the decoded token
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Check if token exists and is not expired
  }

  // Check if the token is expired
  isTokenExpired(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const { exp } = decodedToken;
    const currentTime = Date.now() / 1000; // Convert to seconds
    return !!exp && exp < currentTime; // Return true if expired, false otherwise
  }

  // Get the token from localStorage
  getToken(): string {
    return localStorage.getItem('id_token') || ''; // Return the token or an empty string
  }

  // Log the user in by storing the token and redirecting to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken); // Store the token in localStorage
    window.location.assign('/'); // Redirect to the home page
  }

  // Log the user out by removing the token
  logout() {
    localStorage.removeItem('id_token'); // Remove the token from localStorage
    window.location.assign('/'); // Redirect to the home page
  }
}

export default new AuthService();
