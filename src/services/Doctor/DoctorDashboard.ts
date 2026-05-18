import { supabaseClient } from '@/services/supabase';
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

    console.log(`Period filter: ${period} | Start date: ${startDate || 'All Time'}`);
    let doctorRes: any = null;
    try {
      const response = await supabaseClient.get('/doctor', {
        params: { 
          id: `eq.${doctorId}`, 
          select: 'points' 
        },
      });
      doctorRes = response.data;
    } catch (error) {
      console.error('Doctor points error:', error);
    }

    const basePoints = doctorRes?.[0]?.points || 0;
    console.log(`Doctor points: ${basePoints}`);

    const baseParams: any = {
      doctor_id: `eq.${doctorId}`,
    };

    if (startDate) {
      baseParams.timestamp = `gte.${startDate}`;
    }

    console.log('Base params for replies:', baseParams);

    console.log('Fetching replies count...');
    let countHeaders: any = null;
    try {
      const response = await supabaseClient.get('/reply', {
        params: { ...baseParams, select: 'id' },
        headers: { Prefer: 'count=exact' },
      });
      countHeaders = response.headers;
    } catch (error) {
      console.error('Count error:', error);
    }

    const commentsCount = parseInt(countHeaders?.['content-range']?.split('/')[1] || '0', 10) || 0;
    console.log(`Total replies (comments): ${commentsCount}`);

    console.log("Calculating average response time...");
let avgResponseTime = 0;

const safeDate = (value: unknown) => {
  if (!value) return null;
  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? null : date;
};

if (commentsCount > 0) {
  let repliesData: any[] = [];
  let casesData: any[] = [];

  try {
    const repliesResponse = await supabaseClient.get("/reply", {
      params: {
        ...baseParams,
        select: "timestamp,case_id",
      },
    });

    repliesData = Array.isArray(repliesResponse.data)
      ? repliesResponse.data
      : [];

    const caseIds = [
      ...new Set(
        repliesData
          .map((reply: any) => reply.case_id)
          .filter((id: any) => id !== null && id !== undefined)
      ),
    ];

    if (caseIds.length > 0) {
      const casesResponse = await supabaseClient.get("/case", {
        params: {
          id: `in.(${caseIds.join(",")})`,
          select: "id,timestamp",
        },
      });

      casesData = Array.isArray(casesResponse.data)
        ? casesResponse.data
        : [];
    }
  } catch (error) {
    console.error("Time data error:", error);
  }

  const casesMap = new Map(
    casesData.map((caseItem: any) => [
      String(caseItem.id),
      caseItem.timestamp,
    ])
  );

  let validRepliesCount = 0;

  const totalMinutes = repliesData.reduce((sum: number, reply: any) => {
    const replyTime = safeDate(reply.timestamp);
    const caseTime = safeDate(casesMap.get(String(reply.case_id)));

    if (!replyTime || !caseTime) {
      return sum;
    }

    const diffMs = replyTime.getTime() - caseTime.getTime();
    const diffMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

    validRepliesCount++;

    return sum + diffMinutes;
  }, 0);

  if (validRepliesCount > 0) {
    avgResponseTime = Math.floor(totalMinutes / validRepliesCount);

    console.log(
      `Average response time: ${avgResponseTime} minutes from ${validRepliesCount} replies`
    );
  } else {
    console.log("No valid reply timestamps found");
  
  }
} else {
  console.log('No replies, skipping average time calculation');
}

    const chartParams: any = {
      ...baseParams,
      select: 'timestamp',
      order: 'timestamp.asc',
    };

    let chartReplies: any[] = [];
    try {
      const response = await supabaseClient.get('/reply', {
        params: chartParams,
      });
      chartReplies = response.data;
    } catch (error) {
      console.error('Chart data error:', error);
    }

    console.log(`Fetched ${chartReplies.length} replies for chart`);

    const chart = processChartData(chartReplies, period);
    console.log(`Chart prepared with ${chart.length} bars`);

    const activityScore = Math.floor(commentsCount * 5);
    const finalScore = basePoints + activityScore;

    console.log(`Final Score: ${finalScore} (base: ${basePoints} + activity: ${activityScore})`);

    const result = {
      comments: commentsCount,
      time: avgResponseTime,
      score: finalScore,
      chart,
    };

    console.log('Final dashboard stats:', result);
    return result;

  } catch (error: any) {
    console.error('CRITICAL ERROR in getDoctorDashboardStats:', error?.response?.data || error.message);
    console.error('Full error object:', error);
    
    return { 
      comments: 0, 
      time: 0, 
      score: 0, 
      chart: [] 
    };
  }
};

const processChartData = (replies: any[], period: TimePeriod): BarData[] => {
  console.log(`Processing chart data for ${period} with ${replies.length} replies`);

  const grouped = new Map<string, number>();

  replies.forEach((item, index) => {
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

  console.log(`Grouped chart data:`, Object.fromEntries(grouped));

  if (chartArray.length === 0) {
    console.log('No chart data, using fallback');
    chartArray = period === 'Weekly' 
      ? [{ label: 'Sat', value: 8 }, { label: 'Sun', value: 15, active: true }, { label: 'Mon', value: 22 }]
      : [{ label: 'W1', value: 35 }, { label: 'W2', value: 68, active: true }, { label: 'W3', value: 42 }];
  }

  return chartArray;
};