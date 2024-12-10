<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">{{ $t('available_services') }}</h1>
      <div class="flex space-x-4">
        <Dropdown
          v-model="filters.category"
          :options="categories"
          optionLabel="name"
          :placeholder="$t('select_category')"
          class="w-48"
        />
        <Dropdown
          v-model="filters.sortBy"
          :options="sortOptions"
          optionLabel="label"
          :placeholder="$t('sort_by')"
          class="w-48"
        />
      </div>
    </div>

    <div v-if="servicesStore.loading" class="flex justify-center py-8">
      <ProgressSpinner />
    </div>

    <div v-else-if="servicesStore.error" class="text-center py-8">
      <Message severity="error" :content="servicesStore.error" />
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <ServiceCard
        v-for="service in servicesStore.sortedServices"
        :key="service.id"
        :service="service"
      />
    </div>

    <Paginator
      v-if="totalPages > 1"
      v-model:first="currentPage"
      :rows="perPage"
      :totalRecords="totalRecords"
      @page="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Dropdown } from 'primevue/dropdown';
import { ProgressSpinner } from 'primevue/progressspinner';
import { Message } from 'primevue/message';
import { Paginator } from 'primevue/paginator';
import { useServicesStore } from '@/stores/services';
import ServiceCard from '@/components/services/ServiceCard.vue';

const servicesStore = useServicesStore();
const currentPage = ref(0);
const perPage = ref(12);
const totalRecords = ref(0);
const totalPages = computed(() => Math.ceil(totalRecords.value / perPage.value));

const filters = ref({
  category: null,
  sortBy: null,
  page: 1,
  perPage: perPage.value,
});

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating', value: 'rating' },
];

watch(filters, () => {
  loadServices();
}, { deep: true });

async function loadServices() {
  await servicesStore.fetchServices(filters.value);
  totalRecords.value = servicesStore.services.length; // Update with actual total from API
}

function onPageChange(event: any) {
  filters.value.page = event.page + 1;
}

onMounted(() => {
  loadServices();
});
</script>