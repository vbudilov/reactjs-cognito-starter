import React from 'react';
import makeStyles from '@mui/styles/makeStyles';

import {Container} from "@mui/material";
import {Logger} from "@aws-amplify/core";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

const logger = new Logger("UploadFileAccordion");
const theme = createTheme();

theme.typography.h3 = {
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
        fontSize: '1.5rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        padding: theme.spacing(3),

    },box: {
        width: '300px',
        height: '300px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)',
        margin: '0 auto'
    }
}));

export const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container
                justifyContent="center"
                alignItems="center"
                spacing={1}
                xl={12}
                sm={12}
                sx={{p: 1}}
                className={classes.accordion}
                style={{width: "100%"}}
            >
                <ThemeProvider theme={theme}>
                    <Typography variant="h3">Sample AWS Solutions...</Typography>
                </ThemeProvider>
                <Link to={"/alttext"}>
                <Button>
                    <Box
                        className={classes.box}
                    >
                        Generate alternative text from images


                    </Box>
                </Button>
                </Link>
            </Container>

        </div>)
        ;
}
