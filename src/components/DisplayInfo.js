import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const DisplayInfo = (props) => {
    return (
        <Paper style={{textAlign:'right'}} elevation={1}>
            <Typography variant={props.variant} component={props.component}>
                {props.body}
            </Typography>
        </Paper>
    );
}

export default DisplayInfo;
