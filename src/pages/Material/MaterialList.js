import {
  List, Datagrid, TextField, TopToolbar, ExportButton, EditButton,
  CreateButton, useRecordContext, FunctionField,
  editFieldTypes,
} from "react-admin";
import UploadButton from "../../components/UploadButton";
import DeleteWithConfirmButton from "../../components/DeleteWithConfirmButton.tsx";
import Box from "@mui/material/Box";
import { ellipsisCell } from '../../styles/ellipsis.ts';

const ListActions = () => (
  <TopToolbar>
    <UploadButton onSuccess={() => window.location.reload()} />
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
      <DeleteWithConfirmButton record={record} sx={{
        '& .MuiButton-startIcon': {
          marginRight: 0, // 默认是8px，可以缩小为4px或者更小
        }
      }} />
    </div>
  );
};


const MaterialList = (props) => (

  <List
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
          <TextField source="id" />
          <TextField source="productId" label="ProductId" />
          <TextField source="name" />
          <FunctionField
            label="Type"
            render={record =>
              record.type === "FinishedGood" ? "成品" :
                record.type === "RawMaterial" ? "原料" : "-"
            }
          />
          <TextField source="unit" />
          <TextField source="minStock" sx={ellipsisCell} />
          <TextField source="stageId" />
          <TextField sx={ellipsisCell} source="stageName" />
          <TextField source="product" />
          <TextField source="category" />
          <TextField source="description" />
          <TextField source="supplier" />
          <TextField source="perBlend" sx={ellipsisCell} />
          <TextField source="percent2" />
          <TextField source="totalKg2" sx={ellipsisCell} />

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
