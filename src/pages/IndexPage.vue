<template>
  <q-page class="dashboard-page">
    <div class="page-container">
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
import EarthquakeFilters from 'src/components/EarthquakeFilters.vue';
import EarthquakeTable from 'src/components/EarthquakeTable.vue';
import EarthquakeChart from 'src/components/EarthquakeChart.vue';
import EarthquakeMap from 'src/components/EarthquakeMap.vue';
import StatisticsCards from 'src/components/StatisticsCards.vue';
import ActiveFilterChips from 'src/components/ActiveFilterChips.vue';
import { useIndexPage } from 'src/composables/useIndexPage';
import { useEarthquakeStore } from 'src/stores/earthquake';

const {
  tab,
  loading,
  error,
  filteredCount,
  exportData,
  mapComponent,
  switchToMap,
  onTabTransition,
} = useIndexPage();
const store = useEarthquakeStore();
</script>

<style scoped lang="scss">
@import 'src/styles/indexPage.scss';
</style>
