<template>
  <div v-if="hasActiveFilters" class="col-12 col-sm-auto">
    <div class="row items-center q-gutter-xs">
      <div class="text-caption text-grey-7 q-mr-sm">Active Filters:</div>
      <q-chip
        v-if="store.filters.magnitudeMin !== null"
        removable
        color="primary"
        text-color="white"
        size="sm"
        :label="`Min: ${store.filters.magnitudeMin}`"
        @remove="store.updateFilters({ magnitudeMin: null })"
      />
      <q-chip
        v-if="store.filters.magnitudeMax !== null"
        removable
        color="primary"
        text-color="white"
        size="sm"
        :label="`Max: ${store.filters.magnitudeMax}`"
        @remove="store.updateFilters({ magnitudeMax: null })"
      />
      <q-chip
        v-if="store.filters.locationText && store.filters.locationText.trim()"
        removable
        color="primary"
        text-color="white"
        size="sm"
        :label="`Location: ${store.filters.locationText}`"
        @remove="store.updateFilters({ locationText: '' })"
      />
    </div>
  </div>
  <div v-else class="col-12 col-sm-auto">
    <div class="text-caption text-grey-6">No active filters</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEarthquakeStore } from 'src/stores/earthquake';

const store = useEarthquakeStore();

const hasActiveFilters = computed(() => {
  return (
    store.filters.magnitudeMin !== null ||
    store.filters.magnitudeMax !== null ||
    (store.filters.locationText && store.filters.locationText.trim() !== '')
  );
});
</script>

