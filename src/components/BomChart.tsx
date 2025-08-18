import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { LabelMarginType } from "echarts/types/src/label/labelStyle.js";

interface BomItem {
  name: string;     // 配料名称
  proportion: number; // 占比
}

interface BomChartProps {
  data: BomItem[];
}

const BomChart: React.FC<BomChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chartInstance = echarts.init(chartRef.current);
    const total = data.reduce((sum, item) => sum + Number(item.proportion || 0), 0);

    const option = {
      title: {
        text: "BOM 配料比例",
        left: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: params => `${params.name}: ${params.percent}%`

      },

      graphic: [
        {
          type: 'text',
          left: 'center',
          bottom: 0,
          style: {
            text: `Total: ${total}%`,
            fill: '#333',
            fontSize: 12,
            // fontWeight: 'bold',
            marginLeft: 20,
            paddingLeft: 10,
          }
        },

      ],
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "配料",
          type: "pie",
          radius: "50%",
          data: data.map(item => ({
            name: item.name,
            value: item.proportion
          })),
          label: {
            show: false,
            position: "right",
            formatter: (params) => params.name.length > 35 ? params.name.slice(0, 35) + '…' : params.name
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };

    chartInstance.setOption(option);

    return () => {
      chartInstance.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: "100%", height: 400, paddingBottom: '20px' }} />;
};

export default BomChart;
