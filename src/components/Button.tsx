'use client'
interface ButtonProps {
    title: string;
    onClick?: () => void;
    className?: string;
}

export default function Button({ title, onClick, className }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`rounded-md font-button text-base text-buttonColorFont ${className}`} >
            {title}
        </button>
    );
}