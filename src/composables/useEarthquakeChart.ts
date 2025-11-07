import { computed } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  ToolboxComponent,
} from 'echarts/components';
import { useEarthquakeStore } from 'src/stores/earthquake';
import { createChartOption } from 'src/utils/chartConfig';

// Initialize ECharts components
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
  ToolboxComponent,
]);

export function useEarthquakeChart() {
  const store = useEarthquakeStore();

  const chartOption = computed(() => createChartOption(store.filteredEarthquakes));

  return {
    chartOption,
  };
}
