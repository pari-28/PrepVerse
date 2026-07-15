import { useEffect, useRef, useState } from "react";

export function useCountUp(
    end: number,
    duration: number = 2000,
    delay = 0
) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    const ref = useRef<HTMLDivElement | null>(null);
    const animationFrame = useRef<number | null>(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.3,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;
        const prefersReducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        if (prefersReducedMotion) {
            setCount(end);
            return;
        }
        let startTime: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;

            const progress = Math.min(
                (timestamp - startTime) / duration,
                1
            );

            // Ease-out animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setCount(easedProgress * end);

            if (progress < 1) {
                animationFrame.current = requestAnimationFrame(animate);
            }
        };

        const timeout = window.setTimeout(() => {
            animationFrame.current = requestAnimationFrame(animate);
        }, delay);

        return () => {
            clearTimeout(timeout);

            if (animationFrame.current !== null) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, [hasStarted, end, duration]);

    return {
        ref,
        count,
    };
}