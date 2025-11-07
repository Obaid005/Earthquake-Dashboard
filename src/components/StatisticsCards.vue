<template>
  <div class="row q-col-gutter-md q-mb-lg q-px-md">
    <div class="col-12 col-sm-6 col-md-3">
      <q-card class="stat-card stat-card-total" flat bordered>
        <q-card-section class="q-pa-md">
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-caption text-grey-7 q-mb-xs">Total Earthquakes</div>
              <div class="row items-baseline q-gutter-xs">
                <div class="text-h5 text-weight-bold stat-number">{{ totalCount }}</div>
              </div>
              <div class="text-caption text-grey-6 q-mt-xs">Last 7 days</div>
            </div>
            <div class="col-auto">
              <q-icon name="public" size="36px" color="primary" class="stat-icon-large" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-sm-6 col-md-3">
      <q-card class="stat-card stat-card-filtered" flat bordered>
        <q-card-section class="q-pa-md">
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-caption text-grey-7 q-mb-xs">Filtered Results</div>
              <div class="row items-baseline q-gutter-xs">
                <div class="text-h5 text-weight-bold stat-number">{{ filteredCount }}</div>
                <q-chip
                  v-if="filteredCount < totalCount"
                  size="sm"
                  color="orange"
                  text-color="white"
                  :label="`${((filteredCount / totalCount) * 100).toFixed(0)}%`"
                />
              </div>
              <div class="text-caption text-grey-6 q-mt-xs">Active filters</div>
            </div>
            <div class="col-auto">
              <q-icon name="filter_list" size="36px" color="orange" class="stat-icon-large" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-sm-6 col-md-3">
      <q-card class="stat-card stat-card-max" flat bordered>
        <q-card-section class="q-pa-md">
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-caption text-grey-7 q-mb-xs">Max Magnitude</div>
              <div class="row items-baseline q-gutter-xs">
                <div class="text-h5 text-weight-bold stat-number">
                  {{ maxMagnitude.toFixed(2) }}
                </div>
                <q-badge v-if="maxMagnitude >= 7" color="red" label="High" size="sm" />
              </div>
              <div class="text-caption text-grey-6 q-mt-xs">Highest recorded</div>
            </div>
            <div class="col-auto">
              <q-icon name="trending_up" size="36px" color="red" class="stat-icon-large" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-12 col-sm-6 col-md-3">
      <q-card class="stat-card stat-card-avg" flat bordered>
        <q-card-section class="q-pa-md">
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-caption text-grey-7 q-mb-xs">Avg Magnitude</div>
              <div class="row items-baseline q-gutter-xs">
                <div class="text-h5 text-weight-bold stat-number">
                  {{ avgMagnitude.toFixed(2) }}
                </div>
              </div>
              <div class="text-caption text-grey-6 q-mt-xs">Mean value</div>
            </div>
            <div class="col-auto">
              <q-icon name="show_chart" size="36px" color="blue" class="stat-icon-large" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useEarthquakeStore } from 'src/stores/earthquake';
import { calculateStatistics } from 'src/utils/statistics';

const store = useEarthquakeStore();

const totalCount = computed(() => store.earthquakes.length);
const filteredCount = computed(() => store.filteredEarthquakes.length);

const statistics = computed(() => calculateStatistics(store.filteredEarthquakes));
const maxMagnitude = computed(() => statistics.value.maxMagnitude);
const avgMagnitude = computed(() => statistics.value.avgMagnitude);
</script>

<style scoped>
.stat-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat-card .q-card-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 120px;
  overflow: hidden;
}

.stat-card .row.items-center.no-wrap {
  flex: 1;
  align-items: flex-start;
  min-width: 0;
}

.stat-card .col {
  min-width: 0;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.stat-number {
  transition: all 0.3s ease;
  font-variant-numeric: tabular-nums;
}

.stat-icon-large {
  opacity: 0.8;
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.stat-card:hover .stat-icon-large {
  opacity: 1;
  transform: scale(1.1);
}

.stat-card-total {
  border-left: 4px solid #1976d2;
}

.stat-card-filtered {
  border-left: 4px solid #ff9800;
}

.stat-card-max {
  border-left: 4px solid #f44336;
}

.stat-card-avg {
  border-left: 4px solid #2196f3;
}
</style>

