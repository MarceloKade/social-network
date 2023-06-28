'use client'
import { useRef, useEffect } from "react";
import Button from "./Button";
import { useGlobalContext } from "@/app/hooks/Context/SocialContext";

interface ModalProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    onSubmit: () => void;
    content: string;
    onContentChange: (content: string) => void;
}

export default function Modal({
    onSubmit,
    onContentChange,
    content,
}: ModalProps) {
    const { isFocused, setIsFocused, isOpen, setOpen } = useGlobalContext();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isOpen && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isOpen]);

    const handlePublish = () => {
        onSubmit();
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center pl-16 ss:pl-6 pr-16 ss:pr-6 z-20 ${isOpen ? "" : "hidden"
                }`}
        >
            <div
                className="absolute inset-0 bg-black opacity-60"
                onClick={() => setOpen(false)}
            ></div>
            <div className="flex flex-col relative bg-white p-4 relative text-black rounded-xl w-96 h-96 max-w-sm">
                <Button
                    className="absolute top-0 right-2 text-4xl text-gray-500 hover:text-gray-700"
                    title="&times;"
                    onClick={() => setOpen(!isOpen)}
                />
                <div className="p-2 rounded-lg">
                    <textarea
                        ref={textareaRef}
                        placeholder="No que você está pensando?"
                        className={`outline-none resize-none  w-80 h-72 ${isFocused ? "" : "text-gray-500"
                            }`}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        value={content}
                        onChange={(e) => onContentChange(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <Button
                        title="Publish"
                        onClick={handlePublish}
                        className="bg-buttonBackground p-2"
                    />
                </div>
            </div>
        </div>
    );
}
