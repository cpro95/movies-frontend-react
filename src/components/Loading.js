import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const Loading = () => {
    return(
        <div>
            <br />
            <Typography variant="title" color="inherit"
                style={{ flex: 1, textAlign: 'center' }}
            >
                Loading...
            </Typography>
            <br />
            <LinearProgress />
            <br />
            <LinearProgress color="secondary" />
        </div>
    );
}

export default Loading;
