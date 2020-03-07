import React, {useState} from 'react';
import FirebaseUser from '../firebaseCalls.js';
import { Sunburst } from 'react-vis';

const UserSunburst = ({metrics}) => {
    const [size, setSize] = useState(window.innerWidth - 40);
    const [sunburstData, setSunburstData] = useState({
        size: 0,
        color: "#FFFFFF",
        children: [{
                title: "Progress",
                size: metrics.tc,
                color: "#32de44",
                children: [{
                    title: "Padding",
                    size: 0,
                    color: "#FFFFFF",
                }]
            },
            {
                title: "Until Limit",
                size: FirebaseUser.get.current.profile.budget - metrics.tc,
                color: "#F4F4F4",
            }
        ]
    });
    return (
        <div>
            <Sunburst height={size-45} width={size-45} data={sunburstData} padAngle={0.06} animation colorType={'literal'} />
        </div>
    );
}

export default UserSunburst;