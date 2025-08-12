import { SelectInput, AutocompleteInput, required } from 'react-admin';
import React from 'react';

interface ItemSelectInputProps {
  type?: string;
  sx?: object;
  source?: string;
  label?: string;
  showSearch?: boolean;
  choices: any[];
}

const ItemSelectInput: React.FC<ItemSelectInputProps> = ({
  showSearch = true,
  sx,
  source = 'productId',
  label = '产品',
  choices,
}) => {
  const formattedChoices = (choices ?? []).map(item => ({
    id: item.productId,
    name: `${item.productId} - ${item.name}`,
    raw: item,
  }));

  if (showSearch) {
    return (
      <AutocompleteInput
        source={source}
        label={label}
        choices={formattedChoices}
        optionValue="id"
        optionText="name"
        validate={[required()]}
        filterToQuery={searchText => ({ name: searchText })}
        parse={id => {
          const found = formattedChoices.find(c => c.id === id);
          return found ? found.raw : undefined;
        }}
        format={value => {
          if (!value) return '';
          if (typeof value === 'object') return value.productId || value.id || '';
          return value;
        }}
        sx={{

          width: '100%',
          marginTop: 1,
          fontSize: 14,
          ...sx,
        }}
      />
    );
  }
  return (
    <SelectInput
      source={source}
      label={label}
      choices={formattedChoices}
      optionValue="id"
      optionText="name"
      validate={[required()]}
      sx={sx}
      parse={id => {
        const found = formattedChoices.find(c => c.id === id);
        return found ? found.raw : null;
      }}
      format={value => {
        if (!value) return '';
        if (typeof value === 'object') return value.productId || value.id || '';
        return value;
      }}
    />
  );
};

export default ItemSelectInput;
