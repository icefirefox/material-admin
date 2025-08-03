import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
} from 'react-admin';
import { Card, CardContent, Typography } from '@mui/material';

const BomEdit = () => (
  <div style={{ padding: '24px' }}>
    <Card elevation={3} sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          编辑 BOM
        </Typography>

        <Edit title=" ">
          <SimpleForm sx={{ width: '100%', maxWidth: 600 }}>
            <TextInput
              source="bomCode"
              label="BOM 编号"
              fullWidth
              validate={required()}
            />

            <TextInput source="stage" label="阶段" fullWidth />

            <ReferenceInput
              source="productId"
              reference="materials"
              label="产品"
            >
              <SelectInput optionText="name" fullWidth />
            </ReferenceInput>

            <TextInput
              type="number"
              source="totalQty"
              label="总数量（kg）"
              fullWidth
              validate={required()}
            />

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
