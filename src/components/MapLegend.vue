<template>
  <q-card-section class="q-pt-none">
    <div class="map-legend">
      <div class="text-caption text-weight-bold q-mb-xs">Magnitude Scale:</div>
      <div class="row q-gutter-sm">
        <div class="col-auto">
          <div class="row items-center">
            <div class="legend-marker legend-marker-minor"></div>
            <span class="text-caption q-ml-xs">&lt; 3.0</span>
          </div>
        </div>
        <div class="col-auto">
          <div class="row items-center">
            <div class="legend-marker legend-marker-low"></div>
            <span class="text-caption q-ml-xs">3.0 - 5.0</span>
          </div>
        </div>
        <div class="col-auto">
          <div class="row items-center">
            <div class="legend-marker legend-marker-medium"></div>
            <span class="text-caption q-ml-xs">5.0 - 7.0</span>
          </div>
        </div>
        <div class="col-auto">
          <div class="row items-center">
            <div class="legend-marker legend-marker-high"></div>
            <span class="text-caption q-ml-xs">≥ 7.0</span>
          </div>
        </div>
      </div>
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { MAGNITUDE_LEGEND_COLORS } from 'src/utils/magnitude';

const colors = MAGNITUDE_LEGEND_COLORS;
</script>

<style scoped lang="scss">
@import 'src/styles/mapLegend.scss';

.legend-marker-minor {
  background: v-bind('colors.MINOR');
}

.legend-marker-low {
  background: v-bind('colors.LOW');
}

.legend-marker-medium {
  background: v-bind('colors.MEDIUM');
}

.legend-marker-high {
  background: v-bind('colors.HIGH');
}
</style>
