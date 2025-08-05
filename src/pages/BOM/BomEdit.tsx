import {
  Edit,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
  required,
} from 'react-admin';
import { Card, CardContent, Typography } from '@mui/material';
import FinishedGoodsSelectInput from '../../components/FinishedGoodsSelectInput.tsx';
import RawMaterialSelectInput from '../../components/RawMaterialSelectInput.tsx';

const BomEdit = () => (
  <div style={{ padding: '24px' }}>
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          编辑 BOM
        </Typography>

        <Edit title=" " transform={data => {
          const bomId = data.bomId ?? data.id;
          const productId = data.productId?.productId ?? data.productId;
          return {
            ...data,
            bomId,
            productId,
            items: data.items?.map(item => ({
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
        }}>
          <SimpleForm sx={{ width: '100%', maxWidth: 600 }}>
            <TextInput
              source="id"
              label="BOM id"
              fullWidth
              validate={required()}
            />
            <TextInput source="version" label="版本" fullWidth />

            <TextInput source="stage" label="阶段" fullWidth />

            <FinishedGoodsSelectInput source="productId" />

            {/* <TextInput
              type="number"
              source="quantity"
              label="数量"
              fullWidth
              validate={required()}
            /> */}


            <ArrayInput source="items" label="原料列表">
              <SimpleFormIterator inline fullWidth>
                <RawMaterialSelectInput source="material" sx={{ mt: 0 }} type="RawMaterial" />
                <TextInput type="number" source="quantity" label="数量" fullWidth />
                <TextInput source="material.unit" label="单位" fullWidth />
              </SimpleFormIterator>
            </ArrayInput>

            <TextInput
              source="notes"
              label="备注"
              multiline
              fullWidth
              minRows={3}
            />
          </SimpleForm>
        </Edit>
      </CardContent>
    </Card>
  </div>
);

export default BomEdit;