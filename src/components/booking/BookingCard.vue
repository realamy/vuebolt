<template>
  <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
    <div class="mb-4">
      <h3 class="text-xl font-semibold mb-2">{{ $t('pricing') }}</h3>
      <div class="flex justify-between items-center">
        <span class="text-2xl font-bold">{{ formatPrice(service.price) }} DZD</span>
        <span class="text-gray-600">{{ formatPricingType(service.pricing_type) }}</span>
      </div>
    </div>

    <div class="border-t border-b py-4 my-4">
      <div class="flex justify-between mb-2">
        <span>{{ $t('response_time') }}</span>
        <span>{{ formatResponseTime(service.response_time_hours) }}</span>
      </div>
      <div class="flex justify-between">
        <span>{{ $t('completion_rate') }}</span>
        <span>{{ formatPercentage(service.completion_rate) }}</span>
      </div>
    </div>

    <Button
      :label="$t('book_now')"
      class="w-full mb-3"
      severity="success"
      @click="$emit('book-service')"
    />

    <Button
      :label="$t('contact_freelancer')"
      class="w-full"
      severity="secondary"
      outlined
      @click="$emit('contact-freelancer')"
    />

    <div class="mt-4 text-sm text-gray-600">
      <div class="flex items-center mb-2">
        <i class="pi pi-shield mr-2"></i>
        <span>{{ $t('payment_protection') }}</span>
      </div>
      <div class="flex items-center">
        <i class="pi pi-verified mr-2"></i>
        <span>{{ $t('verified_freelancer') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'primevue/button';
import type { Service } from '@/types';
import { formatPrice, formatPricingType, formatResponseTime, formatPercentage } from '@/utils/format';

defineProps<{
  service: Service;
}>();

defineEmits<{
  (e: 'book-service'): void;
  (e: 'contact-freelancer'): void;
}>();
</script>