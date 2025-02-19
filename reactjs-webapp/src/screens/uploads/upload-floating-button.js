import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";

const fabStyle = {
    position: 'fixed',
    right: 20,
    bottom: 20,
};

const actionButtonStyle = (index) => ({
    position: 'fixed',
    right: 20,
    bottom: 80 + index * 60, // Spacing between action buttons
});

export default function FloatingActionButtonZoom() {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const actionButtons = [
        {icon: <AddIcon/>, name: 'Alt Text', linkTo: '/alttext'}
    ];

    return (
        <Box sx={{position: 'fixed', right: 20, bottom: 20}}>
            <Fab sx={{ bgcolor: 'grey.800', color: 'white', '&:hover': { bgcolor: 'grey.900' } }} onClick={handleExpandClick}>
                <AddIcon/>
            </Fab>
            {expanded && actionButtons.map((button, index) => (
                <Zoom key={button.name} in={expanded} style={{transitionDelay: `${expanded ? 100 * index : 0}ms`}}>
                    <Box sx={{display: 'flex', alignItems: 'center', ...actionButtonStyle(index)}}>
                        {/* Adjust this `sx` prop to position the label to the left or right as desired */}
                        <Typography sx={{
                            mr: 2,
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            borderRadius: '4px',
                            padding: '2px 8px'
                        }}>
                            {button.name}
                        </Typography>
                        <Link to={button.linkTo} style={{textDecoration: 'none'}}>
                            <Fab sx={{ bgcolor: 'grey.700', color: 'white', '&:hover': { bgcolor: 'grey.800' } }} size="small" onClick={() => setExpanded(false)}>
                                {button.icon}
                            </Fab>
                        </Link>
                    </Box>
                </Zoom>
            ))}
        </Box>
    );
}
