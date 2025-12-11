import colors from 'assets/styles/abstracts/color';
import {rem} from 'assets/styles/abstracts/functions';
import {createUseStyles} from 'react-jss';

const styles = {
    navbar: {
        backgroundColor: colors.darkBlue,
    },
    left: {
        display: 'flex',
        marginLeft: rem(-9),
        alignItems: 'center',
        '& img': {
            display: 'block',
            width: rem(100),
        }
    },
    center: {
        textAlign: 'center',
        color: 'white',
        fontSize: rem(14),
        letterSpacing: '0.5px',
        fontWeight: 500,
        userSelect: 'none',
    },

};

export const useHeaderNavbarStyles = createUseStyles(styles);
