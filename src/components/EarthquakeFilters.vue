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
import { useEarthquakeFilters } from 'src/composables/useEarthquakeFilters';

const { magnitudeMin, magnitudeMax, locationText, updateFilters, setQuickFilter, clearFilters } =
  useEarthquakeFilters();
</script>

<style scoped lang="scss">
@import 'src/styles/earthquakeFilters.scss';
</style>
