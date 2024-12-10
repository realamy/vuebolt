<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold mb-6">{{ $t('reviews_and_ratings') }}</h2>

    <!-- Reviews Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="flex flex-col items-center justify-center">
        <div class="text-4xl font-bold mb-2">{{ summary.average_rating.toFixed(1) }}</div>
        <Rating :modelValue="summary.average_rating" readonly :cancel="false" />
        <div class="text-gray-600 mt-2">
          {{ summary.total_reviews }} {{ $t('total_reviews') }}
        </div>
      </div>

      <div class="col-span-2">
        <div v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center mb-2">
          <div class="w-12">{{ rating }} {{ $t('stars') }}</div>
          <div class="flex-grow mx-4">
            <ProgressBar
              :value="(summary.rating_distribution[rating] / summary.total_reviews) * 100"
              :showValue="false"
              class="h-2"
            />
          </div>
          <div class="w-16 text-right text-gray-600">
            {{ summary.rating_distribution[rating] }}
          </div>
        </div>
      </div>
    </div>

    <!-- Review Filters -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex space-x-4">
        <Dropdown
          v-model="filters.rating"
          :options="ratingOptions"
          optionLabel="label"
          :placeholder="$t('filter_by_rating')"
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

    <!-- Reviews List -->
    <div v-if="loading" class="flex justify-center py-8">
      <ProgressSpinner />
    </div>

    <div v-else-if="error" class="text-center py-8">
      <Message severity="error" :content="error" />
    </div>

    <div v-else>
      <div v-for="review in reviews" :key="review.id" class="border-b last:border-b-0 py-6">
        <div class="flex items-start">
          <Avatar
            :image="review.client.profile_photo_path || '/default-avatar.png'"
            shape="circle"
            size="large"
            class="mr-4"
          />
          <div class="flex-grow">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold">{{ review.client.name }}</h4>
                <div class="flex items-center mt-1">
                  <Rating :modelValue="review.rating" readonly :cancel="false" />
                  <span class="text-gray-600 ml-2">{{ formatDate(review.created_at) }}</span>
                </div>
              </div>
              <Button
                icon="pi pi-flag"
                text
                severity="secondary"
                v-tooltip.bottom="$t('report_review')"
                @click="reportReview(review.id)"
              />
            </div>

            <h5 v-if="review.title" class="font-semibold mt-3">{{ review.title }}</h5>
            <p class="text-gray-700 mt-2">{{ review.review }}</p>

            <!-- Review Attachments -->
            <div v-if="review.attachments" class="flex gap-2 mt-4">
              <div
                v-for="(attachment, index) in review.attachments"
                :key="index"
                class="relative w-20 h-20 rounded overflow-hidden cursor-pointer"
                @click="openAttachment(attachment)"
              >
                <img
                  :src="attachment.url"
                  :alt="attachment.name"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <!-- Helpful Button -->
            <div class="flex items-center mt-4">
              <Button
                :icon="review.marked_helpful ? 'pi pi-thumbs-up-fill' : 'pi pi-thumbs-up'"
                :label="$t('helpful')"
                text
                @click="markHelpful(review.id)"
                class="p-0"
              />
              <span class="text-gray-600 ml-2">{{ review.helpful_count }}</span>
            </div>

            <!-- Freelancer Response -->
            <div
              v-if="review.response"
              class="bg-gray-50 rounded-lg p-4 mt-4"
            >
              <div class="flex items-start">
                <Avatar
                  :image="service.freelancer.profile_photo_path || '/default-avatar.png'"
                  shape="circle"
                  size="small"
                  class="mr-3"
                />
                <div>
                  <div class="font-semibold">{{ $t('freelancer_response') }}</div>
                  <div class="text-gray-600 text-sm">{{ formatDate(review.response_at) }}</div>
                  <p class="text-gray-700 mt-2">{{ review.response }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <Paginator
        v-if="totalPages > 1"
        v-model:first="currentPage"
        :rows="perPage"
        :totalRecords="totalRecords"
        @page="onPageChange"
        class="mt-6"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'i18next-vue';
import { format } from 'date-fns';
import { Rating } from 'primevue/rating';
import { ProgressBar } from 'primevue/progressbar';
import { Dropdown } from 'primevue/dropdown';
import { Button } from 'primevue/button';
import { Avatar } from 'primevue/avatar';
import { ProgressSpinner } from 'primevue/progressspinner';
import { Message } from 'primevue/message';
import { Paginator } from 'primevue/paginator';
import type { ServiceReview, ReviewSummary } from '@/types';
import { api } from '@/utils/api';

const props = defineProps<{
  serviceId: number;
}>();

const { t } = useI18n();

const reviews = ref<ServiceReview[]>([]);
const summary = ref<ReviewSummary>({
  average_rating: 0,
  total_reviews: 0,
  rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
});
const loading = ref(false);
const error = ref<string | null>(null);
const currentPage = ref(0);
const perPage = ref(10);
const totalRecords = ref(0);
const totalPages = computed(() => Math.ceil(totalRecords.value / perPage.value));

const filters = ref({
  rating: null,
  sortBy: null,
  page: 1,
  perPage: perPage.value
});

const ratingOptions = [
  { label: t('all_ratings'), value: null },
  { label: '5 ' + t('stars'), value: 5 },
  { label: '4 ' + t('stars'), value: 4 },
  { label: '3 ' + t('stars'), value: 3 },
  { label: '2 ' + t('stars'), value: 2 },
  { label: '1 ' + t('star'), value: 1 }
];

const sortOptions = [
  { label: t('most_recent'), value: 'newest' },
  { label: t('oldest'), value: 'oldest' },
  { label: t('highest_rating'), value: 'rating_desc' },
  { label: t('lowest_rating'), value: 'rating_asc' },
  { label: t('most_helpful'), value: 'helpful' }
];

watch(filters, () => {
  loadReviews();
}, { deep: true });

async function loadReviews() {
  loading.value = true;
  error.value = null;

  try {
    const [reviewsResponse, summaryResponse] = await Promise.all([
      api.get(`/services/${props.serviceId}/reviews`, { params: filters.value }),
      api.get(`/services/${props.serviceId}/reviews/summary`)
    ]);

    reviews.value = reviewsResponse.data.data;
    totalRecords.value = reviewsResponse.data.total;
    summary.value = summaryResponse.data;
  } catch (err) {
    error.value = t('error_loading_reviews');
    console.error('Error loading reviews:', err);
  } finally {
    loading.value = false;
  }
}

async function markHelpful(reviewId: number) {
  try {
    await api.post(`/reviews/${reviewId}/helpful`);
    await loadReviews(); // Reload to get updated counts
  } catch (err) {
    console.error('Error marking review as helpful:', err);
  }
}

async function reportReview(reviewId: number) {
  try {
    await api.post(`/reviews/${reviewId}/report`);
    // Show success message
  } catch (err) {
    console.error('Error reporting review:', err);
  }
}

function formatDate(date: string): string {
  return format(new Date(date), 'MMM d, yyyy');
}

function onPageChange(event: any) {
  filters.value.page = event.page + 1;
}

function openAttachment(attachment: any) {
  window.open(attachment.url, '_blank');
}

onMounted(() => {
  loadReviews();
});
</script>