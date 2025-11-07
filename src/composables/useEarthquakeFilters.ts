import { ref, watch, onMounted } from 'vue';
import { useEarthquakeStore } from 'src/stores/earthquake';

export function useEarthquakeFilters() {
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

  return {
    magnitudeMin,
    magnitudeMax,
    locationText,
    updateFilters,
    setQuickFilter,
    clearFilters,
  };
}
