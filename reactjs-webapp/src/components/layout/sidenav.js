// SideNavbar.js
import React from 'react';
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArticleIcon from "@mui/icons-material/Article";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";
import { useTheme } from "@mui/material/styles";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
    navContainer: {
        padding: theme.spacing(3, 2),
        margin: theme.spacing(1),
    },
    navButton: {
        marginBottom: theme.spacing(1.5),
        borderRadius: theme.spacing(1),
        padding: theme.spacing(2),
        textTransform: 'none',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        backgroundColor: '#ffffff',
        color: '#2d3436',
        fontSize: '0.95rem',
        fontWeight: 500,
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #e0e0e0',
        '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        },
    },
    buttonContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    buttonTitle: {
        fontWeight: 600,
        color: '#000000',
    },
    buttonSubtitle: {
        fontSize: '0.8rem',
        color: '#7d7d7d',
    },
    buttonIcon: {
        color: '#7d7d7d',
    }
}));

export const SideNavbar = ({ loggedIn }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Box className={classes.navContainer}>
            <Grid container direction="column" spacing={2}>
                {loggedIn && <Grid item>
                    <Link to={"/documents"} style={{ textDecoration: 'none', display: 'block' }}>
                        <Button
                            fullWidth
                            className={classes.navButton}
                        >
                            <div className={classes.buttonContent}>
                                <span className={classes.buttonTitle}>Documents</span>
                                <span className={classes.buttonSubtitle}>Manage your files</span>
                            </div>
                            <ReceiptLongIcon className={classes.buttonIcon} />
                        </Button>
                    </Link>
                    <Link to={"/alttext"} style={{ textDecoration: 'none', display: 'block', marginBottom: '12px' }}>
                        <Button
                            fullWidth
                            className={classes.navButton}
                        >
                            <div className={classes.buttonContent}>
                                <span className={classes.buttonTitle}>Alt Text</span>
                                <span className={classes.buttonSubtitle}>Edit descriptions</span>
                            </div>
                            <ArticleIcon className={classes.buttonIcon} />
                        </Button>
                    </Link>
                </Grid>}

                <Grid item>
                    {!loggedIn &&
                        <Link to={"/login"} style={{ textDecoration: 'none' }}>
                            <Button
                                fullWidth
                                className={classes.navButton}
                            >
                                <div className={classes.buttonContent}>
                                    <span className={classes.buttonTitle}>Login</span>
                                    <span className={classes.buttonSubtitle}>Access your account</span>
                                </div>
                                <ArrowForwardIosIcon className={classes.buttonIcon} />
                            </Button>
                        </Link>
                    }
                </Grid>
            </Grid>
        </Box>
    );
};
