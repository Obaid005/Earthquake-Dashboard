<template>
  <div class="filters-container">
    <div class="filters-header q-mb-md">
      <div class="row items-center">
        <q-icon name="tune" size="24px" color="primary" class="q-mr-sm" />
        <span class="text-subtitle1 text-weight-medium">Filter Options</span>
      </div>
    </div>
    <div class="row q-gutter-md items-end filter-row">
      <div class="col-12 col-sm-auto">
        <div class="filter-group">
          <label class="filter-label">
            <q-icon name="arrow_downward" size="16px" color="blue-6" class="q-mr-xs" />
            Min Magnitude
          </label>
          <q-input
            v-model.number="magnitudeMin"
            type="number"
            outlined
            dense
            clearable
            :min="0"
            :max="10"
            :step="0.1"
            placeholder="0.0"
            class="filter-input"
            @update:model-value="updateFilters"
          >
            <template #prepend>
              <q-icon name="trending_down" size="18px" color="blue-6" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="col-12 col-sm-auto">
        <div class="filter-group">
          <label class="filter-label">
            <q-icon name="arrow_upward" size="16px" color="red-6" class="q-mr-xs" />
            Max Magnitude
          </label>
          <q-input
            v-model.number="magnitudeMax"
            type="number"
            outlined
            dense
            clearable
            :min="0"
            :max="10"
            :step="0.1"
            placeholder="10.0"
            class="filter-input"
            @update:model-value="updateFilters"
          >
            <template #prepend>
              <q-icon name="trending_up" size="18px" color="red-6" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="col-12 col-sm">
        <div class="filter-group">
          <label class="filter-label">
            <q-icon name="place" size="16px" color="primary" class="q-mr-xs" />
            Search Location
          </label>
          <q-input
            v-model="locationText"
            outlined
            dense
            clearable
            placeholder="e.g., California, Japan, Alaska..."
            class="filter-input"
            @update:model-value="updateFilters"
          >
            <template #prepend>
              <q-icon name="search" size="18px" color="primary" />
            </template>
          </q-input>
        </div>
      </div>
    </div>
    <div class="quick-filters q-mt-md">
      <div class="text-caption text-grey-7 q-mb-xs">Quick Filters:</div>
      <div class="row q-gutter-xs">
        <q-btn
          flat
          dense
          size="sm"
          color="primary"
          label="≥ 5.0"
          icon="warning"
          class="quick-filter-btn"
          @click="setQuickFilter(5.0)"
        />
        <q-btn
          flat
          dense
          size="sm"
          color="primary"
          label="≥ 6.0"
          icon="error"
          class="quick-filter-btn"
          @click="setQuickFilter(6.0)"
        />
        <q-btn
          flat
          dense
          size="sm"
          color="primary"
          label="≥ 7.0"
          icon="dangerous"
          class="quick-filter-btn"
          @click="setQuickFilter(7.0)"
        />
        <q-space />
        <q-btn
          flat
          dense
          size="sm"
          color="grey-7"
          label="Clear All"
          icon="clear_all"
          class="quick-filter-btn"
          @click="clearFilters"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useEarthquakeStore } from 'src/stores/earthquake';

const store = useEarthquakeStore();

// Initialize from store (which loads from localStorage)
const magnitudeMin = ref<number | null>(store.filters.magnitudeMin);
const magnitudeMax = ref<number | null>(store.filters.magnitudeMax);
const locationText = ref(store.filters.locationText || '');

const updateFilters = () => {
  store.updateFilters({
    magnitudeMin: magnitudeMin.value ?? null,
    magnitudeMax: magnitudeMax.value ?? null,
    locationText: locationText.value ?? '',
  });
};

const setQuickFilter = (min: number) => {
  magnitudeMin.value = min;
  magnitudeMax.value = null;
  locationText.value = '';
  updateFilters();
};

const clearFilters = () => {
  magnitudeMin.value = null;
  magnitudeMax.value = null;
  locationText.value = '';
  updateFilters();
};

// Sync local state with store (for external filter changes)
watch(
  () => store.filters,
  (newFilters) => {
    magnitudeMin.value = newFilters.magnitudeMin;
    magnitudeMax.value = newFilters.magnitudeMax;
    locationText.value = newFilters.locationText || '';
  },
  { deep: true },
);

// Ensure filters are synced on mount
onMounted(() => {
  magnitudeMin.value = store.filters.magnitudeMin;
  magnitudeMax.value = store.filters.magnitudeMax;
  locationText.value = store.filters.locationText || '';
});
</script>

<style scoped>
.filters-container {
  padding: 20px 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.filters-container:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.filters-header {
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.filter-group .filter-input {
  max-width: 100%;
  box-sizing: border-box;
}

.filter-label {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-input {
  min-width: 150px;
  width: 100%;
  max-width: 100%;
}

.filter-row {
  margin-left: 8px;
  margin-right: 8px;
}

.filter-row > [class*='col-'] {
  padding-left: 8px;
  padding-right: 8px;
}

.filter-input :deep(.q-field) {
  width: 100%;
  max-width: 100%;
  margin: 0;
}

/* Ensure inputs don't touch the card edge */
.filter-input :deep(.q-field__native),
.filter-input :deep(.q-field__input) {
  padding-left: 12px;
  padding-right: 8px;
}

.filter-input :deep(.q-field__control) {
  background: #fafbfc;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.filter-input :deep(.q-field__inner) {
  padding-right: 0;
}

.filter-input :deep(.q-field__bottom) {
  padding-right: 0;
}

.filter-input :deep(.q-field--outlined .q-field__control) {
  border-radius: 8px;
}

.filter-input :deep(.q-field--focused .q-field__control) {
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.filter-input :deep(.q-field__native) {
  font-weight: 500;
}

/* Ensure spinner controls are always rightmost, even with clear button */
.filter-input :deep(.q-field__control-container) {
  position: relative;
}

.filter-input :deep(input[type='number']) {
  padding-right: 60px !important;
}

/* Position spinner controls on the rightmost side */
.filter-input :deep(input[type='number']::-webkit-inner-spin-button),
.filter-input :deep(input[type='number']::-webkit-outer-spin-button) {
  opacity: 1;
  position: absolute;
  right: 8px !important;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin: 0;
}

/* Position clear button to the left of spinner, properly centered */
.filter-input :deep(.q-field__append) {
  position: absolute;
  right: 36px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-input :deep(.q-field__append .q-icon) {
  margin: 0;
}

.quick-filters {
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.quick-filter-btn {
  border-radius: 6px;
  transition: all 0.2s ease;
}

.quick-filter-btn:hover {
  background: rgba(102, 126, 234, 0.08);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .filters-container {
    padding: 16px;
  }
}
</style>
