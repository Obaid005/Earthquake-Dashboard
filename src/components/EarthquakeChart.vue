<template>
  <q-card class="chart-card" flat bordered>
    <q-card-section class="q-pa-lg">
      <div class="row items-center q-mb-md">
        <q-icon name="show_chart" size="24px" color="primary" class="q-mr-sm" />
        <div class="text-h6 text-weight-medium">Magnitude Over Time</div>
        <q-space />
        <q-chip
          :label="`${store.filteredEarthquakes.length} data points`"
          color="blue"
          text-color="white"
          size="sm"
        />
      </div>
      <div v-if="store.loading && store.filteredEarthquakes.length === 0" class="text-center q-pa-lg">
        <q-spinner color="primary" size="3em" />
        <div class="text-body2 text-grey-7 q-mt-md">Loading chart data...</div>
      </div>
      <v-chart
        v-else-if="chartOption"
        class="chart"
        :option="chartOption"
        :loading="store.loading"
        autoresize
      />
      <div v-else class="text-center q-pa-lg">
        <q-icon name="info" size="48px" color="grey-5" class="q-mb-md" />
        <div class="text-h6 text-grey-7">No data available</div>
        <div class="text-body2 text-grey-6">Try adjusting your filters</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import VChart from 'vue-echarts';
import { useEarthquakeChart } from 'src/composables/useEarthquakeChart';
import { useEarthquakeStore } from 'src/stores/earthquake';

const { chartOption } = useEarthquakeChart();
const store = useEarthquakeStore();
</script>

<style scoped lang="scss">
@import 'src/styles/earthquakeCharts.scss';
</style>
