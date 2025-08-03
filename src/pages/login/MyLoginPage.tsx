// MyLoginPage.tsx
import { Login } from 'react-admin';
import { Box, Paper, Typography } from '@mui/material';

const MyLoginPage = () => (
  <Box
    sx={{
      background: '#ffffff', // 强制登录页背景白色
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        borderRadius: 2,
        maxWidth: 400,
        width: '100%',
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        欢迎登录
      </Typography>
      <Login />
    </Paper>
  </Box>
);

export default MyLoginPage;
