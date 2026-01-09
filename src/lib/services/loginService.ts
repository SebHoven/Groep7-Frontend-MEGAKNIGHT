import { writable } from 'svelte/store';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3012';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher';
}

export const user = writable<User | null>(null);
export const isAuthenticated = writable<boolean>(false);

export const authService = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (data.success && data.data) {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      
      user.set(data.data.user);
      isAuthenticated.set(true);
      
      return { 
        success: true, 
        message: 'Login successful!',
        role: data.data.user.role 
      };
    }
    
    return { success: false, message: data.message || 'Login failed' };
  },

  async register(name: string, email: string, password: string, role: 'student' | 'teacher' = 'student') {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    });
    
    const data = await response.json();
    
    if (data.success) {
      return { success: true, message: 'Registration successful!' };
    }
    
    return { success: false, message: data.message || 'Registration failed' };
  },

  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  },

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    user.set(null);
    isAuthenticated.set(false);
  }
};