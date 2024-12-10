import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Service } from '@/types';
import { api } from '@/utils/api';

export const useServicesStore = defineStore('services', () => {
  const services = ref<Service[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const sortedServices = computed(() => {
    return [...services.value].sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  });

  async function fetchServices(filters?: Record<string, any>) {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await api.get('/services', { params: filters });
      services.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch services';
      console.error('Error fetching services:', err);
    } finally {
      loading.value = false;
    }
  }

  async function getServiceById(id: number) {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching service:', err);
      throw err;
    }
  }

  return {
    services,
    loading,
    error,
    sortedServices,
    fetchServices,
    getServiceById
  };
});