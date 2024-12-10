import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types';
import { api } from '@/utils/api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);
  const isFreelancer = computed(() => user.value?.type === 'freelancer');
  const isClient = computed(() => user.value?.type === 'client');

  async function login(email: string, password: string) {
    try {
      const response = await api.post('/auth/login', { email, password });
      token.value = response.data.token;
      user.value = response.data.user;
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  async function logout() {
    try {
      await api.post('/auth/logout');
    } finally {
      token.value = null;
      user.value = null;
    }
  }

  async function checkAuth() {
    if (!token.value) return false;
    
    try {
      const response = await api.get('/auth/me');
      user.value = response.data;
      return true;
    } catch (error) {
      token.value = null;
      user.value = null;
      return false;
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isFreelancer,
    isClient,
    login,
    logout,
    checkAuth
  };
});