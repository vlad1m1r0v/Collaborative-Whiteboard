import {useEffect} from 'react'

function usePreventZoom() {
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.ctrlKey && ['-', '='].includes(e.key)) {
                e.preventDefault();
            }
        };

        const handleWheel = (e: WheelEvent) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        };

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("wheel", handleWheel, {passive: false});

        return () => {
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener("wheel", handleWheel);
        };
    }, []);
}

export default usePreventZoom;