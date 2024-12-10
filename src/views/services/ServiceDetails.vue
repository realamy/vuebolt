<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="flex justify-center">
      <ProgressSpinner />
    </div>

    <div v-else-if="error" class="text-center">
      <Message severity="error" :content="error" />
    </div>

    <template v-else>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Service Details -->
        <div class="lg:col-span-2">
          <ServiceGallery :images="service.images" />
          <div class="bg-white rounded-lg shadow-md p-6 mt-6">
            <h1 class="text-2xl font-bold mb-4">{{ service.title }}</h1>
            <div class="flex items-center mb-4">
              <Rating :modelValue="service.average_rating || 0" readonly :cancel="false" />
              <span class="ml-2 text-gray-600">({{ service.reviews_count }} {{ $t('reviews') }})</span>
            </div>
            <div class="prose max-w-none" v-html="service.description"></div>
            
            <ServiceFeatures 
              :features="service.features" 
              :requirements="service.requirements"
              :deliverables="service.deliverables"
            />
            
            <ServiceQuality 
              :warranty="service.warranty_information"
              :guarantees="service.quality_guarantees"
              :insurance="service.insurance_details"
            />
          </div>
        </div>

        <!-- Booking Card -->
        <div class="lg:col-span-1">
          <BookingCard 
            :service="service"
            @book-service="handleBooking"
          />
        </div>
      </div>

      <!-- Reviews Section -->
      <ServiceReviews 
        :service-id="serviceId"
        class="mt-8"
      />
    </template>

    <!-- Booking Dialog -->
    <BookingDialog
      v-model:visible="showBookingDialog"
      :service="service"
      @confirm="confirmBooking"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useServicesStore } from '@/stores/services';
import type { Service } from '@/types';
import { ProgressSpinner } from 'primevue/progressspinner';
import { Message } from 'primevue/message';
import { Rating } from 'primevue/rating';
import ServiceGallery from '@/components/services/ServiceGallery.vue';
import ServiceFeatures from '@/components/services/ServiceFeatures.vue';
import ServiceQuality from '@/components/services/ServiceQuality.vue';
import BookingCard from '@/components/booking/BookingCard.vue';
import BookingDialog from '@/components/booking/BookingDialog.vue';
import ServiceReviews from '@/components/services/ServiceReviews.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const servicesStore = useServicesStore();

const serviceId = Number(route.params.id);
const service = ref<Service | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const showBookingDialog = ref(false);

async function loadService() {
  try {
    loading.value = true;
    service.value = await servicesStore.getServiceById(serviceId);
  } catch (err) {
    error.value = 'Failed to load service details';
  } finally {
    loading.value = false;
  }
}

function handleBooking() {
  if (!authStore.isAuthenticated) {
    router.push({
      name: 'login',
      query: { redirect: route.fullPath }
    });
    return;
  }
  showBookingDialog.value = true;
}

async function confirmBooking(bookingData: any) {
  // Implementation for booking confirmation
  // Will be handled in the next part
}

onMounted(() => {
  loadService();
});
</script>