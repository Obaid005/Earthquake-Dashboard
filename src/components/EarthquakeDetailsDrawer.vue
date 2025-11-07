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
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import type { EarthquakeDetailsDrawerProps } from 'src/types/components';
import { formatNumber, formatTime, formatRelativeTime } from 'src/utils/formatters';
import { getMagnitudeBadgeColor } from 'src/utils/magnitude';
import { useEarthquakeStore } from 'src/stores/earthquake';
import InfoRow from 'src/components/InfoRow.vue';

const props = defineProps<EarthquakeDetailsDrawerProps>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'view-on-map': [];
}>();

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
</script>

<style scoped>
.earthquake-details-drawer {
  background: white;
}

.earthquake-details-drawer :deep(.q-drawer) {
  z-index: 3000 !important;
  top: 0 !important;
  height: 100vh !important;
}

.earthquake-details-drawer :deep(.q-drawer__backdrop) {
  z-index: 2999 !important;
}

.earthquake-details-drawer :deep(.q-drawer__content) {
  top: 0 !important;
  margin-top: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
  height: 100vh !important;
}

.earthquake-details-drawer :deep(.drawer-scroll-area) {
  padding: 0 !important;
  padding-bottom: 0 !important;
  height: 100vh !important;
  max-height: 100vh !important;
}

.earthquake-details-drawer :deep(.drawer-scroll-area .q-scrollarea__content) {
  padding: 0 !important;
  margin: 0 !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.earthquake-details-drawer :deep(.drawer-scroll-area .q-scrollarea__container) {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.drawer-content {
  padding: 24px 24px 0 24px;
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

.drawer-header {
  padding-top: 16px;
  padding-bottom: 16px;
  background: white;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin: -24px -24px 24px -24px;
  padding-left: 24px;
  padding-right: 24px;
}

.earthquake-details-drawer :deep(.q-drawer) {
  z-index: 3000 !important;
  position: fixed !important;
  top: 0 !important;
  height: 100vh !important;
  padding: 0 !important;
  padding-bottom: 0 !important;
}

@media (max-width: 1023px) {
  .earthquake-details-drawer :deep(.q-drawer) {
    left: auto !important;
    right: 0 !important;
    max-height: 100vh !important;
    transform: none !important;
  }

  .earthquake-details-drawer :deep(.q-drawer__content) {
    top: 0 !important;
    margin-top: 0 !important;
    padding-top: 0 !important;
    height: 100vh !important;
    max-height: 100vh !important;
    overflow-y: auto !important;
  }

  .earthquake-details-drawer :deep(.q-drawer__backdrop) {
    z-index: 2999 !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    height: 100vh !important;
  }

  .drawer-header {
    padding-top: 16px;
  }

  .drawer-content {
    padding: 16px 16px 0 16px;
  }

  .drawer-actions {
    padding-bottom: 12px;
    margin-bottom: 0;
  }

  .detail-section {
    padding: 8px 0;
  }

  .detail-row {
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .detail-text {
    word-break: break-word;
    flex: 1;
    min-width: 0;
  }
}

.detail-section {
  padding: 12px 0;
}

.drawer-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 0;
  gap: 8px;
}

.drawer-actions .q-btn {
  flex: 1;
  min-height: 40px;
  padding: 8px 16px;
  white-space: nowrap;
}

.view-on-map-btn .btn-label-short {
  display: none;
}

@media (max-width: 599px) {
  .drawer-actions {
    flex-direction: column;
    gap: 12px;
  }

  .drawer-actions .q-btn {
    width: 100%;
    min-height: 44px;
    padding: 10px 16px;
  }

  .close-btn {
    display: none;
  }
}

.magnitude-badge-large {
  font-weight: 700;
  font-size: 1.1rem;
  padding: 8px 16px;
  border-radius: 16px;
}
</style>
