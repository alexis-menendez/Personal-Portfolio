// File: client/src/utils/taskadelic/auth.ts

import { jwtDecode, JwtPayload } from 'jwt-decode';

const TOKEN_KEY = 'td_token';

class TDAuthService {
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;
      return decoded.exp < Math.floor(Date.now() / 1000);
    } catch {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  login(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    window.location.assign('/td-board');
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    window.location.assign('/td-home');
  }
}

export default new TDAuthService();
