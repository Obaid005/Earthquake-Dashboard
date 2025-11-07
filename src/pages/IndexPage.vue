<template>
  <q-page class="dashboard-page">
    <div class="page-container" style="position: relative">
      <!-- Loading Overlay -->
      <q-inner-loading :showing="loading" color="primary">
        <q-spinner-gears size="50px" color="primary" />
        <div class="text-h6 q-mt-md">Loading earthquake data...</div>
      </q-inner-loading>

      <!-- Statistics Cards -->
      <statistics-cards />

      <!-- Filters Section -->
      <div class="q-px-md q-mb-md">
        <earthquake-filters />

        <!-- Active Filter Chips & Export -->
        <div class="row items-center justify-between q-mt-md q-gutter-md">
          <active-filter-chips />
          <div class="col-12 col-sm-auto text-right">
            <q-btn
              flat
              size="sm"
              color="primary"
              label="Export Data"
              icon="download"
              :disable="filteredCount === 0"
              @click="exportData"
            />
          </div>
        </div>
      </div>

      <!-- Error Banner -->
      <div v-if="error" class="q-px-md q-mb-md">
        <q-banner class="bg-negative text-white" rounded>
          <template #avatar>
            <q-icon name="error" size="2em" />
          </template>
          <div class="text-h6">Error loading earthquake data</div>
          <div class="text-body2">{{ error }}</div>
          <template #action>
            <q-btn flat dense label="Retry" icon="refresh" @click="store.fetchEarthquakes()" />
          </template>
        </q-banner>
      </div>

      <!-- Tabs Section -->
      <div class="q-px-md">
        <q-tabs
          v-model="tab"
          class="custom-tabs q-mb-md"
          align="left"
          active-color="primary"
          indicator-color="primary"
          narrow-indicator
          breakpoint="0"
        >
          <q-tab
            name="table"
            label="Table View"
            icon="table_chart"
            class="tab-button"
            :ripple="false"
          />
          <q-tab
            name="chart"
            label="Chart View"
            icon="show_chart"
            class="tab-button"
            :ripple="false"
          />
          <q-tab name="map" label="Map View" icon="map" class="tab-button" :ripple="false" />
        </q-tabs>

        <q-tab-panels v-model="tab" class="tab-panels" @transition="onTabTransition">
          <q-tab-panel name="table" class="q-pa-none">
            <earthquake-table @view-on-map="switchToMap" />
          </q-tab-panel>

          <q-tab-panel name="chart" class="q-pa-none">
            <earthquake-chart />
          </q-tab-panel>

          <q-tab-panel name="map" class="q-pa-none">
            <earthquake-map ref="mapComponent" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useQuasar } from 'quasar';
import { useEarthquakeStore } from 'src/stores/earthquake';
import { REFRESH_INTERVAL } from 'src/utils/constants';
import { exportEarthquakesToCSV } from 'src/utils/export';
import EarthquakeFilters from 'src/components/EarthquakeFilters.vue';
import EarthquakeTable from 'src/components/EarthquakeTable.vue';
import EarthquakeChart from 'src/components/EarthquakeChart.vue';
import EarthquakeMap from 'src/components/EarthquakeMap.vue';
import StatisticsCards from 'src/components/StatisticsCards.vue';
import ActiveFilterChips from 'src/components/ActiveFilterChips.vue';

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

const mapComponent = ref<InstanceType<typeof EarthquakeMap> | null>(null);

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
</script>

<style scoped>
.dashboard-page {
  background: linear-gradient(to bottom, #f5f7fa 0%, #ffffff 200px);
  min-height: 100vh;
  padding-bottom: 32px;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 50px 24px 32px 24px;
}

@media (max-width: 768px) {
  .page-container {
    padding: 0 16px 24px 16px;
  }

  .dashboard-page {
    padding-bottom: 24px;
  }
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-top: 8px;
}

.hero-highlight {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.hero-badge {
  display: inline-block;
}

.hero-footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-section {
    padding: 24px !important;
  }
}

.custom-tabs {
  background: white;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.tab-button {
  border-radius: 8px;
  margin: 0 4px;
  transition: all 0.2s ease;
}

.tab-button:hover {
  background: rgba(25, 118, 210, 0.08);
}

.tab-panels {
  background: transparent;
  position: relative;
  isolation: isolate;
}

.tab-panels :deep(.q-tab-panel) {
  position: relative;
}
</style>
