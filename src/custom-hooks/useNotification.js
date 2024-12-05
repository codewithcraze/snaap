import '../styles/main.css';
import React, { useState, useEffect } from 'react';

function NotificationComponent({message}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        showNotification(3000);
    }, []);

    const showNotification = (duration = 3000) => {
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, duration);
    };

    return (
        <div>
            {isVisible && (
                <div className='notification'>
                    {message}
                    <button className='btnx' onClick={() => setIsVisible(false)}>
                        -
                    </button>
                </div>
            )}
        </div>
    );
}

export default NotificationComponent;
