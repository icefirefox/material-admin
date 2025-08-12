import React, { useEffect, useState } from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  useDataProvider,
  required,
} from 'react-admin';
import ItemSelectInput from '../../components/ItemSelectInput.tsx'; // 根据实际路径调整
import UnitInput from '../../components/UnitInput.tsx';

const BomCreate = () => {
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

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error loading product options</span>;

  return (
    <Create
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
      <SimpleForm>
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
        }} type="FinishedGood" choices={finishedGoods} />

        {/* 其他字段 */}
        <TextInput className="custom-text-input" source="version" />
        <TextInput className="custom-text-input" source="unit" />

        <ArrayInput source="items" label="原料列表">
          <SimpleFormIterator
            inline
            fullWidth
            sx={{
              '& .RaSimpleFormIterator-line': { mt: 2 },
              '& .RaSimpleFormIterator-field': { mt: 2 },
              '& .RaSimpleFormIterator-action': { mt: 2 },
            }}
          >
            {/* RawMaterial 选项传入 */}
            <ItemSelectInput
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
              type="RawMaterial"
              choices={rawMaterials}
              showSearch
              source="material"
            />
            <TextInput sx={{ mt: 1 }} source="quantity" label="数量" />
            <UnitInput source="material.unit" />
            <TextInput sx={{ mt: 0.7 }} label="proportion(%)" source="proportion" />
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Create>
  );
};

export default BomCreate;
