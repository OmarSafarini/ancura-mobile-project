export interface BarData {
  label: string;
  value: number;
  active?: boolean;
}

export interface StatisticsChartProps {
  data: BarData[];
  height?: number;
  showLabels?: boolean;
  barWidth?: number;      
  spacing?: 'space-between' | 'space-around' | 'space-evenly';
  noPadding?: boolean;
}
