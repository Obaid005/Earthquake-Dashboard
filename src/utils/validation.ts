// Validation utility functions

import { COORDINATE_BOUNDS } from './constants';

export function isValidCoordinate(
  lon: number,
  lat: number,
): boolean {
  return (
    !isNaN(lon) &&
    !isNaN(lat) &&
    lon >= COORDINATE_BOUNDS.LONGITUDE.MIN &&
    lon <= COORDINATE_BOUNDS.LONGITUDE.MAX &&
    lat >= COORDINATE_BOUNDS.LATITUDE.MIN &&
    lat <= COORDINATE_BOUNDS.LATITUDE.MAX
  );
}

export function validateMagnitudeRange(
  min: number | null,
  max: number | null,
): boolean {
  if (min === null || max === null) return true;
  return min <= max;
}

