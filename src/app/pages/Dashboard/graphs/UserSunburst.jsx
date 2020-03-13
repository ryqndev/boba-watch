import React from 'react';
import {Sunburst} from 'react-vis';

const UserSunburst = ({spent, budget, width}) => {
    const size = width - 45;
    const data = {
        size: 0,
        color: "#FFFFFF",
        children: [
            {
                title: "Progress",
                size: spent,
                color: "#32de44",
                children: [{
                    title: "Padding",
                    size: 0,
                    color: "#FFFFFF",
                }]
            },
            {
                title: "Until Limit",
                size: budget - spent,
                color: "#F4F4F4",
            }
        ]
    };
    return (
        <div>
            <Sunburst
                height={size}
                width={size}
                data={data}
                padAngle={0.06}
                animation
                colorType={'literal'}
            />
        </div>
    );
}

export default UserSunburst;