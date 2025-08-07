import React from "react";
import {
  CreateBase,
  SimpleForm,
  TextInput,
  SelectInput,
  useNotify,
  useRedirect,
  useCreate,
  required,
} from "react-admin";
import Box from "@mui/material/Box";

const typeChoices = [
  { id: 'FinishedGood', name: '成品' },
  { id: 'RawMaterial', name: '原料' },
];

const MaterialCreate: React.FC = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate();

  const handleSave = async (data: any) => {
    try {
      await create('materials', { data });
      notify('保存成功', { type: 'info' });
      redirect('list', 'materials');
    } catch (error) {
      notify('保存失败', { type: 'error' });
    }
  };

  return (
    <CreateBase resource="materials">
      <SimpleForm onSubmit={handleSave}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          <Box flex="1 1 48%">
            <TextInput source="productId" label="Material Code" fullWidth />
          </Box>
          <Box flex="1 1 48%">
            <TextInput source="name" label="Name" fullWidth />
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
            <TextInput source="unit" label="Unit" fullWidth />
          </Box>
          <Box flex="1 1 48%">
            <TextInput source="size" label="Size" fullWidth />
          </Box>
          <Box flex="1 1 48%">
            <TextInput source="packType" label="pack type" fullWidth />
          </Box>
          <Box flex="1 1 48%">
            <TextInput source="description" fullWidth />
          </Box>
          <Box flex="1 1 48%">
            <TextInput source="supplier" fullWidth />
          </Box>
          {/* <Box flex="1 1 48%">
            <TextInput type="number" source="perBlend" fullWidth />
          </Box>
          <Box flex="1 1 48%">
            <TextInput label="proportion(%)" type="number" source="percent2" fullWidth />
          </Box>
          <Box flex="1 1 48%">
            <TextInput label="weight(g)" type="number" source="totalKg2" fullWidth />
          </Box> */}
        </Box>
      </SimpleForm>
    </CreateBase>
  );
};

export default MaterialCreate;
