// Layout.tsx
import { Layout, LayoutProps } from 'react-admin';
import CustomSidebar from './CustomSidebar.tsx';

const CustomLayout = (props: LayoutProps) => (
  <Layout
    {...props}
    sidebar={CustomSidebar}
  />
);

export default CustomLayout;
