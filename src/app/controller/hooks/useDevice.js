import { useState, useEffect } from 'react';

const useDevice = () => {
    const [device, setDevice] = useState(window.innerWidth < 950 ? 'phone' : 'desktop');

    const resize = () => {
        setDevice(window.innerWidth < 950 ? 'phone' : 'desktop');
    };

    useEffect(() => {
        window.addEventListener('resize', resize);
        return () => { window.removeEventListener('resize', resize) }
    }, []);

    return device;
}

export default useDevice;
