<template>
  <q-dialog v-model="showPopup" position="top" class="earthquake-popup">
    <q-card v-if="earthquake" class="popup-card">
      <q-card-section class="popup-header">
        <div class="row items-center">
          <q-icon name="warning" size="32px" color="red" class="q-mr-md" />
          <div>
            <div class="text-h6 text-weight-bold">Earthquake Alert</div>
            <div class="text-caption text-grey-7">Click marker for details</div>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <info-row
          icon="place"
          icon-color="primary"
          label="Location"
          :value="earthquake.place"
          value-class="text-body1 text-weight-medium"
        />
        <info-row icon="trending_up" icon-color="orange" label="Magnitude" spacing="medium">
          <div class="row items-center">
            <q-badge
              :color="getMagnitudeBadgeColor(earthquake.magnitude)"
              :label="earthquake.magnitude.toFixed(2)"
              class="q-mr-sm"
            />
            <span class="text-body2 text-grey-7">Richter Scale</span>
          </div>
        </info-row>
        <info-row
          icon="schedule"
          icon-color="blue"
          label="Time"
          :value="formatTime(earthquake.time)"
        />
        <info-row
          icon="vertical_align_bottom"
          icon-color="green"
          label="Depth"
          :value="`${earthquake.depth.toFixed(2)} km`"
          spacing="none"
        />
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Close" color="primary" icon="close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import type { MapPopupProps } from 'src/types/components';
import { getMagnitudeBadgeColor } from 'src/utils/magnitude';
import { formatTime } from 'src/utils/formatters';
import InfoRow from 'src/components/InfoRow.vue';
import { useMapPopup } from 'src/composables/useMapPopup';

const props = defineProps<MapPopupProps>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const { showPopup } = useMapPopup(props, emit);
</script>

<style scoped lang="scss">
@import 'src/styles/mapPopup.scss';
</style>
