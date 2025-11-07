import type { Earthquake } from './earthquake';

/**
 * Props for MapPopup component
 */
export interface MapPopupProps {
  modelValue: boolean;
  earthquake: Earthquake | null;
}

/**
 * Props for EarthquakeDetailsDrawer component
 */
export interface EarthquakeDetailsDrawerProps {
  modelValue: boolean;
  earthquake: Earthquake | null;
}

/**
 * Props for InfoRow component
 */
export interface InfoRowProps {
  icon?: string;
  iconSize?: string;
  iconColor?: string;
  label?: string;
  value?: string;
  spacing?: 'none' | 'small' | 'medium';
  valueClass?: string;
}

/**
 * Props for EssentialLink component
 */
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
