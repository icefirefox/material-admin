import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
} from "react-admin";


const typeChoices = [
  { id: 'FinishedGood', name: '成品' },
  { id: 'RawMaterial', name: '原料' },
];

const MaterialCreate: React.FC = () => (
  <Create>
    <SimpleForm>
      <TextInput source="productId" label="ProductId" />
      <TextInput source="name" label="Name" />
      <SelectInput source="type" label="Type" choices={typeChoices} />
      <TextInput source="unit" label="Unit" />
      <TextInput type="number" source="minStock" label="Min Stock" />
      <TextInput source="stageId" />
      <TextInput source="stageName" />
      <TextInput source="product" />
      <TextInput source="category" />
      <TextInput source="description" />
      <TextInput source="supplier" />
      <TextInput type="number" source="perBlend" />
      <TextInput type="number" source="percent2" />
      <TextInput type="number" source="totalKg2" />

    </SimpleForm>
  </Create>
);

export default MaterialCreate;
