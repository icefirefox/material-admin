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
      <TextInput type="number" source="quantity" />
      <TextInput className="custom-text-input" source="unit" />

      <ArrayInput source="items" label="原料列表">
        <SimpleFormIterator inline fullWidth>
          <TextInput className="custom-text-input" source="materialId" label="原料ID" />
          <TextInput className="custom-text-input" source="materialName" label="原料名" />
          <TextInput type="number" source="quantity" label="数量" />
          <TextInput className="custom-text-input" source="unit" label="单位" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default BomCreate;
