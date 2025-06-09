import { useEffect, useState } from 'react';

type WindowSize = {
    width: number;
    height: number;
};

export const useWindowSize = (): WindowSize => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // 초기 호출
        handleResize();

        // resize 이벤트 등록
        window.addEventListener('resize', handleResize);

        // 정리 함수
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};
