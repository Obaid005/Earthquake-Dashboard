import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useQuasar } from 'quasar';
import { useEarthquakeStore } from 'src/stores/earthquake';
import { REFRESH_INTERVAL } from 'src/utils/constants';
import { exportEarthquakesToCSV } from 'src/utils/export';
import type { ComponentPublicInstance } from 'vue';
import type EarthquakeMap from 'src/components/EarthquakeMap.vue';

export function useIndexPage() {
  const $q = useQuasar();
  const store = useEarthquakeStore();
  const tab = ref('table');

  const loading = computed(() => store.loading);
  const error = computed(() => store.error);
  const filteredCount = computed(() => store.filteredEarthquakes.length);

  const exportData = () => {
    if (store.filteredEarthquakes.length === 0) {
      if ($q && typeof $q.notify === 'function') {
        $q.notify({
          type: 'warning',
          message: 'No data to export',
          icon: 'warning',
          position: 'top',
        });
      }
      return;
    }

    exportEarthquakesToCSV(store.filteredEarthquakes);

    if ($q && typeof $q.notify === 'function') {
      $q.notify({
        type: 'positive',
        message: `Exported ${store.filteredEarthquakes.length} earthquakes`,
        icon: 'download',
        position: 'top',
        timeout: 2000,
      });
    }
  };

  // Watch for errors and show notifications
  watch(
    () => store.error,
    (newError) => {
      if (newError) {
        $q.notify({
          type: 'negative',
          message: `Error: ${newError}`,
          icon: 'error',
          position: 'top',
          timeout: 5000,
        });
      }
    },
  );

  const mapComponent = ref<ComponentPublicInstance<InstanceType<typeof EarthquakeMap>> | null>(
    null,
  );

  const switchToMap = () => {
    tab.value = 'map';
  };

  const onTabTransition = () => {
    // When switching to map tab, check if there's a pending earthquake to zoom to
    if (tab.value === 'map' && store.selectedEarthquakeForMap) {
      // Give the map component time to mount and become visible
      void nextTick();
    }
  };

  // Watch for tab changes to help trigger zoom
  watch(
    () => tab.value,
    () => {
      // Tab change detected - map component will handle zoom if needed
    },
  );

  let refreshTimer: ReturnType<typeof setInterval> | null = null;

  onMounted(() => {
    // Initial data fetch
    if (store.earthquakes.length === 0) {
      void store.fetchEarthquakes();
    }

    // Set up automatic refresh
    refreshTimer = setInterval(() => {
      void store.fetchEarthquakes();
    }, REFRESH_INTERVAL);
  });

  onUnmounted(() => {
    // Clean up interval on component unmount
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
  });

  return {
    tab,
    loading,
    error,
    filteredCount,
    exportData,
    mapComponent,
    switchToMap,
    onTabTransition,
  };
}
