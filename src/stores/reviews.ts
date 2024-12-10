import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ServiceReview, ReviewSummary } from '@/types';
import { api } from '@/utils/api';

export const useReviewsStore = defineStore('reviews', () => {
  const reviews = ref<ServiceReview[]>([]);
  const summary = ref<ReviewSummary | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchReviews(serviceId: number, params?: Record<string, any>) {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get(`/services/${serviceId}/reviews`, { params });
      reviews.value = response.data.data;
      return response.data;
    } catch (err) {
      error.value = 'Failed to fetch reviews';
      console.error('Error fetching reviews:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function fetchReviewSummary(serviceId: number) {
    try {
      const response = await api.get(`/services/${serviceId}/reviews/summary`);
      summary.value = response.data;
      return response.data;
    } catch (err) {
      console.error('Error fetching review summary:', err);
      throw err;
    }
  }

  async function submitReview(serviceId: number, reviewData: Partial<ServiceReview>) {
    try {
      const response = await api.post(`/services/${serviceId}/reviews`, reviewData);
      return response.data;
    } catch (err) {
      console.error('Error submitting review:', err);
      throw err;
    }
  }

  async function updateReview(reviewId: number, reviewData: Partial<ServiceReview>) {
    try {
      const response = await api.put(`/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (err) {
      console.error('Error updating review:', err);
      throw err;
    }
  }

  async function deleteReview(reviewId: number) {
    try {
      await api.delete(`/reviews/${reviewId}`);
    } catch (err) {
      console.error('Error deleting review:', err);
      throw err;
    }
  }

  return {
    reviews,
    summary,
    loading,
    error,
    fetchReviews,
    fetchReviewSummary,
    submitReview,
    updateReview,
    deleteReview
  };
});