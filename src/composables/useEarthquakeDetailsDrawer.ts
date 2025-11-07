import { computed } from 'vue';
import { useQuasar } from 'quasar';
import type { EarthquakeDetailsDrawerProps } from 'src/types/components';
import { useEarthquakeStore } from 'src/stores/earthquake';

export function useEarthquakeDetailsDrawer(
  props: EarthquakeDetailsDrawerProps,
  emit: {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'view-on-map'): void;
  },
) {
  const $q = useQuasar();
  const store = useEarthquakeStore();

  const drawerOpen = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });

  const drawerWidth = computed(() => {
    const screenWidth = window.innerWidth;

    if ($q.screen.xs) {
      return Math.min(screenWidth * 0.9, 320);
    } else if ($q.screen.sm) {
      return Math.min(screenWidth * 0.85, 380);
    } else if ($q.screen.md) {
      return 380;
    } else {
      return 400;
    }
  });

  const closeDrawer = () => {
    drawerOpen.value = false;
  };

  const handleViewOnMap = () => {
    if (props.earthquake) {
      store.selectedEarthquakeForMap = props.earthquake;
    }
    closeDrawer();
    emit('view-on-map');
  };

  return {
    drawerOpen,
    drawerWidth,
    closeDrawer,
    handleViewOnMap,
  };
}
