// BomCreate.tsx
import {
  Create,
  SimpleForm,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";
import FinishedGoodsSelectInput from '../../components/FinishedGoodsSelectInput.tsx'; // 路径根据实际位置调整

const BomCreate = () => (
  <Create>
    <SimpleForm>
      <FinishedGoodsSelectInput />

      {/* <TextInput source="productId" label="Product ID" validate={required()} /> */}
      <TextInput className="custom-text-input" source="version" />
      <TextInput source="stage" label="阶段" fullWidth />
      <TextInput type="number" source="quantity" />
      <TextInput className="custom-text-input" source="unit" />

      <ArrayInput source="items" label="原料列表">
        <SimpleFormIterator inline fullWidth>
          <FinishedGoodsSelectInput sx={{ mt: 0 }} type="RawMaterial" />
          <TextInput type="number" source="quantity" label="数量" />
          <TextInput className="custom-text-input" source="unit" label="单位" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default BomCreate;
