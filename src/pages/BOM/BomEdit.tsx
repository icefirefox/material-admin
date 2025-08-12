import {
  Edit,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  required,
  useDataProvider,
} from 'react-admin';
import { Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ItemSelectInput from '../../components/ItemSelectInput.tsx';
import UnitInput from '../../components/UnitInput.tsx';
import { heIL } from '@mui/material/locale';

const BomEdit = () => {
  const dataProvider = useDataProvider();

  // 统一请求 FinishedGood 产品
  const [finishedGoods, setFinishedGoods] = useState<any[]>([]);
  const [rawMaterials, setRawMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);

    // 并行请求 FinishedGood 和 RawMaterial（假设接口都能用getList和filter）
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
    <div style={{ padding: '24px' }}>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            编辑 BOM
          </Typography>

          <Edit
            title=" "
            transform={data => {
              const bomId = data.bomId ?? data.id;
              const productId = data.productId?.productId ?? data.productId;
              return {
                ...data,
                bomId,
                productId,
                items:
                  data.items?.map(item => ({
                    ...item,
                    bomId,
                    productId: item.material?.productId ?? item.material?.id,
                    material: {
                      ...(item.material ?? {}),
                      name: item.material?.name,
                      type: item.material?.type,
                    },
                  })) ?? [],
              };
            }}
          >
            <SimpleForm sx={{ width: '100%' }}>
              <TextInput
                source="id"
                label="BOM id"
                sx={{ width: '100%' }}
                validate={required()}
              />
              <TextInput sx={{ width: '100%' }} source="version" label="版本" fullWidth />

              {/* FinishedGood 选项从父组件传入 */}
              <ItemSelectInput
                type="FinishedGood"
                source="productId"
                choices={finishedGoods}
                sx={{
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
                }}
              />

              <ArrayInput source="items" label="原料列表">
                <SimpleFormIterator
                  inline
                  fullWidth
                  sx={{
                    '& .RaSimpleFormIterator-line': {
                      mt: 2,
                    },
                    '& .RaSimpleFormIterator-field': {
                      mt: 2,
                    },
                    '& .RaSimpleFormIterator-action': {
                      mt: 2,
                    },
                  }}
                >
                  {/* RawMaterial 选项从父组件传入 */}
                  <ItemSelectInput
                    showSearch
                    source="material"
                    type="RawMaterial"
                    choices={rawMaterials}
                    sx={{
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
                    }}
                  />
                  <TextInput sx={{ mt: 1 }} source="quantity" label="数量" fullWidth />
                  <UnitInput source="material.unit" />
                  <TextInput sx={{ mt: 1 }} label="proportion(%)" source="proportion" />
                </SimpleFormIterator>
              </ArrayInput>

              <TextInput source="notes" label="备注" multiline fullWidth minRows={3} />
            </SimpleForm>
          </Edit>
        </CardContent>
      </Card>
    </div>
  );
};

export default BomEdit;
