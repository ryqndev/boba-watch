import React from 'react';
import {Sunburst} from 'react-vis';

const UserSunburst = ({spent, budget, width}) => {
    const size = width - 45;
    const data = {
        size: 0,
        color: 'transparent',
        children: [
            {
                title: "Progress",
                size: spent,
                color: "#f68080",
                children: [{
                    title: "Padding",
                    size: 0,
                    color: 'transparent',
                }]
            },
            {
                title: "Until Limit",
                size: budget - spent,
                color: "#00000044",
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