import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShowBase, Title, Button } from 'react-admin';
import { Card, CardContent, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import BomChart from "../../components/BomChart.tsx"; // BomChart 组件来显示图表

export default function BomChartPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const API_URL = process.env.API_URL || 'http://localhost:5180/api';

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${API_URL}/bom/${id}/items`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {// 处理每项，取 material.name 作为 name 字段
        const processedData = (data ?? []).map(item => ({
          ...item,
          name: item.material ? `${item.material.productId} - ${item.material.name} (${item.proportion}%)`
            : '', // 关键处理

        }));
        setChartData(processedData)
      });
  }, [id]);

  return (
    <ShowBase resource="bom" id={id}>
      <Card sx={{ margin: 4, borderRadius: 2, boxShadow: 3, minHeight: '500px' }}>
        {/* 顶部按钮区 */}
        <Stack direction="row" spacing={2} sx={{ mb: 2, margin: 2 }}>
          <Button
            label="返回列表"
            onClick={() => navigate('/bom')}
            startIcon={<ArrowBackIcon />}
          />
          <Button
            label="编辑"
            onClick={() => navigate(`/bom/${id}`)}
            startIcon={<EditIcon />}
            color="primary"
          />
        </Stack>
        <Title title="BOM 配料比例图" />
        <CardContent sx={{}}>
          <BomChart data={chartData} />
        </CardContent>
      </Card>
    </ShowBase>
  );
}
