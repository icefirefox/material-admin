import { useWatch } from 'react-hook-form';
import { useInput } from 'react-admin';

const UnitInput = ({ source }) => {

  // const { source } = props;
  const {
    field,  // 包含value等
    id,
  } = useInput({ source });
  // 提取 index
  const sourceName = field.name;

  // 方法1：用正则
  const match = sourceName.match(/^items\.(\d+)\./);
  const index = match ? Number(match[1]) : 0;

  const material = useWatch({ name: `items.${index}.material` });
  const unit = material?.unit || "";

  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: -16 }}>
      <label
        style={{
          minWidth: 30,
          fontWeight: 'bold',
          fontSize: '0.9rem',
          color: '#555',
          marginRight: 12,
        }}
      >
        单位
      </label>
      <span
        style={{
          // flexGrow: 1,
          padding: '6px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
          minHeight: '50px',
          maxHeight: '50px',
          lineHeight: '40px',
          color: '#333',
          boxSizing: 'border-box',
          display: 'inline-block',
          width: '100%',
        }}
      >
        {unit}
      </span>
    </div>
  );
};

export default UnitInput;
