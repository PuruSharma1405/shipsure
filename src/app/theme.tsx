import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Create a light theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#008A25",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: "#F2EEEB",
        },
      },
    },
    MuiNativeSelect: {
      styleOverrides: {
        select: {
          backgroundColor: "#F2EEEB",
        },
      },
    },
    // MuiCard: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: '#F2EEEB',
    //     }
    //   },
    // },
    // MuiDialog: {
    //   styleOverrides: {
    //     paper: {
    //       padding: '24px 0px 24px 0px',

    //     },
    //   },
    // },
    // MuiDialogActions: {
    //   styleOverrides: {
    //     spacing: '20px'
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-containedPrimary': {
            backgroundColor: '#1C1C17', // Primary button background color
            color: '#FFFFFF', // Primary button text color
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: '#FFFFFF', // Secondary button background color
            color: '#1C1C17', // Secondary button text color
          },
        }
      },
    },
  },
  shape: {
    borderRadius: 24, // You can adjust this value to make the buttons more or less round
  },
});

// Create a dark theme by extending the light theme and overriding specific values
const darkTheme = createTheme({
  breakpoints: { values: { xs: 300, sm: 600, md: 900, lg: 1200, xl: 1536 } },
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#90caf9", // Color when checked in light mode
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: "#333",
          color: "#fff",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: "#fff",
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
