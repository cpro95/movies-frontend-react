import React from 'react';
import { Link } from 'react-router-dom';

const Listmain = () => (
    <div>
        <h1>This is a Listmain page!</h1>
        <Link to={`/list/1`}>list 1</Link>
    </div>
)

export default Listmain;
