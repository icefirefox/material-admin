import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
} from "react-admin";
import { Box } from "@mui/material";
const typeChoices = [
  { id: 'FinishedGood', name: '成品' },
  { id: 'RawMaterial', name: '原料' },
  { id: 'PackagingMaterial', name: '包装材料' },
];

const MaterialEdit: React.FC = () => (
  <Edit>
    <SimpleForm >
      <Box display="flex" flexWrap="wrap" gap={1}>
        <Box flex="1 1 48%">
          <TextInput source="productId" label="Material Code" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="name" label="Name" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <SelectInput
            source="type"
            label="Type"
            choices={typeChoices}
            fullWidth
            validate={[required()]}
          />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="unit" label="Unit" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="size" label="Size" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="packType" label="pack type" fullWidth margin="dense" />
        </Box>
        {/* <Box flex="1 1 48%">
          <TextInput source="stageName" label="Stage Name" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="product" label="Product" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="category" label="Category" fullWidth margin="dense" />
        </Box> */}
        <Box flex="1 1 48%">
          <TextInput source="description" label="Description" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput source="supplier" label="Supplier" fullWidth margin="dense" />
        </Box>
        {/* <Box flex="1 1 48%">
          <TextInput type="number" source="perBlend" label="Per Blend" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput label="proportion(%)" type="number" source="percent2" fullWidth margin="dense" />
        </Box>
        <Box flex="1 1 48%">
          <TextInput label="weight(g)" type="number" source="totalKg2" fullWidth margin="dense" />
        </Box> */}
      </Box>
    </SimpleForm>
  </Edit>
);

export default MaterialEdit;
