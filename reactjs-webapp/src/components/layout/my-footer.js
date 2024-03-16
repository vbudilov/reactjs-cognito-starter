import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        borderTop: '1px solid #E7E7E7',
        marginTop: theme.spacing(3),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        backgroundColor: theme.palette.background.paper, // Or any color that suits your theme
        // Uncomment the next line if you want the footer to be fixed at the bottom of the page
        // position: 'fixed', bottom: 0, left: 0,
    },
    text: {
        textAlign: 'center',
        color: theme.palette.text.secondary, // Adjust text color to match your theme
    },
}));

export function Footer() {
    const classes = useStyles();

    return (
        <Box component="footer" className={classes.footer} width="100%">
            <Container maxWidth="lg">
                <Typography variant="body1" className={classes.text}>
                    brought to you by Vladimir Budilov {new Date().getFullYear()}
                </Typography>
            </Container>
        </Box>
    );
}
