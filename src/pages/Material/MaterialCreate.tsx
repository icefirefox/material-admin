import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
} from "react-admin";
import Box from "@mui/material/Box";


const typeChoices = [
  { id: 'FinishedGood', name: '成品' },
  { id: 'RawMaterial', name: '原料' },
];

const MaterialCreate: React.FC = () => (
  <Create>
    <SimpleForm>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Box flex="1 1 48%">
          <TextInput source="productId" label="ProductId" fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="name" label="Name" fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <SelectInput sx={{ marginTop: 0 }} source="type" label="Type" choices={typeChoices} fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="unit" label="Unit" fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <TextInput type="number" source="minStock" label="Min Stock" fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="stageId" fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="stageName" fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="product" fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="category" fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="description" fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="supplier" fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <TextInput type="number" source="perBlend" fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <TextInput type="number" source="percent2" fullWidth />
        </Box>
        <Box flex="1 1 48%">
          <TextInput type="number" source="totalKg2" fullWidth />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
);

export default MaterialCreate;
