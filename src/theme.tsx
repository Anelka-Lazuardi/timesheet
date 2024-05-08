'use client';
import { Nunito } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const nunito = Nunito({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    typography: {
        fontFamily: nunito.style.fontFamily,
    },
    shape: { borderRadius: 8 },
    palette: {
        primary: {
            main: '#2775EC',
        },
        error: {
            main: '#F15858',
        },
        secondary: {
            main: '#F0F6FF',
        },
        info: {
            main: '#F7F8FB'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Set textTransform to none
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    position: 'relative',
                    boxShadow: `0 0 2px 0 ${alpha('#919EAB', 0.2)}, 0 12px 24px -4px ${alpha('#919EAB', 0.12)}`,
                    borderRadius: 8 * 2,
                    zIndex: 0, // Fix Safari overflow: hidden with border radius
                },
            },
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: { variant: 'h6' },
                //   subheaderTypographyProps: { variant: 'body2', marginTop: self.spacing(0.5) },
            },
            styleOverrides: {
                root: {
                    // padding: theme.spacing(3, 3, 0),
                },
            },
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    // padding: theme.spacing(3),
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // Set textTransform to none
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 15, // Set border radius for dialogs
                },
            },
        },

        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        opacity: 1,
                        color: '#919EAB',
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                underline: {
                    '&:before': {
                        borderBottomColor: alpha('#919EAB', 0.56),
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    backgroundColor: alpha('#919EAB', 0.12),
                    '&:hover': {
                        backgroundColor: alpha('#919EAB', 0.16),
                    },
                    '&.Mui-focused': {
                        backgroundColor: alpha('#919EAB', 0.24),
                    },

                },
                underline: {
                    '&:before': {
                        borderBottomColor: alpha('#919EAB', 0.56),
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: alpha('#919EAB', 0.32),
                    },
                    '&.Mui-disabled': {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: alpha('#919EAB', 0.24),
                        },
                    },
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button': {
                        display: 'none', // Hide spinner controls in WebKit browsers
                    },
                    '& input[type="number"]': {
                        MozAppearance: 'textfield', // Hide arrows in Firefox
                    },
                },
            },
        },

        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },

            variants: [
                {
                    props: { variant: 'outlined' },
                    style: { borderColor: alpha('#919EAB', 0.32), },
                },
            ],

            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },


    },

});





export default theme;
