import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    className="fixed bottom-6 right-4 md:bottom-10 md:right-6 z-50 p-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"      >
                    <ArrowUp className="w-5 h-5" />
                </button>
            )}
        </>
    );
}