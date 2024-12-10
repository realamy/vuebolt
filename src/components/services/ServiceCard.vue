<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img
      :src="service.images?.[0] || '/placeholder-service.jpg'"
      :alt="service.title"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">{{ service.title }}</h3>
      <p class="text-gray-600 text-sm mb-4">{{ service.short_description }}</p>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <Rating :modelValue="service.average_rating || 0" readonly :cancel="false" />
          <span class="text-sm text-gray-500">({{ service.reviews_count }})</span>
        </div>
        <div class="text-right">
          <p class="text-lg font-bold">{{ formatPrice(service.price) }} DZD</p>
          <p class="text-sm text-gray-500">{{ service.pricing_type }}</p>
        </div>
      </div>
      <Button
        :label="$t('view_details')"
        class="w-full mt-4"
        @click="router.push(`/services/${service.id}`)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rating } from 'primevue/rating';
import { Button } from 'primevue/button';
import { useRouter } from 'vue-router';
import type { Service } from '@/types';
import { formatPrice } from '@/utils/format';

const props = defineProps<{
  service: Service;
}>();

const router = useRouter();
</script>