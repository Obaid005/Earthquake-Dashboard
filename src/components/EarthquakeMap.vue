<template>
  <q-card class="map-card" flat bordered>
    <q-card-section class="q-pa-lg">
      <div class="row items-center q-mb-md">
        <q-icon name="map" size="24px" color="primary" class="q-mr-sm" />
        <div class="text-h6 text-weight-medium">Interactive Earthquake Map</div>
        <q-space />
        <q-chip
          :label="`${filteredEarthquakes.length} markers`"
          color="green"
          text-color="white"
          size="sm"
        />
      </div>
      <div class="text-caption text-grey-7 q-mb-sm">
        Click on any marker to view earthquake details
      </div>
      <div v-if="store.loading && filteredEarthquakes.length === 0" class="map-loading q-pa-xl">
        <div class="text-center">
          <q-spinner color="primary" size="3em" />
          <div class="text-body2 text-grey-7 q-mt-md">Loading map data...</div>
        </div>
      </div>
      <div v-else-if="filteredEarthquakes.length === 0" class="map-empty q-pa-xl">
        <div class="text-center">
          <q-icon name="map" size="48px" color="grey-5" class="q-mb-md" />
          <div class="text-h6 text-grey-7">No earthquakes to display</div>
          <div class="text-body2 text-grey-6">Try adjusting your filters</div>
        </div>
      </div>
      <div v-else class="map-container">
        <ol-map ref="mapRef" class="ol-map map-container-inner" @click="handleMapClick">
          <ol-view :zoom="zoom" :center="center" :projection="projection" />
          <ol-tile-layer>
            <ol-source-osm />
          </ol-tile-layer>
          <ol-vector-layer :z-index="10">
            <ol-source-vector ref="vectorSource" />
          </ol-vector-layer>
        </ol-map>
      </div>
    </q-card-section>

    <!-- Map Legend -->
    <map-legend />
  </q-card>

  <!-- Map Popup -->
  <map-popup v-model="showPopup" :earthquake="selectedEarthquake" />
</template>

<script setup lang="ts">
import MapLegend from 'src/components/MapLegend.vue';
import MapPopup from 'src/components/MapPopup.vue';
import { useEarthquakeMap } from 'src/composables/useEarthquakeMap';

const {
  mapRef,
  vectorSource,
  zoom,
  center,
  projection,
  showPopup,
  selectedEarthquake,
  filteredEarthquakes,
  handleMapClick,
  store,
} = useEarthquakeMap();
</script>

<style scoped lang="scss">
@import 'src/styles/earthquakeMap.scss';
</style>
