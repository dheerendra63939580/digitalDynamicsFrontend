import React from 'react'

const HomeCard = ({ image, title, description, next }) => {
    return (
        <div className="flex gap-2">
            <img src={image} alt="" className="w-6 h-[6]" />
            <div className="flex flex-col ">
                <strong>{title}</strong>
                <span className="bg-gray-150">{description}</span>
                {next && <span className="gray-150">{next}</span>}
            </div>
        </div>
    )
}

export default HomeCard