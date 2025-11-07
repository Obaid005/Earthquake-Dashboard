import { computed } from 'vue';
import type { MapPopupProps } from 'src/types/components';

export function useMapPopup(
  props: MapPopupProps,
  emit: {
    (e: 'update:modelValue', value: boolean): void;
  },
) {
  const showPopup = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });

  return {
    showPopup,
  };
}

