"use client"

import { useEffect, useRef, useState } from 'react';

function ScrollAnimation() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const colChange = useRef(false);
    const [isBlue, setIsBlue] = useState(false);

    const logHeight = () => {
        if(scrollRef.current) {
            const top = scrollRef.current.getBoundingClientRect().top;
            const newColChange = top < 0;

            if(colChange.current !== newColChange) {
                colChange.current = newColChange;
                setIsBlue(newColChange); // This will change the state and hence re-render the component
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', logHeight);

        return () => {
            window.removeEventListener('scroll', logHeight);
        };
    }, [logHeight]);

    return (
        <section ref={scrollRef} className={`h-[400px] w-[100vw] absolute top-[50%] overflow-y-scroll ${isBlue ? 'bg-blue' : 'bg-red'}`}>
        </section>
    );
}

export default ScrollAnimation;
