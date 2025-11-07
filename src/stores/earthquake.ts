import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import type { Earthquake, EarthquakeGeoJSON, EarthquakeFilters } from 'src/types/earthquake';
import { USGS_API_URL } from 'src/utils/constants';

const STORAGE_KEY = 'earthquake-filters';

const loadFiltersFromStorage = (): EarthquakeFilters => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as EarthquakeFilters;
      return {
        magnitudeMin: parsed.magnitudeMin ?? null,
        magnitudeMax: parsed.magnitudeMax ?? null,
        locationText: parsed.locationText ?? '',
      };
    }
  } catch {
    // Silently handle localStorage errors
  }
  return {
    magnitudeMin: null,
    magnitudeMax: null,
    locationText: '',
  };
};

const saveFiltersToStorage = (filters: EarthquakeFilters) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch {
    // Silently handle localStorage errors
  }
};

export const useEarthquakeStore = defineStore('earthquake', () => {
  const earthquakes = ref<Earthquake[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const filters = ref<EarthquakeFilters>(loadFiltersFromStorage());

  const fetchEarthquakes = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get<EarthquakeGeoJSON>(USGS_API_URL);

      earthquakes.value = response.data.features
        .map((feature, index) => ({
          id: String(feature.id || `eq-${index}-${feature.properties.time}`),
          place: String(feature.properties.place || 'Unknown'),
          magnitude: Number(feature.properties.mag) || 0,
          time: Number(feature.properties.time) || Date.now(),
          longitude: Number(feature.geometry.coordinates[0]) || 0,
          latitude: Number(feature.geometry.coordinates[1]) || 0,
          depth: Number(feature.geometry.coordinates[2]) || 0,
        }))
        .filter((eq) => eq.magnitude > 0); // Only filter out earthquakes with no magnitude
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch earthquake data';
    } finally {
      loading.value = false;
    }
  };

  const filteredEarthquakes = computed(() => {
    let filtered = [...earthquakes.value];

    // Filter by magnitude range
    if (filters.value.magnitudeMin !== null) {
      filtered = filtered.filter((eq) => eq.magnitude >= filters.value.magnitudeMin!);
    }
    if (filters.value.magnitudeMax !== null) {
      filtered = filtered.filter((eq) => eq.magnitude <= filters.value.magnitudeMax!);
    }

    // Filter by location text
    const locationText = filters.value.locationText?.trim();
    if (locationText) {
      const searchText = locationText.toLowerCase();
      filtered = filtered.filter((eq) => eq.place.toLowerCase().includes(searchText));
    }

    return filtered;
  });

  const updateFilters = (newFilters: Partial<EarthquakeFilters>) => {
    filters.value = { ...filters.value, ...newFilters };
    saveFiltersToStorage(filters.value);
  };

  const selectedEarthquakeForMap = ref<Earthquake | null>(null);

  return {
    earthquakes,
    loading,
    error,
    filters,
    filteredEarthquakes,
    fetchEarthquakes,
    updateFilters,
    selectedEarthquakeForMap,
  };
});
