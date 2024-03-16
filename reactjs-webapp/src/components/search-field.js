import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function SearchField(props) {
    const classes = useStyles();
    const [state, setState] = React.useState("");
    const handleChange = props.handleChange;
    const onChange = (event) => {
        setState(event.target.value);

        handleChange(event.target.value);

    };
    return (
        <Paper component="form" className={classes.root}>
            {/*<IconButton className={classes.iconButton} aria-label="menu">*/}
            {/*    <MenuIcon />*/}
            {/*</IconButton>*/}
            <InputBase
                className={classes.input}
                placeholder={props.placeholder}
                inputProps={{'aria-label': props.placeholder}}
                fullWidth={props.fullWidth}
                value={state}
                onChange={onChange}
            />
            <IconButton className={classes.iconButton} aria-label="search" size="large">
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}
