// theme.ts
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const erpNextTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f7fa',  // 浅灰色背景
      paper: '#ffffff',
    },
    primary: {
      main: '#1976d2', // 蓝色按钮/主色
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
    divider: '#e0e0e0',
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    RaLoginCard: {
      styleOverrides: {
        root: {
          marginTop: '150px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#333333',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          minHeight: 56,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderRadius: 12,
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0f2f5',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 'bold',
          color: '#444',
          borderBottom: '1px solid #e0e0e0',
        },
        body: {
          borderBottom: '1px solid #f0f0f0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          '&.RaLoginForm-button': {
            marginTop: '0px',
          },

        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          marginBottom: 0,
          backgroundColor: '#ffffff',
          borderRadius: 8,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ccc',
            },
            '&:hover fieldset': {
              borderColor: '#1976d2',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#fff',

        },
        input: {
          paddingLeft: '10px',
          paddingBottom: '0px',
          paddingTop: '0px',
          height: '50px',
          width: '100%',
          lineHeight: '50px',
          boxSizing: 'border-box',

        },

      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#333333', // 全局字体颜色
        },
        noWrap: {
          color: '#333333', // noWrap 版本文字颜色
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',  // 你想要的菜单背景色
          // 这里可以设置其他样式，比如去掉阴影
          boxShadow: 'none',
        },
      },
    },
    // 新增全局样式覆盖
    MuiCssBaseline: {
      styleOverrides: {
        '.custom-text-input .MuiOutlinedInput-input': {
          //paddingTop: '20px !important', // 特定的顶部内边距
          paddingLeft: '10px',
          paddingBottom: '0px',
          paddingTop: '0px',
          height: '50px',
          width: '100%',
          lineHeight: '50px',
          boxSizing: 'border-box',
        },
      }
    },
  },
});

export default erpNextTheme;
