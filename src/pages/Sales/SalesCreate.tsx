import React, { useEffect, useState } from 'react';

import {
  CreateBase,
  SimpleForm,
  TextInput,
  SelectInput,
  useNotify,
  useRedirect,
  useCreate,
  required,
  useDataProvider,
  DateTimeInput,
  DateInput,
} from "react-admin";
import Box from "@mui/material/Box";
import ItemSelectInput from '../../components/ItemSelectInput.tsx'; // 根据实际路径调整

const typeChoices = [
  { id: 'FinishedGood', name: '成品' },
  { id: 'RawMaterial', name: '原料' },
];

const SalesCreate: React.FC = () => {
  const dataProvider = useDataProvider();

  const [finishedGoods, setFinishedGoods] = useState<any[]>([]);
  const [rawMaterials, setRawMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    setLoading(true);

    Promise.all([
      dataProvider.getList('bom/getFinishedGoodsSelectInput', {
        pagination: { page: 1, perPage: 10000 },
        sort: { field: 'productId', order: 'ASC' },
        filter: { type: 'FinishedGood' },
      }),
      dataProvider.getList('bom/getFinishedGoodsSelectInput', {
        pagination: { page: 1, perPage: 10000 },
        sort: { field: 'productId', order: 'ASC' },
        filter: { type: 'RawMaterial' },
      }),
    ])
      .then(([finishedGoodsRes, rawMaterialsRes]) => {
        setFinishedGoods(finishedGoodsRes.data);
        setRawMaterials(rawMaterialsRes.data);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }, [dataProvider]);
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate();
  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error loading product options</span>;

  const handleSave = async (data: any) => {
    try {
      await create('sales', { data });
      notify('保存成功', { type: 'info' });
      redirect('list', 'sales');
    } catch (error) {
      notify('保存失败', { type: 'error' });
    }
  };

  return (
    <CreateBase resource="sales" transform={data => {
      const productId = data.productId?.productId ?? data.productId;
      return {
        ...data,
        productId,

      };
    }}>
      <SimpleForm sx={{ backgroundColor: '#ffffff', padding: '36px' }} onSubmit={handleSave}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Box flex="1 1 48%">
            {/* FinishedGood 选项传入 */}
            <ItemSelectInput sx={{
              '& .MuiAutocomplete-inputRoot': {
                minHeight: 50, // 你想要的高度
                height: 50,
                alignItems: 'center',
              },
              // 兼容 SelectInput
              '& .MuiInputBase-root': {
                minHeight: 50,
                height: 50,
                alignItems: 'center',
              },
            }} source="productId" type="FinishedGood" choices={finishedGoods} />          </Box>
          <Box flex="1 1 48%">
            <TextInput source="orderNo" label="订单编号" fullWidth />
          </Box>
          <Box flex="1 1 48%">
            <TextInput sx={{ mt: 1 }} source="unit" label="Unit" fullWidth />
          </Box>
          <Box flex="1 1 48%">
            <TextInput source="quantity" label="Quantity" fullWidth />
          </Box>
          <Box flex="1 1 48%">
            <DateInput source="orderDate" label="订单时间" fullWidth />
          </Box>
        </Box>
      </SimpleForm>
    </CreateBase>
  );
};

export default SalesCreate;
