export interface Earthquake {
  id: string;
  place: string;
  magnitude: number;
  time: number;
  longitude: number;
  latitude: number;
  depth: number;
}

export interface EarthquakeFeature {
  type: string;
  properties: {
    place: string;
    mag: number;
    time: number;
    [key: string]: unknown;
  };
  geometry: {
    type: string;
    coordinates: [number, number, number]; // [longitude, latitude, depth]
  };
  id: string;
}

export interface EarthquakeGeoJSON {
  type: string;
  metadata: {
    [key: string]: unknown;
  };
  features: EarthquakeFeature[];
}

export interface EarthquakeFilters {
  magnitudeMin: number | null;
  magnitudeMax: number | null;
  locationText: string;
}

/**
 * Statistics calculated from earthquake data
 */
export interface EarthquakeStatistics {
  maxMagnitude: number;
  avgMagnitude: number;
}

/**
 * Data structure for CSV export
 */
export interface EarthquakeExportData {
  Location: string;
  Magnitude: string;
  Time: string;
  Depth: string;
  Longitude: string;
  Latitude: string;
}
