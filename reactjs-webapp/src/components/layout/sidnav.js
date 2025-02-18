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

const useStyles = makeStyles((theme) => ({
    navButton: {
        marginBottom: theme.spacing(1),
        borderRadius: theme.spacing(2), // Increased border radius
        padding: theme.spacing(1.5),
        textTransform: 'none',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'all 0.2s ease',
        backgroundColor: '#000000',
        color: '#ffffff',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            backgroundColor: '#333333'
        }
    }
}));

export const SideNavbar = ({ loggedIn }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Box sx={{ p: 2 }}>
            <Grid container direction="column" spacing={2}>
                {loggedIn && <Grid item>
                    <Link to={"/alttext"} style={{ textDecoration: 'none', display: 'block', marginBottom: '12px' }}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<ArticleIcon />}
                            className={classes.navButton}
                            sx={{
                                backgroundColor: '#000000',
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#333333',
                                }
                            }}
                        >
                            Alt Text
                        </Button>
                    </Link>
                    <Link to={"/documents"} style={{ textDecoration: 'none', display: 'block' }}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<ReceiptLongIcon />}
                            className={classes.navButton}
                            sx={{
                                backgroundColor: '#000000',
                                color: '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#333333',
                                }
                            }}
                        >
                            Documents
                        </Button>
                    </Link>
                </Grid>}

                <Grid item>
                    {!loggedIn &&
                        <Link to={"/login"} style={{ textDecoration: 'none' }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                className={classes.navButton}
                                sx={{
                                    backgroundColor: 'transparent',
                                    color: '#000000',
                                    borderColor: '#000000',
                                    borderWidth: '2px',
                                    fontWeight: 600,
                                    '&:hover': {
                                        backgroundColor: '#000000',
                                        color: '#ffffff',
                                        borderColor: '#000000'
                                    }
                                }}
                            >
                                Login
                            </Button>
                        </Link>
                    }
                </Grid>
            </Grid>
        </Box>
    );
};
