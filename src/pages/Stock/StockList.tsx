import {
  List,
  Datagrid,
  TextField,
  EditButton,
  TopToolbar,
  CreateButton,
  FunctionField,
  ExportButton,
  TextInput,
  DateField,
} from 'react-admin';
import { Card, CardContent, Button, Box } from '@mui/material';
import DeleteWithConfirmButton from "../../components/DeleteWithConfirmButton.tsx";
import UploadButton from '../../components/UploadButton.tsx';
import TemplateDownloadButton from '../../components/TemplateDownloadButton.tsx';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';
const stockFilters = [
  <TextInput sx={{
    '& .MuiInputBase-input': {
      height: 40,      // 输入框高度
      padding: '6px 12px',
      fontSize: 14,
      lineHeight: '40px', // 使文字垂直居中
    },
    minHeight: 36,      // 整体高度
    marginBottom: '16px',
  }} label="Search For Product ID" source="productId" alwaysOn resettable />,

];
const ListActions = () => {
  const navigate = useNavigate();
  return (
    <TopToolbar>
      <TemplateDownloadButton href="/templates/stock_template.csv" />
      <UploadButton resource="stock" onSuccess={() => window.location.reload()} />
      <ExportButton sx={{
        textTransform: 'capitalize', '&.css-istbiy-MuiButtonBase-root-MuiButton-root': {
          marginLeft: '0 !important', // 强制覆盖
        }, top: '-5px', '& span': {

          marginRight: '2px',

        }, ml: 0,
      }} />
      <CreateButton label="新建 Stock" sx={{
        top: '-5px', '& span': {

          marginRight: '2px',
        }
      }} />
    </TopToolbar>
  );
};

const ActionButtons = ({ record }: { record?: any }) => {
  const navigate = useNavigate();
  if (!record) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', width: '100%' }}>
      {/* <Button
        color="primary"
        size="small"
        startIcon={<BarChartIcon />}
        sx={{ textTransform: 'capitalize', minWidth: 'auto' }}
        onClick={e => { e.stopPropagation(); navigate(`/sales/${record.id}/chart`); }}
      >
        Chart
      </Button> */}
      <EditButton record={record} sx={{ textTransform: 'capitalize' }} />
      <DeleteWithConfirmButton record={record} resource="stock" />
    </div>
  );
};
const StockList = (props) => (

  <List
    empty={false}
    filters={stockFilters}
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
          <TextField source="id" label="Stock id" />
          <TextField source="product.productId" label="产品编号" />
          <TextField source="product.name" label="产品名称" />
          <TextField source="quantity" label="数量" />
          <TextField source="product.unit" label="单位" />
          <FunctionField label="操作" render={record => <ActionButtons record={record} />} />

        </Datagrid>
      </Box>
    </Box>
  </List >
);

export default StockList;
