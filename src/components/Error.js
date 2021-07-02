import React from 'react';

const Error = ({mensaje}) => {
    return (  
        <div className="alert alert-primary d-flex align-items-center">{mensaje}</div>
    );
}
 
export default Error;