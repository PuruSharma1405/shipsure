import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Create a light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#008A25',
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: '#F2EEEB',
        },
      },
    },
    MuiNativeSelect: {
      styleOverrides: {
        select: {
          backgroundColor: '#F2EEEB',
        },
      },
    },
  }
});

// Create a dark theme by extending the light theme and overriding specific values
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#90caf9', // Color when checked in light mode
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: '#333',
          color: '#fff',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: '#fff',
        },
      },
    },
  },
});


export { lightTheme, darkTheme };