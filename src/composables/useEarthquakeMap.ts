import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useEarthquakeStore } from 'src/stores/earthquake';
import type { Earthquake } from 'src/types/earthquake';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import type Map from 'ol/Map';
import type VectorSource from 'ol/source/Vector';
import type { FeatureLike } from 'ol/Feature';
import type { MapRef, VectorSourceRef } from 'src/types/map';
import { getMagnitudeColor, getMarkerRadius } from 'src/utils/magnitude';
import { isValidCoordinate } from 'src/utils/validation';

export function useEarthquakeMap() {
  const store = useEarthquakeStore();

  const mapRef = ref<MapRef | null>(null);
  const vectorSource = ref<VectorSourceRef | null>(null);
  const zoom = ref(2);
  const center = ref(fromLonLat([0, 0]));
  const projection = ref('EPSG:3857');
  const showPopup = ref(false);
  const selectedEarthquake = ref<Earthquake | null>(null);

  const filteredEarthquakes = computed(() => store.filteredEarthquakes);

  function createPoint(earthquake: Earthquake): Point {
    const lon = Number(earthquake.longitude);
    const lat = Number(earthquake.latitude);

    if (!isValidCoordinate(lon, lat)) {
      return new Point(fromLonLat([0, 0]));
    }

    return new Point(fromLonLat([lon, lat]));
  }

  async function handleMapClick(event: unknown) {
    // Wait for map to be ready
    const mapReady = await waitForMapReady(5, 50);
    if (!mapReady) {
      return;
    }

    const { map } = mapReady;

    try {
      // The event from vue3-openlayers should have pixel property
      const mapEvent = event as {
        coordinate?: number[];
        pixel?: number[];
        originalEvent?: MouseEvent;
      };
      let pixel = mapEvent?.pixel;

      // If pixel is not directly available, try to get it from the original event
      if (!pixel && mapEvent.originalEvent) {
        const viewport = map.getViewport();
        if (viewport) {
          const rect = viewport.getBoundingClientRect();
          pixel = [
            mapEvent.originalEvent.clientX - rect.left,
            mapEvent.originalEvent.clientY - rect.top,
          ];
        }
      }

      if (!pixel) {
        return;
      }

      // Use forEachFeatureAtPixel to find features at the clicked location
      let clickedFeature: FeatureLike | null = null;
      map.forEachFeatureAtPixel(
        pixel,
        (feature) => {
          if (!clickedFeature && feature) {
            clickedFeature = feature;
          }
          return true; // Stop after first feature
        },
        {
          hitTolerance: 10, // Increase hit tolerance for easier clicking (in pixels)
          layerFilter: () => true, // Check all layers
        },
      );

      // Check if clickedFeature is a Feature instance (not RenderFeature)
      // Only Feature instances have the 'get' method
      if (clickedFeature) {
        const feature = clickedFeature as Feature;
        if ('get' in feature && typeof feature.get === 'function') {
          const earthquake = feature.get('earthquake');
          if (earthquake) {
            selectedEarthquake.value = earthquake;
            showPopup.value = true;
          }
        }
      }
    } catch {
      // Silently handle errors
    }
  }

  // Helper function to wait for map and source to be ready
  async function waitForMapReady(
    maxRetries = 20,
    delay = 150,
  ): Promise<{ source: VectorSource<Feature>; map: Map } | null> {
    for (let i = 0; i < maxRetries; i++) {
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Try multiple ways to access the source and map
      const sourceRef = vectorSource.value;
      const mapRefValue = mapRef.value;

      const source = (sourceRef?.$source || sourceRef?.source) as VectorSource<Feature> | undefined;
      const map = (mapRefValue?.$map || mapRefValue?.map) as Map | undefined;

      if (source && map) {
        return { source, map };
      }

      // Also try direct access if refs are the objects themselves
      if (vectorSource.value && 'getFeatures' in vectorSource.value) {
        const directSource = vectorSource.value as unknown as VectorSource<Feature>;
        const directMap = mapRef.value as unknown as Map;
        if (directSource && directMap) {
          return { source: directSource, map: directMap };
        }
      }
    }
    return null;
  }

  // Function to update features on the map
  async function updateMapFeatures(newEarthquakes: typeof filteredEarthquakes.value) {
    const mapReady = await waitForMapReady(20, 150);

    if (!mapReady) {
      return;
    }

    const { source, map } = mapReady;

    // Clear existing features
    source.clear();

    if (newEarthquakes.length > 0) {
      const features: Feature[] = [];

      // Add features with proper styling
      newEarthquakes.forEach((eq) => {
        try {
          const geometry = createPoint(eq);
          const feature = new Feature({
            geometry: geometry,
          });

          // Store earthquake data in feature properties
          feature.set('earthquake', eq);

          // Apply style with cursor pointer hint
          const style = new Style({
            image: new Circle({
              radius: getMarkerRadius(eq.magnitude),
              fill: new Fill({ color: getMagnitudeColor(eq.magnitude) }),
              stroke: new Stroke({ color: '#fff', width: 2 }),
            }),
          });
          feature.setStyle(style);

          // Ensure feature is interactive
          feature.set('interactive', true);

          source.addFeature(feature);
          features.push(feature);
        } catch {
          // Silently handle errors
        }
      });

      // Wait a bit for features to be added
      await nextTick();
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Calculate extent and fit view
      if (features.length > 0) {
        const extent = source.getExtent();

        if (extent && extent.length === 4 && extent[0] !== Infinity && extent[1] !== Infinity) {
          const view = map.getView();

          // Fit the view to show all features
          view.fit(extent, {
            padding: [50, 50, 50, 50],
            duration: 500,
            maxZoom: 15,
          });
        } else {
          // Fallback: calculate from coordinates
          const validCoords = newEarthquakes.filter((eq) =>
            isValidCoordinate(Number(eq.longitude), Number(eq.latitude)),
          );
          const lons = validCoords.map((eq) => Number(eq.longitude));
          const lats = validCoords.map((eq) => Number(eq.latitude));

          if (lons.length > 0 && lats.length > 0) {
            const minLon = Math.min(...lons);
            const maxLon = Math.max(...lons);
            const minLat = Math.min(...lats);
            const maxLat = Math.max(...lats);

            const avgLon = (minLon + maxLon) / 2;
            const avgLat = (minLat + maxLat) / 2;

            center.value = fromLonLat([avgLon, avgLat]);

            const lonRange = maxLon - minLon;
            const latRange = maxLat - minLat;
            const maxRange = Math.max(lonRange, latRange);

            if (maxRange > 0) {
              if (maxRange > 180) zoom.value = 2;
              else if (maxRange > 90) zoom.value = 3;
              else if (maxRange > 45) zoom.value = 4;
              else if (maxRange > 20) zoom.value = 5;
              else if (maxRange > 10) zoom.value = 6;
              else if (maxRange > 5) zoom.value = 7;
              else if (maxRange > 2) zoom.value = 8;
              else zoom.value = 9;
            }
          }
        }
      }
    }
  }

  // Function to zoom to a specific earthquake
  async function zoomToEarthquake(earthquake: Earthquake) {
    const mapReady = await waitForMapReady(20, 150);
    if (!mapReady) {
      return;
    }

    const { map } = mapReady;
    const view = map.getView();

    // Validate coordinates
    const lon = Number(earthquake.longitude);
    const lat = Number(earthquake.latitude);

    if (!isValidCoordinate(lon, lat)) {
      return;
    }

    const coordinate = fromLonLat([lon, lat]);

    const zoomLevel = 11;

    view.animate({
      center: coordinate,
      zoom: zoomLevel,
      duration: 800,
    });
  }

  // Function to handle zooming to selected earthquake
  async function handleZoomToSelectedEarthquake() {
    const earthquake = store.selectedEarthquakeForMap;
    if (!earthquake) return;

    // Wait for map container to be visible (tab switch)
    const checkMapVisible = () => {
      const container = document.querySelector('.map-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }
      return false;
    };

    // Wait for map to be visible and ready
    let attempts = 0;
    const maxAttempts = 50; // Increased attempts
    while (!checkMapVisible() && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
    }

    if (!checkMapVisible()) {
      return;
    }

    // Additional wait for map initialization
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 800)); // Increased wait time

    // Now zoom to the earthquake
    await zoomToEarthquake(earthquake);

    // Clear the selection after zooming (with a small delay to ensure zoom completes)
    setTimeout(() => {
      store.selectedEarthquakeForMap = null;
    }, 1500);
  }

  // Update map view and features when filtered earthquakes change
  watch(
    filteredEarthquakes,
    async (newEarthquakes) => {
      await updateMapFeatures(newEarthquakes);
    },
    { immediate: true },
  );

  // Watch for selected earthquake to zoom to
  watch(
    () => store.selectedEarthquakeForMap,
    async (earthquake, oldEarthquake) => {
      // Only process if we have a new earthquake (not null)
      if (earthquake && earthquake !== oldEarthquake) {
        await handleZoomToSelectedEarthquake();
      }
    },
    { immediate: false },
  );

  // Ensure map updates after mount and when component becomes visible
  onMounted(async () => {
    // Initial attempt to add features
    if (filteredEarthquakes.value.length > 0) {
      await updateMapFeatures(filteredEarthquakes.value);
    }

    // Set up intersection observer to detect when map becomes visible (for tab panels)
    await nextTick();
    const container = document.querySelector('.map-container');
    if (container) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            // Retry when component becomes visible
            if (filteredEarthquakes.value.length > 0) {
              setTimeout(() => {
                void updateMapFeatures(filteredEarthquakes.value);
              }, 300);
            }

            // Check if there's a pending earthquake to zoom to
            if (store.selectedEarthquakeForMap) {
              setTimeout(() => {
                void handleZoomToSelectedEarthquake();
              }, 500);
            }
          }
        },
        { threshold: 0.1 },
      );
      observer.observe(container);
    }
  });

  return {
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
  };
}
