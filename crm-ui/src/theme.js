// import { blue, green, indigo, cyan, deepPurple, amber, blueGrey, pink, purple, teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const myTheme = createTheme({
    palette: {
        primary: {
            main: '#137da7'
        },
        secondary: {
            main: '#f50057'
        }
    },
    typography: {
        allVariants: {
            fontFamily: "Alata",
            textTransform: "none",
        },
        button: {
            textTransform: "none",
        }
    },
    // components: {
    //     MuiListItem: {
    //         styleOverrides: {
    //             root: {
    //                 backgroundColor: 'blue',

    //                 '&.Mui-selected': {
    //                     backgroundColor: 'red',
    //                 },
    //             },
    //         },
    //     },
    // },
});