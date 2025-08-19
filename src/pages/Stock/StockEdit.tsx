import React, { useEffect, useState } from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  useDataProvider,
  useRefresh,
  DateInput,
} from "react-admin";
import Box from "@mui/material/Box";
import ItemSelectInput from '../../components/ItemSelectInput.tsx';
import { useParams } from 'react-router-dom';

const StockEdit: React.FC = () => {
  const dataProvider = useDataProvider();
  const [finishedGoods, setFinishedGoods] = useState<any[]>([]);
  const [rawMaterials, setRawMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const { id } = useParams(); // 获取当前编辑的ID
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

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error loading product options</span>;

  return (
    <Edit mutationMode="pessimistic">
      <SimpleForm sx={{ backgroundColor: '#ffffff', padding: '36px' }}>
        <Box display="flex" width='100%' gap={2}>
          <Box flex="1 1 48%">
            <ItemSelectInput
              sx={{
                '& .MuiAutocomplete-inputRoot': {
                  minHeight: 50,
                  height: 50,
                  alignItems: 'center',
                },
                '& .MuiInputBase-root': {
                  minHeight: 50,
                  height: 50,
                  alignItems: 'center',
                },
              }}
              type="FinishedGood"
              choices={finishedGoods}
            />
          </Box>


          <Box flex="1 1 48%">
            <TextInput sx={{ mt: 1 }} source="quantity" label="Quantity" fullWidth />
          </Box>

        </Box>
      </SimpleForm>
    </Edit>
  );
};

export default StockEdit;