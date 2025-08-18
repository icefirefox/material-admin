import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

type Props = {
  data: { date: string;[product: string]: number | string }[];
  height?: number | string;
  dark?: boolean;
};

const colorPalette = [
  "#1976d2", "#e91e63", "#ff9800", "#4caf50", "#00bcd4", "#9c27b0", "#f44336"
];

const MultiProductLineChart: React.FC<Props> = ({ data, height = 400, dark = false }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    chartRef.current = echarts.init(ref.current);
    const resize = () => chartRef.current?.resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    // 动态收集所有产品名
    const productNames = Array.from(
      new Set(
        data.flatMap(row => Object.keys(row).filter(k => k !== "date"))
      )
    );

    const dates = data.map((d) => d.date);

    const series = productNames.map((p, i) => ({
      name: p,
      type: "line" as const,
      smooth: true,
      showSymbol: true,
      showAllSymbol: true,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: { width: 2, color: colorPalette[i % colorPalette.length] },
      itemStyle: { color: colorPalette[i % colorPalette.length] }, // 点的颜色与线条一致

      areaStyle: {
        opacity: 0.15,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: colorPalette[i % colorPalette.length] },
          { offset: 1, color: "rgba(255,255,255,0)" },
        ]),
      },
      data: data.map((d) => Number(d[p] ?? 0)), // 没有该产品时补0
    }));

    const option: echarts.EChartsOption = {
      backgroundColor: dark ? "#181c27" : "#fff",
      tooltip: { trigger: "axis" },
      legend: {
        top: 10,
        textStyle: { color: dark ? "#fff" : "#222", fontWeight: 500, fontSize: 14 },
        icon: "circle",
      },
      grid: { top: 50, right: 30, bottom: 40, left: 50 },
      xAxis: {
        type: "category",
        data: dates,
        boundaryGap: false,
        axisLine: { lineStyle: { color: dark ? "#444" : "#eee" } },
        axisLabel: { color: dark ? "#e0e0e0" : "#555", fontWeight: 500, fontSize: 13 },
      },
      yAxis: {
        type: "value",
        name: "数量",
        axisLine: { show: false },
        splitLine: { lineStyle: { color: dark ? "#222" : "#f0f0f0" } },
        axisLabel: { color: dark ? "#e0e0e0" : "#555", fontWeight: 500, fontSize: 13 },
      },
      series,
    };

    chartRef.current.setOption(option);
  }, [data, dark]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height,
        borderRadius: 12,
        boxShadow: dark
          ? "0 4px 16px rgba(0,0,0,.25)"
          : "0 4px 16px rgba(0,0,0,.06)",
        background: dark ? "#181c27" : "#fff",
        border: dark ? "1px solid #222" : "1px solid #eee",
      }}
    />
  );
};

export default MultiProductLineChart;