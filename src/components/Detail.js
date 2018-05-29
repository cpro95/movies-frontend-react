import React from 'react';

const Detail = (props) => {
    const movie = props.match.params;

    return (
        <div>
            <h1>This is a detail page!</h1>
            <h1>detail : {movie.id}</h1>
        </div>
    )
}

export default Detail;
