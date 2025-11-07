// Constants for the earthquake dashboard

export const MAGNITUDE_THRESHOLDS = {
  HIGH: 7,
  MEDIUM: 5,
  LOW: 3,
} as const;

// Colors moved to magnitude.ts for centralization

export const MAP_MARKER_RADIUS = {
  MIN: 3,
  MAX: 15,
  MULTIPLIER: 2,
} as const;

export const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const COORDINATE_BOUNDS = {
  LONGITUDE: { MIN: -180, MAX: 180 },
  LATITUDE: { MIN: -90, MAX: 90 },
} as const;

export const USGS_API_URL =
  'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
