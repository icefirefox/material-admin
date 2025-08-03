import { SelectInput, useGetList, required } from 'react-admin';
interface FinishedGoodsSelectInputProps {
  type?: string;
}
const FinishedGoodsSelectInput: React.FC<FinishedGoodsSelectInputProps> = ({ type = 'FinishedGood' }) => {
  const { data, isLoading, error } = useGetList('materials', {
    pagination: { page: 1, perPage: 1000 },
    sort: { field: 'productId', order: 'ASC' },
    filter: { type }, // 只获取 finished_goods 类型的 material
  });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error loading product options</span>;

  const choices = (data ?? []).map(item => ({
    id: item.productId, // id 就是 productId
    name: `${item.productId} - ${item.name}`, // 显示格式可改
  }));

  return (
    <SelectInput
      source="productId"
      label="Product ID"
      choices={choices}
      validate={[required()]}
    />
  );
};

export default FinishedGoodsSelectInput;
