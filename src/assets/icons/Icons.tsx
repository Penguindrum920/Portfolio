import React from 'react';

export const ReactIcon = ({ className }: { className?: string }) => (
    <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
        <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="10" ry="4.5"></ellipse>
            <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
            <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
        </g>
    </svg>
);

export const FigmaIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M19 28.5C19 28.5 19 19 28.5 19C38 19 38 28.5 38 28.5C38 28.5 28.5 28.5 19 28.5Z" fill="#1ABCFE" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
    </svg>
);

export const GitHubIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21C9.5 20.77 9.5 20.14 9.5 19.31C6.73 19.91 6.14 17.98 6.14 17.98C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.39 6.02 9.5 6.65 8.79C6.55 8.54 6.2 7.5 6.75 6.15C6.75 6.15 7.59 5.88 9.5 7.17C10.29 6.95 11.15 6.84 12 6.84C12.85 6.84 13.71 6.95 14.5 7.17C16.41 5.88 17.25 6.15 17.25 6.15C17.8 7.5 17.45 8.54 17.35 8.79C17.98 9.5 18.38 10.39 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26C14.5 19.6 14.5 20.68 14.5 21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 6.477 17.52 2 12 2Z" />
    </svg>
);

export const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M20.5 2H3.5C2.67 2 2 2.67 2 3.5V20.5C2 21.33 2.67 22 3.5 22H20.5C21.33 22 22 21.33 22 20.5V3.5C22 2.67 21.33 2 20.5 2ZM8.01 19H5.29V9.79H8.01V19ZM6.65 8.59C5.78 8.59 5.08 7.88 5.08 7.02C5.08 6.15 5.78 5.45 6.65 5.45C7.52 5.45 8.22 6.15 8.22 7.02C8.22 7.88 7.52 8.59 6.65 8.59ZM19.22 19H16.49V13.88C16.49 12.59 15.93 11.75 14.88 11.75C14.07 11.75 13.58 12.29 13.38 12.83C13.3 13.02 13.29 13.29 13.29 13.56V19H10.57C10.57 19 10.6 10.69 10.57 9.79H13.29V11.23C13.29 11.23 13.29 11.23 13.28 11.23H13.29V11.23C13.65 10.68 14.39 9.69 15.94 9.69C17.65 9.69 19.22 10.82 19.22 13.22V19Z" />
    </svg>
);

export const MailIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" />
        <path d="M22 6L12 13L2 6" />
    </svg>
);
