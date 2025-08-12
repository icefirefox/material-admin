import { AutocompleteInput, SelectInput, useDataProvider, required } from 'react-admin';
import React from 'react';

interface RawMaterialSelectInputProps {
  type?: string;
  sx?: object;
  source?: string;
  label?: string;
  showSearch?: boolean;  // 是否显示搜索，true 时用 AutocompleteInput，否则用 SelectInput
}

const RawMaterialSelectInput: React.FC<RawMaterialSelectInputProps> = ({
  type = 'RawMaterial',
  showSearch = true,   // 默认启用搜索
  sx,
  source = 'material',
  label = '产品',
}) => {
  const dataProvider = useDataProvider();
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    setLoading(true);
    dataProvider
      .getList('bom/getFinishedGoodsSelectInput', {
        pagination: { page: 1, perPage: 10000 },
        sort: { field: 'productId', order: 'ASC' },
        filter: { type },
      })
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }, [type, dataProvider]);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error loading product options</span>;

  const choices = (data ?? []).map(item => ({
    id: item.productId,
    name: `${item.productId} - ${item.name}`,
    type: item.type,
    unit: item.unit,
    raw: item,
  }));

  if (showSearch) {
    return (
      <AutocompleteInput
        sx={{
          width: '100%',               // 控件宽度
          marginTop: 1,          // 上边距
          '& .MuiAutocomplete-inputRoot': {
            // backgroundColor: '#f9f9f9',  // 输入框背景色
            borderRadius: 1,
            padding: '0px 8px',
            width: '100%',
          },
          '& .MuiAutocomplete-popupIndicator': {
            color: '#1976d2',       // 下拉箭头颜色
          },
          '& .MuiAutocomplete-clearIndicator': {
            color: '#d32f2f',       // 清除按钮颜色
          },
          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2',  // 聚焦时边框色
            borderWidth: 2,
          },
          fontSize: 14,
        }}
        source={source}
        label={label}
        choices={choices}
        optionValue="id"
        optionText="name"
        validate={[required()]}
        // sx={sx}
        parse={id => choices.find(c => c.id === id)?.raw}
        format={obj => obj?.productId ?? ''}
        // 可选：设置过滤属性，默认会过滤 optionText
        filterToQuery={searchText => ({ name: searchText })}
      />
    );
  }

  // 不搜索，普通下拉
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
