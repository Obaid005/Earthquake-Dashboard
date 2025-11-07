import type { QTableColumn } from 'quasar';
import { formatTime, formatNumber } from './formatters';

export const earthquakeTableColumns: QTableColumn[] = [
  {
    name: 'place',
    required: true,
    label: 'Location',
    align: 'left',
    field: 'place',
    sortable: true,
  },
  {
    name: 'magnitude',
    label: 'Magnitude',
    align: 'center',
    field: 'magnitude',
    sortable: true,
  },
  {
    name: 'time',
    label: 'Time',
    align: 'left',
    field: 'time',
    sortable: true,
    format: (val: number) => formatTime(val),
  },
  {
    name: 'depth',
    label: 'Depth (km)',
    align: 'right',
    field: 'depth',
    sortable: true,
    format: (val: number) => formatNumber(val, 2),
  },
];
