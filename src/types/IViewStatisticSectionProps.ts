import { BarData } from "./IStatisticsChartProps";

export interface StatisticsSectionProps {
  data: BarData[];
  onPress: () => void;
}
