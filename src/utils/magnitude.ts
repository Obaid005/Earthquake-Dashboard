// Utility functions for magnitude-related calculations

import { MAGNITUDE_THRESHOLDS, MAP_MARKER_RADIUS } from './constants';

// Centralized color definitions
export const MAGNITUDE_COLORS = {
  HIGH: 'rgba(255, 0, 0, 0.7)', // Red for >= 7
  MEDIUM: 'rgba(255, 165, 0, 0.7)', // Orange for >= 5
  LOW: 'rgba(255, 193, 7, 0.7)', // Amber for >= 3
  MINOR: 'rgba(0, 255, 0, 0.7)', // Green for < 3
} as const;

export const MAGNITUDE_BADGE_COLORS = {
  HIGH: 'red',
  MEDIUM: 'orange',
  LOW: 'amber',
  MINOR: 'green',
} as const;

// Hex colors for charts and other uses
export const MAGNITUDE_COLORS_HEX = {
  HIGH: '#f44336',
  MEDIUM: '#ff9800',
  LOW: '#ffeb3b',
  MINOR: '#4caf50',
} as const;

// Legend color definitions
export const MAGNITUDE_LEGEND_COLORS = {
  MINOR: 'rgba(0, 255, 0, 0.7)', // < 3.0
  LOW: 'rgba(255, 193, 7, 0.7)', // 3.0 - 5.0
  MEDIUM: 'rgba(255, 165, 0, 0.7)', // 5.0 - 7.0
  HIGH: 'rgba(255, 0, 0, 0.7)', // >= 7.0
} as const;

export function getMagnitudeColor(magnitude: number | undefined): string {
  if (!magnitude || isNaN(magnitude)) return MAGNITUDE_COLORS.MINOR;
  if (magnitude >= MAGNITUDE_THRESHOLDS.HIGH) return MAGNITUDE_COLORS.HIGH;
  if (magnitude >= MAGNITUDE_THRESHOLDS.MEDIUM) return MAGNITUDE_COLORS.MEDIUM;
  if (magnitude >= MAGNITUDE_THRESHOLDS.LOW) return MAGNITUDE_COLORS.LOW;
  return MAGNITUDE_COLORS.MINOR;
}

export function getMagnitudeBadgeColor(magnitude: number | undefined): string {
  if (!magnitude || isNaN(magnitude)) return MAGNITUDE_BADGE_COLORS.MINOR;
  if (magnitude >= MAGNITUDE_THRESHOLDS.HIGH) return MAGNITUDE_BADGE_COLORS.HIGH;
  if (magnitude >= MAGNITUDE_THRESHOLDS.MEDIUM) return MAGNITUDE_BADGE_COLORS.MEDIUM;
  if (magnitude >= MAGNITUDE_THRESHOLDS.LOW) return MAGNITUDE_BADGE_COLORS.LOW;
  return MAGNITUDE_BADGE_COLORS.MINOR;
}

export function getMagnitudeColorHex(magnitude: number | undefined): string {
  if (!magnitude || isNaN(magnitude)) return MAGNITUDE_COLORS_HEX.MINOR;
  if (magnitude >= MAGNITUDE_THRESHOLDS.HIGH) return MAGNITUDE_COLORS_HEX.HIGH;
  if (magnitude >= MAGNITUDE_THRESHOLDS.MEDIUM) return MAGNITUDE_COLORS_HEX.MEDIUM;
  if (magnitude >= MAGNITUDE_THRESHOLDS.LOW) return MAGNITUDE_COLORS_HEX.LOW;
  return MAGNITUDE_COLORS_HEX.MINOR;
}

export function getMarkerRadius(magnitude: number): number {
  return Math.max(
    MAP_MARKER_RADIUS.MIN,
    Math.min(MAP_MARKER_RADIUS.MAX, magnitude * MAP_MARKER_RADIUS.MULTIPLIER),
  );
}
