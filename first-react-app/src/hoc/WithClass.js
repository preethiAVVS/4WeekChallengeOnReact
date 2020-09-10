import React from 'react';
// const WithClass = props => (
//     <div className={props.class}>
//         {props.children}
//     </div>)

const WithClass = (WrappedComponent, ClassName) => {
    return props => (
        <div className={ClassName}>
            <WrappedComponent {...props}/>
        </div>
    )
};

export default WithClass;