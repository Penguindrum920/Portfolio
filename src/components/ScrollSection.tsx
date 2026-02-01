import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const ScrollSection = ({ children, className, zIndex = 1 }: { children: React.ReactNode, className?: string, zIndex?: number }) => {
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
    const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

    return (
        <div ref={container} className="section-container" style={{ zIndex }}>
            <div className="sticky-wrapper">
                <motion.div
                    style={{ scale, rotate, opacity }}
                    className={`section-inner ${className}`}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default ScrollSection;
