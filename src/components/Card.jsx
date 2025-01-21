import React from 'react'

const Card = ({ children, classes }) => {
    return (
        <div className={`bg-white rounded-lg ${classes}`}>
            {children}
        </div >
    )
}

export default Card