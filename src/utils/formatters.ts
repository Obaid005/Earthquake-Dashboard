// Utility functions for formatting data

export function formatNumber(value: number, decimals: number): string {
  if (typeof value !== 'number' || isNaN(value)) return 'N/A';
  return value.toFixed(decimals);
}

export function formatTime(timestamp: number): string {
  if (!timestamp || isNaN(timestamp)) return 'N/A';
  return new Date(timestamp).toLocaleString();
}

export function formatRelativeTime(timestamp: number): string {
  if (!timestamp || isNaN(timestamp)) return 'N/A';
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

export function getNumericValue(
  rowValue: unknown,
  fallbackValue: unknown,
): number {
  const value = rowValue ?? fallbackValue;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

