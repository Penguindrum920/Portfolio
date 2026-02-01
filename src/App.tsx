import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Layout from "./components/Layout";
import Shuffle from "./components/Shuffle";
import SplashCursor from "./components/SplashCursor";
import Aurora from "./components/Aurora";
import ProfileCard from "./components/ProfileCard";
import StarBorder from "./components/StarBorder";
import ProjectsScroll from "./components/ProjectsScroll";

import { ReactIcon, FigmaIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./assets/icons/Icons";
// Note: Pic1/Pic2 are replaced by colored sections or placeholders since images aren't available yet

export default function App() {
    const container1 = useRef<HTMLDivElement>(null);
    const container2 = useRef<HTMLDivElement>(null);
    const container3 = useRef<HTMLDivElement>(null);

    const { scrollYProgress: scrollYProgress1 } = useScroll({
        target: container1,
        offset: ["start start", "end end"]
    });

    const { scrollYProgress: scrollYProgress2 } = useScroll({
        target: container2,
        offset: ["start start", "end end"]
    });

    const { scrollYProgress: scrollYProgress3 } = useScroll({
        target: container3,
        offset: ["start start", "end end"]
    });

    return (
        <Layout>
            <SplashCursor />

            <div ref={container1} className="container-200vh">
                <Section1 scrollYProgress={scrollYProgress1} />
                <Section2 scrollYProgress={scrollYProgress1} />
            </div>
            <div ref={container2} className="container-200vh">
                <Section2Transition scrollYProgress={scrollYProgress2} />
                <Section3 scrollYProgress={scrollYProgress2} />
            </div>
            <div ref={container3} className="container-200vh">
                <Section3Transition scrollYProgress={scrollYProgress3} />
                <Section4 scrollYProgress={scrollYProgress3} />
            </div>
        </Layout>
    );
}

// ------------------------------------------------------------------
// Section 1: About Me (Sticky in Container 1)
// ------------------------------------------------------------------
const Section1 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

    return (
        <motion.div style={{ scale, rotate }} className="sticky-screen text-white relative overflow-hidden">
            <Aurora colorStops={['#ea7777', '#b5ff6b', '#4cc1f3']} amplitude={1.5} blend={0.6} speed={0.8} />
            <div className="h-full flex items-center justify-center" style={{ position: 'relative', zIndex: 1 }}>
                <div className="w-full max-w-7xl px-10">
                    {/* Shuffle Heading */}
                    <div className="w-full text-center mb-12" style={{ marginTop: '2rem' }}>
                        <Shuffle 
                            text="About Me" 
                            tag="h1"
                            textAlign="center"
                            style={{ margin: '0 auto', display: 'block' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
                        {/* Left Content */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            padding: '2rem',
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(30px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                            marginTop:'20px',
                            fontSize: 20,
                            margin: '20px'
                        }}>
                            <p className="text-lg leading-relaxed text-gray-200">
                                I'm a computer science student who loves building creative stuff. 
                                Whether I'm diving into machine learning models or building interactive web apps, 
                                I'm always curious to learn and improve.
                            </p>
                            <p className="text-lg leading-relaxed text-gray-200">
                                Beyond coding, I enjoy sharing knowledge by teaching workshops and 
                                collaborating on projects that combine creativity with technology.
                            </p>
                            <StarBorder
                                onClick={() => window.open('/resume/Aditya_Kaushik_Resume.pdf', '_blank')}
                                color="#a78bfa"
                                speed="4s"
                                thickness={2}
                            >
                                View Resume
                            </StarBorder>
                        </div>

                        {/* Right Content: Profile Card */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <ProfileCard 
                                name="Aditya Kaushik"
                                handle="Penguindrum920"
                                contactText="Hire Me"
                                avatarUrl="https://via.placeholder.com/400x600"
                                behindGlowEnabled={true}
                                showUserInfo={true}
                                enableMobileTilt={true}
                                onContactClick={() => console.log('Contact clicked')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ------------------------------------------------------------------
// Section 2: Projects (Relative in Container 1, moves UP)
// ------------------------------------------------------------------
const Section2 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

    return (
        <motion.div style={{ scale, rotate, background: 'rgba(248, 236, 218, 1)' }} className="relative-screen flex-center text-white">
        </motion.div>
    );
};

// ------------------------------------------------------------------
// Section 2 Transition (Sticky in Container 2 - Projects Showcase)
// ------------------------------------------------------------------
const Section2Transition = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const projects = [
        {
            image: '/projects/aniverse.png',
            title: 'Ani-Verse',
            description: 'A revolutionary web application that transforms how users interact with data. Built with React, TypeScript, and modern design principles.',
            techStack: ['React', 'TypeScript', 'Node.js', 'MongoDB']
        },
        {
            image: '/projects/parkinson.png',
            title: 'Parkinson Disease Assessment System',
            description: 'Machine learning model for computer vision tasks. Achieved 95% accuracy using advanced deep learning techniques and custom architectures.',
            techStack: ['Python', 'TensorFlow', 'OpenCV', 'Flask']
        },
        {
            image: '/projects/tradewars.png',
            title: 'Trade Wars',
            description: 'Sustainability platform helping organizations track and reduce their carbon footprint through AI-powered analytics and actionable insights.',
            techStack: ['React', 'Next.js', 'PostgreSQL', 'AWS']
        },
        {
            image: '/projects/pegasus.png',
            title: 'Pegasus Website',
            description: 'Collaborative coding platform with real-time synchronization, intelligent code completion, and integrated version control.',
            techStack: ['React', 'WebSocket', 'Redis', 'Docker']
        }
    ];

    return (
        <motion.div className="sticky-screen text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFF8E7 0%, #F5E6D3 100%)', zIndex: 20 }}>
            <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%' }}>
                <ProjectsScroll projects={projects} />
            </div>
        </motion.div>
    );
};

// ------------------------------------------------------------------
// Section 3: Skills (Relative in Container 2)
// ------------------------------------------------------------------
const Section3 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

    return (
        <motion.div style={{ scale, rotate }} className="relative-screen bg-skills flex-center text-large text-white">
            <div className="flex-center">
                <p className="mb-8 font-bold">Skills</p>
                <div className="flex gap-12 items-center">
                    <div className="flex flex-col items-center gap-4">
                        <ReactIcon className="w-24 h-24 text-[#61DAFB]" />
                        <p className="text-xl font-light">React</p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <FigmaIcon className="w-24 h-24" />
                        <p className="text-xl font-light">Design</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ------------------------------------------------------------------
// Section 3 Transition (Sticky in Container 3)
// ------------------------------------------------------------------
const Section3Transition = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

    return (
        <motion.div style={{ scale, rotate }} className="sticky-screen bg-skills flex-center text-large text-white">
            <div className="flex-center">
                <p className="mb-8 font-bold">Skills</p>
                <div className="flex gap-12 items-center">
                    <div className="flex flex-col items-center gap-4">
                        <ReactIcon className="w-24 h-24 text-[#61DAFB]" />
                        <p className="text-xl font-light">React</p>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <FigmaIcon className="w-24 h-24" />
                        <p className="text-xl font-light">Design</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ------------------------------------------------------------------
// Section 4: Contact (Relative in Container 3 - Last Item)
// ------------------------------------------------------------------
const Section4 = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

    return (
        <motion.div style={{ scale, rotate }} className="sticky-screen bg-contact flex-center text-large text-white">
            <div className="flex-center gap-8">
                <p className="font-bold mb-4">Contact Me</p>
                <div className="flex gap-8">
                    <a href="#" className="hover:scale-110 transition-transform">
                        <GitHubIcon className="w-16 h-16" />
                    </a>
                    <a href="#" className="hover:scale-110 transition-transform">
                        <LinkedInIcon className="w-16 h-16" />
                    </a>
                    <a href="mailto:contact@example.com" className="hover:scale-110 transition-transform">
                        <MailIcon className="w-16 h-16" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};
