import React, { useMemo, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import MultiProductLineChart from '../../components/MultiProductLineChart.tsx';

// —— 工具函数（避免 ISO 字符串导致的时区偏移）——
function parseYMD(s: string) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}
function formatYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
// function startOfISOWeek(d: Date) {
//   const tmp = new Date(d.getTime());
//   const dow = (tmp.getDay() + 6) % 7; // 周一=0
//   tmp.setDate(tmp.getDate() - dow);
//   tmp.setHours(0, 0, 0, 0);
//   return tmp;
// }
function formatYM(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}
// —— 计算 ISO 周数（返回 {year, week}）——
function getISOWeek(d: Date) {
  const tmp = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = tmp.getUTCDay() || 7; // 周一=1, 周日=7
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum); // 调整到本周四
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((+tmp - +yearStart) / 86400000) + 1) / 7);
  return { year: tmp.getUTCFullYear(), week: weekNo };
}

// —— 将“按日的透视表数据”聚合为 day/week/month 视图 ——
// 输入/输出格式：[{ date: 'YYYY-MM-DD' 或 'YYYY-MM', 产品A: number, 产品B: number, ... }]
type PivotRow = { date: string;[k: string]: number | string };

// —— 将“按日的透视表数据”聚合为 day/week/month 视图 ——
function aggregatePivot(
  data: PivotRow[],
  mode: 'day' | 'week' | 'month'
): PivotRow[] {
  if (!data?.length) return [];

  const productNames = Array.from(
    new Set(
      data.flatMap((r) => Object.keys(r).filter((k) => k !== 'date'))
    )
  );

  if (mode === 'day') {
    const sorted = [...data].sort(
      (a, b) => parseYMD(a.date).getTime() - parseYMD(b.date).getTime()
    );
    return sorted.map((row) => {
      const out: PivotRow = { date: row.date };
      productNames.forEach((p) => (out[p] = Number(row[p] ?? 0)));
      return out;
    });
  }

  const bucket: Record<string, Record<string, number>> = {};

  for (const row of data) {
    const d = parseYMD(String(row.date));
    let key: string;

    if (mode === 'week') {
      const { year, week } = getISOWeek(d);
      key = `${year}年第${week}周`; // ISO 标准周数
    } else {
      key = formatYM(d); // 月份
    }

    bucket[key] ||= {};
    for (const p of productNames) {
      bucket[key][p] = (bucket[key][p] ?? 0) + Number(row[p] ?? 0);
    }
  }

  const rows: PivotRow[] = Object.keys(bucket)
    .sort((a, b) => {
      // week 是 "YYYY年第W周"，month 是 "YYYY-MM"
      // 这里简单用字符串比大小（可以进一步写个 parseWeekKey）
      return a.localeCompare(b);
    })
    .map((key) => {
      const out: PivotRow = { date: key };
      for (const p of productNames) out[p] = bucket[key][p] ?? 0;
      return out;
    });

  return rows;
}
const SalesChartPage: React.FC = () => {
  const [mode, setMode] = useState<'day' | 'week' | 'month'>('day');

  // sampleData（按日的透视表）
  // const sampleData: PivotRow[] = [
  //   { date: '2025-08-01', 'Nouriz Healtra Stage 1 800g Can': 120, 'Nouriz Healtra Stage 2 800g Can': 200, 'Nouriz Healtra Stage 3 800g Can': 90, 'Nouriz Healtra Stage 4 800g Can': 80 },
  //   { date: '2025-08-02', 产品A: 150, 产品C: 130, 产品D: 80 },
  //   { date: '2025-08-03', 产品A: 170, 产品B: 240, 产品C: 160, 产品D: 90 },
  //   { date: '2025-08-04', 产品A: 190, 产品B: 260, 产品D: 100 },
  //   { date: '2025-08-05', 产品A: 220, 产品B: 280, 产品C: 210, 产品D: 170 },
  // ];
  const token = localStorage.getItem('token');
  const API_URL = process.env.API_URL || 'http://localhost:5180/api';

  const [sampleData, setSampleData] = useState<PivotRow[]>([]);

  // 从接口获取数据
  React.useEffect(() => {
    fetch(`${API_URL}/sales/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setSampleData(data))
      .catch(() => setSampleData([]));
  }, []);

  const chartData = useMemo(() => aggregatePivot(sampleData, mode), [mode, sampleData]);

  return (
    <div style={{ padding: 24 }}>
      <Tabs value={mode} onChange={(_, v: 'day' | 'week' | 'month') => setMode(v)}>
        <Tab value="day" label="按天" />
        <Tab value="week" label="按周" />
        <Tab value="month" label="按月" />
      </Tabs>

      {/* 直接把聚合后的透视表传给图表 */}
      <MultiProductLineChart data={chartData} dark={false} />
    </div>
  );
};

export default SalesChartPage;
