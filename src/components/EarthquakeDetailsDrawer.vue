<template>
  <q-drawer
    v-model="drawerOpen"
    side="right"
    :width="drawerWidth"
    :breakpoint="0"
    overlay
    bordered
    class="earthquake-details-drawer"
  >
    <q-scroll-area class="fit drawer-scroll-area">
      <div v-if="earthquake" class="drawer-content">
        <div class="drawer-header">
          <div class="row items-center">
            <q-icon name="info" size="32px" color="primary" class="q-mr-md" />
            <div class="text-h6 text-weight-bold">Earthquake Details</div>
            <q-space />
            <q-btn flat round dense icon="close" @click="closeDrawer" />
          </div>
          <div class="text-caption text-grey-6 q-mt-xs q-ml-md">Powered by USGS</div>
        </div>

        <div class="detail-section q-mb-lg q-mt-md">
          <info-row
            icon="place"
            icon-color="primary"
            label="Location"
            :value="earthquake.place"
            value-class="text-body1 text-weight-medium detail-text"
          />
        </div>

        <div class="detail-section q-mb-lg">
          <info-row icon="" label="Magnitude" spacing="small">
            <q-badge
              :color="getMagnitudeBadgeColor(earthquake.magnitude)"
              :label="formatNumber(earthquake.magnitude, 2)"
              class="magnitude-badge-large"
            />
          </info-row>
        </div>

        <div class="detail-section q-mb-lg">
          <info-row
            icon="schedule"
            icon-color="grey-6"
            label="Time"
            :value="formatTime(earthquake.time)"
            value-class="text-body1 detail-text"
          />
          <div class="text-caption text-grey-6 q-ml-md detail-text">
            {{ formatRelativeTime(earthquake.time) }}
          </div>
        </div>

        <div class="detail-section q-mb-lg">
          <info-row
            icon="vertical_align_bottom"
            icon-color="grey-6"
            label="Depth"
            :value="`${formatNumber(earthquake.depth, 2)} km`"
            value-class="text-body1 detail-text"
          />
        </div>

        <div class="detail-section q-mb-sm">
          <info-row
            icon="explore"
            icon-color="grey-6"
            label="Coordinates"
            value-class="text-body2 detail-text"
          >
            <div>
              <div>Latitude: {{ formatNumber(earthquake.latitude, 4) }}°</div>
              <div>Longitude: {{ formatNumber(earthquake.longitude, 4) }}°</div>
            </div>
          </info-row>
        </div>

        <q-separator class="q-my-sm" />

        <div class="drawer-actions">
          <q-btn color="primary" unelevated class="view-on-map-btn" @click="handleViewOnMap">
            <span class="btn-label-full">View on Map</span>
          </q-btn>
          <q-space />
          <q-btn flat color="grey-7" label="Close" class="close-btn" @click="closeDrawer" />
        </div>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import type { EarthquakeDetailsDrawerProps } from 'src/types/components';
import { formatNumber, formatTime, formatRelativeTime } from 'src/utils/formatters';
import { getMagnitudeBadgeColor } from 'src/utils/magnitude';
import InfoRow from 'src/components/InfoRow.vue';
import { useEarthquakeDetailsDrawer } from 'src/composables/useEarthquakeDetailsDrawer';

const props = defineProps<EarthquakeDetailsDrawerProps>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'view-on-map': [];
}>();

const { drawerOpen, drawerWidth, closeDrawer, handleViewOnMap } = useEarthquakeDetailsDrawer(
  props,
  emit,
);
</script>

<style scoped lang="scss">
@import 'src/styles/earthquakeDetailsDrawer.scss';
</style>
