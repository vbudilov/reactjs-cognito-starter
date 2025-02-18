import makeStyles from '@mui/styles/makeStyles';
import {Fonts} from '../../constants/AppEnums';
import MonochromeColors from '../../constants/MonochromeTheme';

const useStyles = makeStyles((theme) => ({
    '@global': {
        // for global styles
        '.MuiLink-root': {
            fontFamily: Fonts.REGULAR,
            color: MonochromeColors.DARK_BLUE,
            '&:hover': {
                color: MonochromeColors.BLACK,
            },
        },
        '.pointer': {
            cursor: 'pointer',
        },
        '.MuiTableCell-stickyHeader': {
            backgroundColor: MonochromeColors.WHITE,
        },
        // Chart styles
        '.recharts-cartesian-grid-horizontal line, .recharts-cartesian-grid-vertical line': {
            stroke: MonochromeColors.MEDIUM_GRAY,
        },
        '.recharts-bar-rectangle path': {
            fill: MonochromeColors.BLACK,
        },
    },
}));

export default useStyles;
