export type TimePeriod = 'Weekly' | 'Monthly' | 'All Time';

export interface TimePeriodSelectorProps {
  selectedPeriod: TimePeriod;
  onPeriodChange: (period: TimePeriod) => void;
}
