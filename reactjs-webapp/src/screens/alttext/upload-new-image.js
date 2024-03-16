import React, {useEffect, useState} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from "@mui/material/Tooltip";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import {Alert, CircularProgress, Grid} from "@mui/material";
import {UploadService} from "../../services/dao/uploader-service";
import {Logger} from "@aws-amplify/core";
import {green} from '@mui/material/colors';

const logger = new Logger("UploadFileAccordion");

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        padding: theme.spacing(3),

    }, accordion: {
        width: "100%",
    }, selectEmpty: {
        marginTop: theme.spacing(2),
    }, heading: {
        fontSize: theme.typography.pxToRem(15),
    }, secondaryHeading: {
        fontSize: theme.typography.pxToRem(15), color: theme.palette.text.secondary,
    }, icon: {
        verticalAlign: 'bottom', height: 20, width: 20,
    }, details: {
        alignItems: 'center',
    }, column: {
        flexBasis: '100%',
    }, helper: {
        borderLeft: `2px solid ${theme.palette.divider}`, padding: theme.spacing(1, 2),
    }, link: {
        color: theme.palette.primary.main, textDecoration: 'none', '&:hover': {
            textDecoration: 'underline',
        },
    }, wrapper: {
        margin: theme.spacing(1), position: 'relative',
    }, buttonSuccess: {
        backgroundColor: green[500], '&:hover': {
            backgroundColor: green[700],
        },
    }, buttonProgress: {
        color: green[500], position: 'absolute', top: '50%', left: '50%', marginTop: -12, marginLeft: -12,
    },
}));

const uploaderService = new UploadService();

export const UploadNewImage = ({fileUploadedCallback}) => {
    const classes = useStyles();
    const [file, setFile] = useState(null);

    const [fileUploadError, setFileUploadError] = React.useState("");
    const [fileUploadSuccess, setFileUploadSuccess] = React.useState("");
    const [fileUploadAttempted, setFileUploadAttempted] = React.useState(false);

    const [loading, setLoading] = React.useState(false);


    const onFileSave = async () => {
        setLoading(true);

        setFileUploadError("");
        setFileUploadSuccess("");

        setFileUploadAttempted(true);

        const response = await uploaderService.uploadFile(file.selectedFile);
        setLoading(false);

        if (response && response.error) {
            setFileUploadError(response?.errorMessage);
        }
        if (response && !response.error) {
            setFileUploadSuccess("File was successfully uploaded");
            if (fileUploadedCallback) fileUploadedCallback(file.selectedFile.name);
            setFile(null);

        }
        logger.info("response: " + response);
    }

    const onMailFileSelectionChangeEvent = (event) => {
        setFile({
            file: window.URL.createObjectURL(event.target.files[0]), selectedFile: event.target.files[0], loaded: 0,
        })
    }

    useEffect(() => {
        if (file === null) {

        }
    }, [file]); // Only re-run the effect if count changes

    return (
        <div className={classes.root}>
            <Grid container direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  xl={12}
                  sm={12}
                  sx={{p: 1}}
                  className={classes.accordion}
                  style={{width: "100%"}}
            >
                <Grid item xs={12} style={{width: "100%"}}>
                    {fileUploadAttempted &&
                        <div>
                            {fileUploadError &&
                                <Alert severity="error">{fileUploadError}</Alert>}
                            {fileUploadSuccess &&
                                <Alert severity="success">Your file was uploaded and is processing</Alert>}
                        </div>}

                    <div className={classes.column}>
                        <Typography className={classes.secondaryHeading}>Select a file
                            <Tooltip title="A document can be in JPEG, PNG, PDF or TIFF format." arrow>
                                <HelpOutlineIcon fontSize="small"/>
                            </Tooltip>
                        </Typography>
                    </div>
                    <Divider/>

                </Grid>

                {!file &&
                    <Grid item xs={12} style={{width: "100%"}}>
                        <input
                            style={{display: 'none'}}
                            id="raised-button-file"
                            multiple
                            type="file"
                            // fullWidth={true}
                            onChange={onMailFileSelectionChangeEvent}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="outlined" component="span" fullWidth>
                                Choose file
                            </Button>
                        </label>
                    </Grid>}

                {file &&
                    <Grid item xs={12} style={{width: "100%"}} alignItems="center"
                          justifyContent="center" direction={"row"}>
                        <Button style={{marginBottom: "20px"}} variant="outlined" color="error" href="/alttext"
                                fullWidth>
                            Cancel
                        </Button>
                        <Button style={{marginBottom: "10px"}} variant="contained" color="success" onClick={onFileSave}
                                fullWidth>
                            Submit
                        </Button>
                        {loading &&
                            <CircularProgress size={24} className={classes.buttonProgress}/>}
                    </Grid>}

                {file &&
                    <Grid container
                          alignItems="center"
                          justifyContent="center"
                          direction={"column"}
                          item xs={12}
                          style={{width: "100%"}}>

                        <Typography variant="caption" alignContent={"center"}>
                            {file.selectedFile.name}
                            <br/>
                        </Typography>
                        <img
                            src={URL.createObjectURL(file.selectedFile)}
                            loading="lazy"
                            alt={"image"}
                            width="90%"
                            height="100%"
                        />
                    </Grid>}
            </Grid>

        </div>)
        ;
}
