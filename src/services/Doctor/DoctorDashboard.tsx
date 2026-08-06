import type { TimePeriod } from '@/types/ITimePeriodSelectorProps';
import type { BarData } from '@/types/IStatisticsChartProps';
import { mockReplies, delay } from '../mockData';

export interface DashboardStats {
  comments: number;
  time: number;
  score: number;
  chart: BarData[];
}

export const getDoctorDashboardStats = async (
  doctorId: string,
  period: TimePeriod = 'Weekly'
): Promise<DashboardStats> => {
  try {
    await delay();
    const now = new Date();
    const basePoints = 1250;
    
    // For mock, just count mock replies by doctor
    const doctorReplies = mockReplies.filter(r => r.user_id === doctorId);
    const commentsCount = doctorReplies.length + 120; // add baseline
    const avgResponseTime = 15; // mock 15 minutes average
    const activityScore = Math.floor(commentsCount * 5);
    const finalScore = basePoints + activityScore;

    const chart = processChartData([], period);

    return {
      comments: commentsCount,
      time: avgResponseTime,
      score: finalScore,
      chart,
    };
  } catch (error: any) {
    console.error('CRITICAL ERROR in getDoctorDashboardStats:', error.message);
    return { comments: 0, time: 0, score: 0, chart: [] };
  }
};

const processChartData = (replies: any[], period: TimePeriod): BarData[] => {
  const grouped = new Map<string, number>();
  const now = new Date();

  if (period === 'Weekly') {
    const last7Days: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      last7Days.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
    }
    last7Days.forEach(day => grouped.set(day, 0));
  } else if (period === 'Monthly') {
    const weeks = ['W1', 'W2', 'W3', 'W4'];
    weeks.forEach(w => grouped.set(w, 0));
  } else {
    const last6Months: string[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      last6Months.push(d.toLocaleDateString('en-US', { month: 'short' }));
    }
    last6Months.forEach(m => grouped.set(m, 0));
  }

  let chartArray: BarData[] = Array.from(grouped.entries()).map(([label, value], index, arr) => {
    // Premium, natural-looking baselines to ensure all columns are always visible with realistic varying heights
    const baselines = period === 'Weekly' 
      ? [14, 22, 10, 18, 26, 35, 15] 
      : period === 'Monthly' 
        ? [25, 45, 30, 35] 
        : [30, 45, 25, 60, 40, 50];
    
    const base = baselines[index % baselines.length];
    
    return {
      label,
      value: base + value * 5, // dynamically stack real comments/replies on top of the baseline
      active: index === arr.length - 1, // active column (e.g. today for Weekly) is marked active (Green)
    };
  });

  return chartArray;
};