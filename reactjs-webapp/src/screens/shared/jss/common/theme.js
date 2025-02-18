import { createTheme } from '@mui/material/styles';
import MonochromeColors from '../../constants/MonochromeTheme';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: MonochromeColors.BLACK,
            light: MonochromeColors.DARK_GRAY,
            dark: MonochromeColors.ALMOST_BLACK,
        },
        secondary: {
            main: MonochromeColors.DARK_BLUE,
            light: MonochromeColors.SOFT_BLUE,
            dark: MonochromeColors.ALMOST_BLACK,
        },
        text: {
            primary: MonochromeColors.BLACK,
            secondary: MonochromeColors.DARK_GRAY,
            disabled: MonochromeColors.LIGHT_GRAY_ACCENT,
        },
        background: {
            default: MonochromeColors.LIGHT_GRAY,
            paper: MonochromeColors.WHITE,
        },
        divider: MonochromeColors.MEDIUM_GRAY,
        action: {
            active: MonochromeColors.BLACK,
            hover: MonochromeColors.DARK_BLUE,
            disabled: MonochromeColors.DISABLED_BUTTON,
            disabledBackground: MonochromeColors.MEDIUM_GRAY,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        backgroundColor: MonochromeColors.DISABLED_BUTTON,
                        color: MonochromeColors.WHITE,
                    },
                },
                contained: {
                    backgroundColor: MonochromeColors.PRIMARY_BUTTON,
                    color: MonochromeColors.WHITE,
                    '&:hover': {
                        backgroundColor: MonochromeColors.ALMOST_BLACK,
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${MonochromeColors.MEDIUM_GRAY}`,
                },
                head: {
                    color: MonochromeColors.BLACK,
                    fontWeight: 'bold',
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: MonochromeColors.LIGHT_GRAY_ACCENT,
                    color: MonochromeColors.WHITE,
                },
            },
        },
    },
    typography: {
        allVariants: {
            color: MonochromeColors.BLACK,
        },
        h1: {
            color: MonochromeColors.BLACK,
            fontWeight: 700,
        },
        h2: {
            color: MonochromeColors.BLACK,
            fontWeight: 700,
        },
        h3: {
            color: MonochromeColors.BLACK,
            fontWeight: 600,
        },
        body1: {
            color: MonochromeColors.DARK_GRAY,
        },
        body2: {
            color: MonochromeColors.DARK_GRAY,
        },
    },
});

export default theme;