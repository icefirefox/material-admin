import { SelectInput, useGetList, required } from 'react-admin';
interface RawMaterialSelectInputProps {
  type?: string;
  sx?: object;
  source?: string;
  label?: string;
}
const RawMaterialSelectInput: React.FC<RawMaterialSelectInputProps> = ({ type = 'RawMaterial', sx, source = 'material',
  label = '产品', }) => {
  const { data, isLoading, error } = useGetList('materials', {
    pagination: { page: 1, perPage: 1000 },
    sort: { field: 'productId', order: 'ASC' },
    filter: { type }, // 只获取 finished_goods 类型的 material
  });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error loading product options</span>;

  const choices = (data ?? []).map(item => ({
    id: item.productId,
    name: `${item.productId} - ${item.name}`,
    type: item.type,
    unit: item.unit,
    raw: item, // 保留原始对象
  }));

  return (
    <SelectInput
      source={source}
      label={label}
      choices={choices}
      optionValue="id"
      optionText="name"
      validate={[required()]}
      sx={sx}
      parse={id => choices.find(c => c.id === id)?.raw}
      format={obj => obj?.productId ?? ''}

    />
  );
};

export default RawMaterialSelectInput;
