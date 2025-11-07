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
import { useStatisticsCards } from 'src/composables/useStatisticsCards';

const { totalCount, filteredCount, maxMagnitude, avgMagnitude } = useStatisticsCards();
</script>

<style scoped lang="scss">
@import 'src/styles/statisticsCards.scss';
</style>

