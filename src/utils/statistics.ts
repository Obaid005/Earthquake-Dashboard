import type { Earthquake, EarthquakeStatistics } from 'src/types/earthquake';

/**
 * Calculates statistics from earthquake data
 */
export function calculateStatistics(earthquakes: Earthquake[]): EarthquakeStatistics {
  if (earthquakes.length === 0) {
    return {
      maxMagnitude: 0,
      avgMagnitude: 0,
    };
  }

  const maxMagnitude = Math.max(...earthquakes.map((eq) => eq.magnitude));
  const sum = earthquakes.reduce((acc, eq) => acc + eq.magnitude, 0);
  const avgMagnitude = sum / earthquakes.length;

  return {
    maxMagnitude,
    avgMagnitude,
  };
}

