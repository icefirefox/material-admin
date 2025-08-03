// CustomSidebar.tsx
import { Sidebar } from 'react-admin';

const CustomSidebar = (props: any) => (
  <Sidebar
    {...props}
    sx={{
      // width: 200, // 固定宽度
      // minWidth: 200,
      height: 'auto', // 高度自动
      minHeight: '100vh', // 避免太短
      position: 'sticky',
      top: 0,
      maxWidth: 200,
    }}
  />
);

export default CustomSidebar;
