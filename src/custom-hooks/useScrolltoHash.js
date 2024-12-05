import { useEffect } from 'react';

const useScrollToHash = () => {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const element = document.getElementById(hash.substring(1)); // Remove the '#' from the hash
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                element.classList.add('highlight');
                setTimeout(() => {
                    element.classList.remove('highlight');
                }, 1000); 
            }
        }
    }, []);
};

export default useScrollToHash;
