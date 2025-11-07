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
import { computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  ToolboxComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import { useEarthquakeStore } from 'src/stores/earthquake';
import { createChartOption } from 'src/utils/chartConfig';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  ToolboxComponent,
]);

const store = useEarthquakeStore();

const chartOption = computed(() => createChartOption(store.filteredEarthquakes));
</script>

<style scoped>
.chart-card {
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.chart {
  height: 600px;
  width: 100%;
  border-radius: 8px;
}
</style>
