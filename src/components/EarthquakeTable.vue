<template>
  <div class="table-container">
    <div class="table-header q-pa-md">
      <div class="row items-center">
        <q-icon name="table_chart" size="24px" color="primary" class="q-mr-sm" />
        <div class="text-h6 text-weight-medium">Earthquake Data Table</div>
        <q-space />
        <q-chip
          :label="`${filteredEarthquakes.length} results`"
          color="primary"
          text-color="white"
          size="sm"
        />
      </div>
    </div>
    <div class="table-content q-pa-md q-pt-none">
      <q-table
        v-model:pagination="pagination"
        :rows="filteredEarthquakes"
        :columns="earthquakeTableColumns"
        :loading="loading"
        :loading-label="loading ? 'Loading earthquake data...' : undefined"
        row-key="id"
        :rows-per-page-options="[10, 25, 50, 100]"
        flat
        bordered
        class="earthquake-table"
        :grid="$q.screen.lt.sm"
        separator="horizontal"
        no-data-label="No earthquakes found"
        @row-click="(evt, row) => openDetails(row)"
      >
        <template #body-cell-place="props">
          <q-td :props="props">
            <div class="row items-center">
              <q-icon name="place" size="16px" color="grey-6" class="q-mr-sm" />
              <span class="text-weight-medium">{{
                props.row.place || props.value || 'Unknown'
              }}</span>
            </div>
          </q-td>
        </template>
        <template #body-cell-magnitude="props">
          <q-td :props="props">
            <q-badge
              :color="getMagnitudeColor(getNumericValue(props.row.magnitude, props.value))"
              :label="formatNumber(getNumericValue(props.row.magnitude, props.value), 2)"
              class="magnitude-badge"
            />
          </q-td>
        </template>
        <template #body-cell-time="props">
          <q-td :props="props">
            <div class="row items-center">
              <q-icon name="schedule" size="14px" color="grey-6" class="q-mr-xs" />
              <span>{{ formatTime(getNumericValue(props.row.time, props.value)) }}</span>
            </div>
          </q-td>
        </template>
        <template #body-cell-depth="props">
          <q-td :props="props">
            <div class="row items-center justify-end">
              <q-icon name="vertical_align_bottom" size="14px" color="grey-6" class="q-mr-xs" />
              <span>{{ formatNumber(getNumericValue(props.row.depth, props.value), 2) }} km</span>
            </div>
          </q-td>
        </template>
        <template #no-data>
          <div class="full-width row justify-center text-grey q-pa-lg">
            <div class="text-center">
              <q-icon name="info" size="48px" class="q-mb-md" />
              <div class="text-h6">No earthquakes found</div>
              <div class="text-body2">Try adjusting your filters</div>
            </div>
          </div>
        </template>
        <template #item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <q-card class="earthquake-card q-mb-sm" flat bordered @click="openDetails(props.row)">
              <q-card-section class="q-pa-md">
                <!-- Header with Magnitude Badge -->
                <div class="row items-center justify-between q-mb-sm">
                  <q-badge
                    :color="getMagnitudeColor(props.row.magnitude)"
                    :label="formatNumber(props.row.magnitude, 2)"
                    class="magnitude-badge-card"
                  />
                  <q-icon name="chevron_right" size="20px" color="grey-5" />
                </div>

                <!-- Location -->
                <div class="row items-center q-mb-xs">
                  <q-icon name="place" size="16px" color="primary" class="q-mr-xs" />
                  <div class="text-body2 text-weight-medium text-grey-9">
                    {{ props.row.place || 'Unknown' }}
                  </div>
                </div>

                <q-separator class="q-my-sm" />

                <!-- Time -->
                <div class="row items-center q-mb-xs">
                  <q-icon name="schedule" size="14px" color="grey-6" class="q-mr-xs" />
                  <div class="text-caption text-grey-7">
                    {{ formatTime(props.row.time) }}
                  </div>
                </div>

                <!-- Depth -->
                <div class="row items-center justify-between">
                  <div class="row items-center">
                    <q-icon
                      name="vertical_align_bottom"
                      size="14px"
                      color="grey-6"
                      class="q-mr-xs"
                    />
                    <div class="text-caption text-grey-7">
                      {{ formatNumber(props.row.depth, 2) }} km
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </div>

  <!-- Earthquake Details Drawer -->
  <earthquake-details-drawer
    v-model="drawerOpen"
    :earthquake="selectedEarthquake"
    @view-on-map="viewOnMap"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useEarthquakeStore } from 'src/stores/earthquake';
import type { Earthquake } from 'src/types/earthquake';
import { formatNumber, formatTime, getNumericValue } from 'src/utils/formatters';
import { getMagnitudeColor } from 'src/utils/magnitude';
import { earthquakeTableColumns } from 'src/utils/tableColumns';
import EarthquakeDetailsDrawer from 'src/components/EarthquakeDetailsDrawer.vue';

const emit = defineEmits<{
  (e: 'view-on-map'): void;
}>();

const store = useEarthquakeStore();

const filteredEarthquakes = computed(() => store.filteredEarthquakes);
const loading = computed(() => store.loading);

const drawerOpen = ref(false);
const selectedEarthquake = ref<Earthquake | null>(null);

const openDetails = (earthquake: Earthquake) => {
  selectedEarthquake.value = earthquake;
  drawerOpen.value = true;
};

const viewOnMap = () => {
  emit('view-on-map');
};

const pagination = ref({
  sortBy: '',
  descending: false,
  page: 1,
  rowsPerPage: 25,
});
</script>

<style scoped>
.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  isolation: isolate;
}

.table-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.table-content {
  background: transparent;
}

/* On mobile, remove the outer card styling */
@media (max-width: 599px) {
  .table-container {
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  }

  .table-header {
    background: white;
    border-radius: 12px 12px 0 0;
    margin-bottom: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .table-content {
    padding: 0;
  }
}

.earthquake-table :deep(.q-table__top) {
  padding: 0;
}

.earthquake-table :deep(.q-table thead tr th) {
  background-color: #f5f7fa;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
}

.earthquake-table :deep(.q-table tbody tr) {
  transition: background-color 0.2s ease;
}

.earthquake-table :deep(.q-table tbody tr:hover) {
  background-color: #f5f7fa;
}

.magnitude-badge {
  font-weight: 600;
  font-size: 0.85rem;
  padding: 4px 12px;
  border-radius: 12px;
}

.earthquake-table :deep(tbody tr) {
  cursor: pointer;
}

/* Mobile Grid Card Styles */
.earthquake-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.earthquake-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border-color: rgba(25, 118, 210, 0.3);
}

.earthquake-card:active {
  transform: translateY(0);
}

.magnitude-badge-card {
  font-weight: 600;
  font-size: 0.9rem;
  padding: 6px 14px;
  border-radius: 8px;
  min-width: 50px;
  text-align: center;
}

.earthquake-table :deep(.q-table__grid-content) {
  padding: 8px;
}

.earthquake-table :deep(.q-table__grid-item) {
  padding: 0;
}
</style>
