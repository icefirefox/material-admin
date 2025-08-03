import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput
} from "react-admin";
import { Box } from "@mui/material";
const typeChoices = [
  { id: 'FinishedGood', name: '成品' },
  { id: 'RawMaterial', name: '原料' },
];

const MaterialEdit: React.FC = () => (
  <Edit>
    <SimpleForm >
      <Box display="flex" flexWrap="wrap" gap={1}>
        <Box flex="1 1 48%">
          <TextInput source="productId" label="ProductId" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="name" label="Name" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <SelectInput source="type" label="Type" choices={typeChoices} fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="unit" label="Unit" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput type="number" source="minStock" label="Min Stock" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="stageId" label="Stage ID" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="stageName" label="Stage Name" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="product" label="Product" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="category" label="Category" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="description" label="Description" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="supplier" label="Supplier" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput type="number" source="perBlend" label="Per Blend" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput type="number" source="percent2" label="2%" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput type="number" source="totalKg2" label="2% total kg" fullWidth margin="dense" />
        </Box>
      </Box>
    </SimpleForm>
  </Edit>
);

export default MaterialEdit;
