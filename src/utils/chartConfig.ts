import type { EChartsOption } from 'echarts';
import type { Earthquake } from 'src/types/earthquake';
import { getMagnitudeColorHex } from './magnitude';

/**
 * Creates ECharts configuration for earthquake magnitude timeline
 */
export function createChartOption(earthquakes: Earthquake[]): EChartsOption {
  if (earthquakes.length === 0) {
    return {
      title: {
        text: 'No data available',
        left: 'center',
      },
    };
  }

  // Sort by time
  const sorted = [...earthquakes].sort((a, b) => a.time - b.time);

  const times = sorted.map((eq) => new Date(eq.time).toLocaleString());
  const magnitudes = sorted.map((eq) => eq.magnitude);

  return {
    backgroundColor: 'transparent',
    title: {
      text: 'Earthquake Magnitude Timeline',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      subtext: `${earthquakes.length} earthquakes recorded`,
      subtextStyle: {
        fontSize: 12,
        color: '#666',
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(50, 50, 50, 0.9)',
      borderColor: '#667eea',
      borderWidth: 2,
      textStyle: {
        color: '#fff',
      },
      formatter: (params) => {
        if (!params) return '';
        const param = Array.isArray(params) ? params[0] : params;
        if (!param || param.value === undefined || param.name === undefined) return '';
        let value: string;
        if (typeof param.value === 'number') {
          value = param.value.toFixed(2);
        } else if (typeof param.value === 'string') {
          value = param.value;
        } else if (typeof param.value === 'boolean') {
          value = String(param.value);
        } else {
          value = 'N/A';
        }
        const mag = typeof param.value === 'number' ? param.value : 0;
        const color = getMagnitudeColorHex(mag);
        return `<div style="padding: 8px;">
          <div style="font-weight: bold; margin-bottom: 4px;">${param.name}</div>
          <div>Magnitude: <span style="color: ${color}; font-weight: bold;">${value}</span></div>
        </div>`;
      },
    },
    xAxis: {
      type: 'category',
      data: times,
      name: 'Time',
      nameLocation: 'middle',
      nameGap: 50,
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      axisLine: {
        lineStyle: {
          color: '#667eea',
        },
      },
      axisLabel: {
        rotate: 60,
        fontSize: 9,
        interval: 'auto',
        formatter: (value: string) => {
          // Show only date part for better readability
          if (value && typeof value === 'string' && value.includes(',')) {
            return value.split(',')[0] || value;
          }
          return value || '';
        },
      },
    },
    yAxis: {
      type: 'value',
      name: 'Magnitude (Richter Scale)',
      nameLocation: 'middle',
      nameGap: 50,
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      axisLine: {
        lineStyle: {
          color: '#667eea',
        },
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#e0e0e0',
        },
      },
    },
    series: [
      {
        name: 'Magnitude',
        type: 'line',
        data: magnitudes.map((mag) => ({
          value: mag,
          itemStyle: {
            color: getMagnitudeColorHex(mag),
          },
        })),
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2,
          color: '#667eea',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(102, 126, 234, 0.4)' },
              { offset: 1, color: 'rgba(102, 126, 234, 0.05)' },
            ],
          },
        },
        emphasis: {
          focus: 'series',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#fff',
          },
        },
      },
    ],
    grid: {
      left: '5%',
      right: '5%',
      bottom: '25%',
      top: '15%',
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100,
        height: 20,
        bottom: 50,
        handleIcon:
          'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.2,10.8,24.1,24.1,24.1C44.2,51.7,55,40.8,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.6-0.4,1-1,1H26.8c-0.6,0-1-0.4-1-1V19.4c0-0.6,0.4-1,1-1h9.2c0.6,0,1,0.4,1,1V35.8z',
        handleSize: '80%',
        handleStyle: {
          color: '#667eea',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
      },
      {
        type: 'inside',
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
    ],
    toolbox: {
      show: true,
      orient: 'vertical',
      right: 20,
      top: 20,
      feature: {
        restore: {
          show: true,
          title: 'Restore',
        },
        saveAsImage: {
          show: true,
          title: 'Save as Image',
          name: 'earthquake_chart',
          type: 'png',
          pixelRatio: 2,
        },
      },
      iconStyle: {
        borderColor: '#667eea',
      },
      emphasis: {
        iconStyle: {
          borderColor: '#764ba2',
        },
      },
    },
  };
}

