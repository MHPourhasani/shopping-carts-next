"use client";
import React, { useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { Label } from "@/components/ui/label";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface IProps {
    label?: string;
    value: string;
    onChange: (content: string) => void;
}

const TextEditor = ({ label, value, onChange }: IProps) => {
    const editor = useRef<any>(null);

    const config = useMemo(
        () => ({
            editor: {},
            uploader: {
                insertImageAsBase64URI: true,
                imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
            },
        }),
        [],
    );

    return (
        <div className="flex w-full flex-col gap-4">
            {label && <Label>{label}</Label>}
            {/* "https://www.soubhagyajit.com/blogs/adding-Jodit-js-:-rich-text-editor-to-a-react-(next.js)-application" */}
            <JoditEditor ref={editor} value={value} config={config} onChange={onChange} className="dark:bg-secondary-700 w-full bg-white" />
        </div>
    );
};

export default TextEditor;
