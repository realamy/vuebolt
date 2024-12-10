<template>
  <Dialog
    v-model:visible="visible"
    :modal="true"
    :header="$t('book_service')"
    class="p-fluid"
    :style="{ width: '50vw' }"
  >
    <div class="grid grid-cols-1 gap-4">
      <div class="field">
        <label for="date">{{ $t('preferred_date') }}</label>
        <Calendar
          v-model="bookingData.preferred_start_date"
          :min-date="new Date()"
          :show-time="true"
          :show-icon="true"
        />
      </div>

      <div class="field">
        <label for="location">{{ $t('service_location') }}</label>
        <Dropdown
          v-model="bookingData.service_location_type"
          :options="locationTypes"
          option-label="label"
          option-value="value"
        />
      </div>

      <div class="field">
        <label for="wilaya">{{ $t('wilaya') }}</label>
        <Dropdown
          v-model="bookingData.wilaya"
          :options="wilayas"
          :filter="true"
        />
      </div>

      <div class="field">
        <label for="address">{{ $t('address') }}</label>
        <Textarea
          v-model="bookingData.address"
          :autoResize="true"
          rows="3"
        />
      </div>

      <div class="field">
        <label for="requirements">{{ $t('special_requirements') }}</label>
        <Textarea
          v-model="bookingData.requirements"
          :autoResize="true"
          rows="4"
        />
      </div>

      <div class="field">
        <label>{{ $t('price_breakdown') }}</label>
        <div class="p-4 bg-gray-50 rounded">
          <div class="flex justify-between mb-2">
            <span>{{ $t('service_price') }}</span>
            <span>{{ formatPrice(service.price) }} DZD</span>
          </div>
          <div v-if="service.visit_fee" class="flex justify-between mb-2">
            <span>{{ $t('visit_fee') }}</span>
            <span>{{ formatPrice(service.visit_fee) }} DZD</span>
          </div>
          <div class="flex justify-between font-bold border-t pt-2 mt-2">
            <span>{{ $t('total') }}</span>
            <span>{{ formatPrice(calculateTotal()) }} DZD</span>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <Button
        :label="$t('cancel')"
        icon="pi pi-times"
        @click="closeDialog"
        text
      />
      <Button
        :label="$t('confirm_booking')"
        icon="pi pi-check"
        @click="handleConfirm"
        :loading="loading"
      />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Dialog } from 'primevue/dialog';
import { Calendar } from 'primevue/calendar';
import { Dropdown } from 'primevue/dropdown';
import { Textarea } from 'primevue/textarea';
import { Button } from 'primevue/button';
import type { Service } from '@/types';
import { formatPrice } from '@/utils/format';

const props = defineProps<{
  visible: boolean;
  service: Service;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'confirm', data: any): void;
}>();

const loading = ref(false);
const bookingData = ref({
  preferred_start_date: null,
  service_location_type: 'client_location',
  wilaya: '',
  address: '',
  requirements: '',
});

const locationTypes = [
  { label: 'At My Location', value: 'client_location' },
  { label: 'At Service Provider Location', value: 'freelancer_location' },
  { label: 'Other Location', value: 'other' },
];

// This would typically come from an API or configuration
const wilayas = [
  'Algiers', 'Oran', 'Constantine', 'Annaba', // Add all wilayas
];

function calculateTotal() {
  let total = props.service.price;
  if (props.service.visit_fee && !props.service.visit_fee_included) {
    total += props.service.visit_fee;
  }
  return total;
}

function closeDialog() {
  emit('update:visible', false);
}

async function handleConfirm() {
  loading.value = true;
  try {
    emit('confirm', {
      ...bookingData.value,
      service_id: props.service.id,
      total_amount: calculateTotal(),
    });
  } finally {
    loading.value = false;
    closeDialog();
  }
}
</script>