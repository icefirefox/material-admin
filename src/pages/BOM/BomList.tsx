import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  TopToolbar,
  CreateButton,
  FunctionField,
} from 'react-admin';
import { Card, CardContent } from '@mui/material';
import DeleteWithConfirmButton from "../../components/DeleteWithConfirmButton.tsx";
import { ellipsisCell } from '../../styles/ellipsis.ts';

const ListActions = () => (
  <TopToolbar>
    <CreateButton label="新建 BOM" />
  </TopToolbar>
);

// 自定义操作列，把编辑和删除按钮合并一行显示
const ActionButtons = ({ record }: { record?: any }) => {
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

const BomList = () => (
  <div style={{ padding: '24px' }}>
    <Card elevation={3} sx={{ borderRadius: 3, padding: 2 }}>
      <CardContent>
        <List title="BOM 列表" actions={<ListActions />} perPage={25}>
          <div style={{ overflowX: 'auto' }}>
            <Datagrid rowClick="edit"
              sx={{
                minWidth: 900,
                '& .RaDatagrid-headerCell': {
                  fontWeight: 'bold',
                  textAlign: 'center',
                },

                '& .RaDatagrid-rowCell': {
                  textAlign: 'center',
                },
              }}

            >
              <TextField source="bomCode" label="BOM 编号" />
              <TextField source="stage" label="阶段" />

              {/* <ReferenceField source="productId" reference="materials" label="产品">
                <TextField source="name" />
              </ReferenceField> */}
              <TextField source="productName" label="产品" />

              <FunctionField
                label="操作"
                render={record => <ActionButtons record={record} />}
              />
            </Datagrid>
          </div>
        </List>
      </CardContent>
    </Card>
  </div>
);

export default BomList;
