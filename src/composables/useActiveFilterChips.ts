import { computed } from 'vue';
import { useEarthquakeStore } from 'src/stores/earthquake';

export function useActiveFilterChips() {
  const store = useEarthquakeStore();

  const hasActiveFilters = computed(() => {
    return (
      store.filters.magnitudeMin !== null ||
      store.filters.magnitudeMax !== null ||
      (store.filters.locationText && store.filters.locationText.trim() !== '')
    );
  });

  return {
    hasActiveFilters,
  };
}
