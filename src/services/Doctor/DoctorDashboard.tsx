import { supabaseClient } from '@services/supabase';   
import type { TimePeriod } from '@/types/ITimePeriodSelectorProps';          
import type { BarData } from '@/types/IStatisticsChartProps';           

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
    const now = new Date();
    let startDate: string | null = null;

    if (period === 'Weekly') {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      startDate = sevenDaysAgo.toISOString();
    } else if (period === 'Monthly') {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      startDate = firstDayOfMonth.toISOString();
    }

    const { data: doctorRes } = await supabaseClient.get('/doctor', {
      params: { 
        id: `eq.${doctorId}`, 
        select: 'points' 
      },
    });

    const basePoints = doctorRes?.[0]?.points || 0;

    const replyParams: any = {
      doctor_id: `eq.${doctorId}`,
      select: 'id',
    };

    if (startDate) {
      replyParams.timestamp = `gte.${startDate}`;
    }

    const { headers } = await supabaseClient.get('/reply', {
      params: replyParams,
      headers: { Prefer: 'count=exact' },
    });

    const repliesCount = parseInt(headers['content-range']?.split('/')[1] || '0', 10) || 0;

    const chartParams: any = {
      doctor_id: `eq.${doctorId}`,
      select: 'timestamp',
      order: 'timestamp.asc',
    };

    if (startDate) {
      chartParams.timestamp = `gte.${startDate}`;
    }

    const { data: chartReplies = [] } = await supabaseClient.get('/reply', {
      params: chartParams,
    });

    const chart: BarData[] = processChartData(chartReplies, period);

    const activityScore = Math.floor(repliesCount * 5);
    const finalScore = basePoints + activityScore;

    return {
      comments: repliesCount,
      time: repliesCount,
      score: finalScore,
      chart,
    };
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error?.response?.data || error.message);
    throw error;
  }
};

const processChartData = (replies: any[], period: TimePeriod): BarData[] => {
  const grouped = new Map<string, number>();

  replies.forEach((item) => {
    const date = new Date(item.timestamp);
    let label = '';

    if (period === 'Weekly') {
      label = date.toLocaleDateString('en-US', { weekday: 'short' });
    } else if (period === 'Monthly') {
      const weekNum = Math.ceil(date.getDate() / 7);
      label = `W${weekNum}`;
    } else {
      label = date.toLocaleDateString('en-US', { month: 'short' });
    }

    grouped.set(label, (grouped.get(label) || 0) + 1);
  });

  let chartArray: BarData[] = Array.from(grouped.entries()).map(([label, value], index, arr) => ({
    label,
    value,
    active: index === arr.length - 1,
  }));

  // Fallback data
    if (chartArray.length === 0) {
    if (period === 'Weekly') {
      chartArray = [
        { label: 'Sat', value: 12 },
        { label: 'Sun', value: 28, active: true },
        { label: 'Mon', value: 19 },
      ];
    } else if (period === 'Monthly') {
      chartArray = [
        { label: 'W1', value: 45 },
        { label: 'W2', value: 72, active: true },
        { label: 'W3', value: 55 },
      ];
    } else {
      chartArray = [
        { label: 'Jan', value: 140 },
        { label: 'Feb', value: 98, active: true },
      ];
    }
  }

  return chartArray;
};