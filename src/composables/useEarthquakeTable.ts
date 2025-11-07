import { ref, computed } from 'vue';
import { useEarthquakeStore } from 'src/stores/earthquake';
import type { Earthquake } from 'src/types/earthquake';

export function useEarthquakeTable(emit: (e: 'view-on-map') => void) {
  const store = useEarthquakeStore();

  const filteredEarthquakes = computed(() => store.filteredEarthquakes);
  const loading = computed(() => store.loading);

  const drawerOpen = ref(false);
  const selectedEarthquake = ref<Earthquake | null>(null);

  const openDetails = (earthquake: Earthquake) => {
    selectedEarthquake.value = earthquake;
    drawerOpen.value = true;
  };

  const viewOnMap = () => {
    emit('view-on-map');
  };

  const pagination = ref({
    sortBy: '',
    descending: false,
    page: 1,
    rowsPerPage: 25,
  });

  return {
    filteredEarthquakes,
    loading,
    drawerOpen,
    selectedEarthquake,
    openDetails,
    viewOnMap,
    pagination,
  };
}
