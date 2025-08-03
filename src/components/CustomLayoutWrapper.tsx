// CustomLayoutWrapper.tsx
import { Box, Card } from '@mui/material';

const CustomLayoutWrapper = ({ children }) => {
  return (
    <Box sx={{ p: 2, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card
        sx={{
          p: 2,
          boxShadow: 2,
          borderRadius: 2,
          maxWidth: 'calc(100vw - 240px)',
          overflowX: 'auto',
        }}
      >
        {children}
      </Card>
    </Box>
  );
};

export default CustomLayoutWrapper;
