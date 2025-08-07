import {
  List, Datagrid, TextField, TopToolbar, ExportButton, EditButton,
  CreateButton, useRecordContext, FunctionField, TextInput,
  editFieldTypes,
} from "react-admin";
import UploadButton from "../../components/UploadButton.tsx";
import DeleteWithConfirmButton from "../../components/DeleteWithConfirmButton.tsx";
import Box from "@mui/material/Box";
import { ellipsisCell } from '../../styles/ellipsis.ts';
import TemplateDownloadButton from "../../components/TemplateDownloadButton.tsx";
const materialFilters = [
  <TextInput sx={{
    '& .MuiInputBase-input': {
      height: 40,      // 输入框高度
      padding: '6px 12px',
      fontSize: 14,
      lineHeight: '40px', // 使文字垂直居中
    },
    minHeight: 36,      // 整体高度
    marginBottom: '16px',
  }} label="Search For Material Code" source="productId" alwaysOn resettable />,

];
const ListActions = () => (
  <TopToolbar sx={{
    marginBottom: '16px',
  }}>
    <TemplateDownloadButton href="/templates/material_template.csv" />
    <UploadButton onSuccess={() => window.location.reload()} source="materials" />
    <ExportButton sx={{ textTransform: 'capitalize' }} />
    <CreateButton sx={{ textTransform: 'capitalize' }} />
  </TopToolbar>
);

// 自定义操作列，把编辑和删除按钮合并一行显示
const ActionButtons = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      width: '100%',
      textAlign: 'center',
    }}>
      <EditButton record={record} sx={{
        '& .MuiButton-startIcon': {
          marginRight: 0, // 默认是8px，可以缩小为4px或者更小
        }, textTransform: 'capitalize'
      }} />
      <DeleteWithConfirmButton record={record} resource="materials" sx={{
        '& .MuiButton-startIcon': {
          marginRight: 0, // 默认是8px，可以缩小为4px或者更小
        }
      }} />
    </div>
  );
};


const MaterialList = (props) => (

  <List
    empty={false}
    filters={materialFilters}
    {...props} actions={<ListActions />}>

    <Box sx={{
      maxWidth: 'calc(100vw - 290px)', // 减去 Sidebar 宽度
      overflowX: 'auto',
    }}>
      <Box sx={{}}>
        <Datagrid sx={{

          '& .RaDatagrid-headerCell': {
            textAlign: 'center',
          },
          '& .RaDatagrid-rowCell': {
            textAlign: 'center',
          },
        }}>
          {/* <TextField source="id" /> */}
          <TextField source="productId" sx={ellipsisCell} label="Material Code" />
          <TextField source="name" />
          <FunctionField
            label="Type"
            render={record =>
              record.type === "FinishedGood" ? "FinishedGood" :
                record.type === "RawMaterial" ? "RawMaterial" : "-"
            }
          />
          <TextField source="unit" />
          <TextField source="packType" label="Pack Type" sx={ellipsisCell} />
          <TextField source="size" />
          {/* <TextField sx={ellipsisCell} source="stageName" />  */}
          {/* <TextField source="product" />
          <TextField source="category" /> */}
          <TextField source="description" />
          <TextField source="supplier" />
          {/* <TextField source="perBlend" sx={ellipsisCell} />
          <TextField label="proportion(%)" source="percent2" />
          <TextField label="weight(g)" source="totalKg2" sx={ellipsisCell} /> */}

          <FunctionField
            label="操作"
            render={record => <ActionButtons record={record} />}
          />
        </Datagrid>
      </Box>
    </Box>
  </List >
);

export default MaterialList;
