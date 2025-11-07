import { computed } from 'vue';
import { useEarthquakeStore } from 'src/stores/earthquake';
import { calculateStatistics } from 'src/utils/statistics';

export function useStatisticsCards() {
  const store = useEarthquakeStore();

  const totalCount = computed(() => store.earthquakes.length);
  const filteredCount = computed(() => store.filteredEarthquakes.length);

  const statistics = computed(() => calculateStatistics(store.filteredEarthquakes));
  const maxMagnitude = computed(() => statistics.value.maxMagnitude);
  const avgMagnitude = computed(() => statistics.value.avgMagnitude);

  return {
    totalCount,
    filteredCount,
    maxMagnitude,
    avgMagnitude,
  };
}

