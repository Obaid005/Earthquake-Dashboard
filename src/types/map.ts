import type Map from 'ol/Map';
import type VectorSource from 'ol/source/Vector';
import type { Feature } from 'ol';

/**
 * Type definitions for vue3-openlayers component refs
 */
export interface VectorSourceRef {
  $source?: VectorSource<Feature>;
  source?: VectorSource<Feature>;
}

export interface MapRef {
  $map?: Map;
  map?: Map;
}

