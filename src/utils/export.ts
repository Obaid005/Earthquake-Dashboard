import type { Earthquake, EarthquakeExportData } from 'src/types/earthquake';

/**
 * Escapes a value for CSV format
 */
function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return '';
  let str: string;
  if (typeof value === 'object' && value !== null) {
    str = JSON.stringify(value);
  } else if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    str = String(value);
  } else {
    str = '';
  }
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Converts earthquake data to CSV format
 */
export function convertToCSV(earthquakes: Earthquake[]): string {
  const data: EarthquakeExportData[] = earthquakes.map((eq) => ({
    Location: eq.place,
    Magnitude: eq.magnitude.toFixed(2),
    Time: new Date(eq.time).toISOString(),
    Depth: eq.depth.toFixed(2),
    Longitude: eq.longitude.toFixed(4),
    Latitude: eq.latitude.toFixed(4),
  }));

  if (data.length === 0) {
    return '';
  }

  const headers = Object.keys(data[0]!);
  const csv = [
    headers.join(','),
    ...data.map((row) =>
      headers.map((key) => escapeCsvValue(row[key as keyof EarthquakeExportData])).join(','),
    ),
  ].join('\n');

  return csv;
}

/**
 * Downloads data as CSV file
 */
export function downloadCSV(csv: string, filename?: string): void {
  if (!csv) {
    return;
  }

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `earthquakes_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

/**
 * Exports earthquake data to CSV
 */
export function exportEarthquakesToCSV(earthquakes: Earthquake[]): void {
  const csv = convertToCSV(earthquakes);
  downloadCSV(csv);
}

